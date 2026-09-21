import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth } from "../../../db_firebase/firebase-admin";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const session = cookieStore.get("session")?.value;

    if (!session) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    const decoded = await adminAuth.verifySessionCookie(
      session,
      true
    );

    const adminUid = process.env.ADMIN_UID;

    if (!adminUid || decoded.uid !== adminUid) {
      return NextResponse.json(
        { authenticated: false },
        { status: 403 }
      );
    }

    return NextResponse.json({
      authenticated: true,
      uid: decoded.uid,
      email: decoded.email ?? null,
    });

  } catch (error) {
    console.error("SESSION VERIFICATION ERROR:", error);

    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  }
}