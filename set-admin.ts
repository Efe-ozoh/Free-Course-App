import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

import { adminAuth } from "./db_firebase/firebase-admin";

async function makeAdmin() {
  try {
    const user = await adminAuth.getUserByEmail("ozohefe@gmail.com");

    await adminAuth.setCustomUserClaims(user.uid, {
      admin: true,
    });

    console.log("✅ Admin role assigned successfully!");
    console.log("UID:", user.uid);
  } catch (error) {
    console.error("❌ Failed to make user admin:", error);
  }
}

makeAdmin();