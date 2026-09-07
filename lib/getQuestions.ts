import { db } from "../db_firebase/firebase";
import { ref, get } from "firebase/database";

export async function getCourses() {
  const snapshot = await get(ref(db, "courses"));
  if (snapshot.exists()) {
    return snapshot.val(); // object keyed by push IDs
  }
  return {};
}