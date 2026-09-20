import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth } from "../../../db_firebase/firebase-admin";

export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json();

    if (!idToken) {
      return NextResponse.json(
        { error: "Missing ID token" },
        { status: 400 }
      );
    }
    
    // Verify both the Firebase token and the custom admin claim before creating a session.
    const decodedToken = await adminAuth.verifyIdToken(idToken);

    if (decodedToken.admin !== true) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    const expiresIn = 60 * 60 * 24 * 5 * 1000; // Keep the server session valid for five days.

    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn,
    });

    const cookieStore = await cookies();

    cookieStore.set("session", sessionCookie, {
      maxAge: expiresIn / 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
  console.error("ADMIN LOGIN ERROR:", error);

  return NextResponse.json(
    {
      error: error instanceof Error ? error.message : "Unknown error",
    },
    { status: 500 }
  );
}
}