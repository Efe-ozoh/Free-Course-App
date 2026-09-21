import { NextResponse } from "next/server";
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

  const signatureBytes = new Uint8Array(
    binary.length
  );

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

export async function GET() {
  try {
    const cookieStore = await cookies();

    const session =
      cookieStore.get("session")?.value;

    if (!session) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    const sessionSecret =
      process.env.SESSION_SECRET;

    const adminUid =
      process.env.ADMIN_UID;

    if (!sessionSecret || !adminUid) {
      throw new Error(
        "Session authentication environment variables are missing"
      );
    }

    const [payload, signature] =
      session.split(".");

    if (!payload || !signature) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    const validSignature =
      await verifySignature(
        payload,
        signature,
        sessionSecret
      );

    if (!validSignature) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    const sessionData = JSON.parse(
      base64UrlDecode(payload)
    );

    if (!sessionData.uid) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    if (sessionData.uid !== adminUid) {
      return NextResponse.json(
        { authenticated: false },
        { status: 403 }
      );
    }

    if (
      !sessionData.exp ||
      sessionData.exp < Math.floor(Date.now() / 1000)
    ) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    return NextResponse.json({
      authenticated: true,
      uid: sessionData.uid,
      email: sessionData.email ?? null,
    });
  } catch (error) {
    console.error(
      "SESSION VERIFICATION ERROR:",
      error
    );

    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  }
}