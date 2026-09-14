import { cookies } from "next/headers";
import { adminAuth } from "../db_firebase/firebase-admin";

export async function verifySession() {
  const cookieStore = await cookies();

  // The session cookie is httpOnly, so only the server can validate it.
  const session = cookieStore.get("session")?.value;

  if (!session) {
    return null;
  }

  try {
    const decoded = await adminAuth.verifySessionCookie(
      session,
      true
    );

    return decoded;
  } catch (error) {
    console.error("Session verification failed:", error);
    return null;
  }
}