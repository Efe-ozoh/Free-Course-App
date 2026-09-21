import { cookies } from "next/headers";

function base64UrlDecode(value: string) {
  const base64 = value
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const padded =
    base64 + "=".repeat((4 - (base64.length % 4)) % 4);

  const binary = atob(padded);

  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return new TextDecoder().decode(bytes);
}

async function verifySignature(
  payload: string,
  signature: string,
  secret: string
) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    {
      name: "HMAC",
      hash: "SHA-256",
    },
    false,
    ["verify"]
  );

  const base64 = signature
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const padded =
    base64 + "=".repeat((4 - (base64.length % 4)) % 4);

  const binary = atob(padded);

  const signatureBytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    signatureBytes[i] = binary.charCodeAt(i);
  }

  return crypto.subtle.verify(
    "HMAC",
    key,
    signatureBytes,
    new TextEncoder().encode(payload)
  );
}

export async function verifySession() {
  try {
    const cookieStore = await cookies();

    const session =
      cookieStore.get("session")?.value;

    if (!session) {
      return null;
    }

    const sessionSecret =
      process.env.SESSION_SECRET;

    const adminUid =
      process.env.ADMIN_UID;

    if (!sessionSecret || !adminUid) {
      console.error(
        "SESSION_SECRET or ADMIN_UID is missing"
      );

      return null;
    }

    const [payload, signature] =
      session.split(".");

    if (!payload || !signature) {
      return null;
    }

    // Verify that the cookie was actually signed by our server.
    const validSignature =
      await verifySignature(
        payload,
        signature,
        sessionSecret
      );

    if (!validSignature) {
      console.error(
        "Invalid session signature"
      );

      return null;
    }

    // Decode the session payload.
    const sessionData = JSON.parse(
      base64UrlDecode(payload)
    );

    // Make sure the session belongs to our admin UID.
    if (sessionData.uid !== adminUid) {
      return null;
    }

    // Check whether the session has expired.
    if (
      !sessionData.exp ||
      sessionData.exp <
        Math.floor(Date.now() / 1000)
    ) {
      return null;
    }

    return {
      uid: sessionData.uid,
      email: sessionData.email ?? null,
      exp: sessionData.exp,
    };
  } catch (error) {
    console.error(
      "Session verification failed:",
      error
    );

    return null;
  }
}