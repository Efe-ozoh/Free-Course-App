import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth } from "../../../db_firebase/firebase-admin";

export async function GET() {
  try {
    const cookieStore = await cookies();

    // This endpoint exposes only the minimum session details needed by clients.
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

    return NextResponse.json({
      authenticated: true,
      uid: decoded.uid,
      email: decoded.email,
    });
  } catch (error) {
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  }
}