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

    // Verify that the token was issued by Firebase
    const decodedToken = await adminAuth.verifyIdToken(idToken);

    const adminUid = process.env.ADMIN_UID;

    if (!adminUid) {
      throw new Error("ADMIN_UID is not configured");
    }

    // Check whether this Firebase account is the admin
    if (decodedToken.uid !== adminUid) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    // Create a 5-day session
    const expiresIn = 1000 * 60 * 60 * 24 * 5;

    const sessionCookie = await adminAuth.createSessionCookie(
      idToken,
      { expiresIn }
    );

    const cookieStore = await cookies();

    cookieStore.set("session", sessionCookie, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: expiresIn / 1000,
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