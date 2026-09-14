import { db } from "../db_firebase/firebase";
import { ref, get } from "firebase/database";

export async function getCourses() {
  // This helper preserves Firebase's native ID-keyed object shape for callers that need it.
  const snapshot = await get(ref(db, "courses"));
  if (snapshot.exists()) {
    return snapshot.val(); // object keyed by push IDs
  }
  return {};
}