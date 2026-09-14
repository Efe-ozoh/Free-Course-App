import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();

  // Removing the cookie invalidates this browser's server session.
  cookieStore.delete("session");

  return NextResponse.json({
    success: true,
  });
}