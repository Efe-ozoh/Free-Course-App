import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

function base64UrlEncode(value: string) {
  const bytes = new TextEncoder().encode(value);

  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64UrlEncodeBytes(bytes: Uint8Array) {
  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function signSession(payload: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    {
      name: "HMAC",
      hash: "SHA-256",
    },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload)
  );

  return base64UrlEncodeBytes(new Uint8Array(signature));
}

export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json();

    if (!idToken) {
      return NextResponse.json(
        { error: "Missing ID token" },
        { status: 400 }
      );
    }

    const apiKey =
      process.env.FIREBASE_API_KEY ||
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

    const adminUid = process.env.ADMIN_UID;
    const sessionSecret = process.env.SESSION_SECRET;

    if (!apiKey) {
      throw new Error("FIREBASE_API_KEY is not configured");
    }

    if (!adminUid) {
      throw new Error("ADMIN_UID is not configured");
    }

    if (!sessionSecret) {
      throw new Error("SESSION_SECRET is not configured");
    }

    /*
     * Ask Firebase to validate the ID token.
     *
     * Firebase returns the authenticated user's
     * localId, which is the Firebase Auth UID.
     */
    const firebaseResponse = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(
        apiKey
      )}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken,
        }),
      }
    );

    const firebaseData = await firebaseResponse.json();

    if (!firebaseResponse.ok) {
      console.error(
        "Firebase token verification failed:",
        firebaseData
      );

      return NextResponse.json(
        { error: "Invalid Firebase session" },
        { status: 401 }
      );
    }

    const firebaseUser = firebaseData.users?.[0];

    if (!firebaseUser) {
      return NextResponse.json(
        { error: "Firebase user not found" },
        { status: 401 }
      );
    }

    /*
     * This is the important admin check.
     */
    if (firebaseUser.localId !== adminUid) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    if (firebaseUser.disabled === true) {
      return NextResponse.json(
        { error: "Account disabled" },
        { status: 403 }
      );
    }

    /*
     * Create our own 5-day session.
     */
    const expiresAt =
      Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 5;

    const sessionPayload = JSON.stringify({
      uid: firebaseUser.localId,
      email: firebaseUser.email ?? null,
      exp: expiresAt,
    });

    const encodedPayload =
      base64UrlEncode(sessionPayload);

    const signature = await signSession(
      encodedPayload,
      sessionSecret
    );

    const session = `${encodedPayload}.${signature}`;

    const cookieStore = await cookies();

    cookieStore.set("session", session, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 5,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("ADMIN LOGIN ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Authentication failed",
      },
      { status: 500 }
    );
  }
}