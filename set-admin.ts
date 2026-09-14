import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function makeAdmin() {
  try {
    const { adminAuth } = await import("./db_firebase/firebase-admin");
    const email = process.env.ADMIN_EMAIL;

    if (!email) {
      throw new Error("Set ADMIN_EMAIL to the Firebase Auth user's email.");
    }

    const user = await adminAuth.getUserByEmail(email);

    await adminAuth.setCustomUserClaims(user.uid, {
      ...user.customClaims,
      admin: true,
    });

    console.log("✅ Admin role assigned successfully!");
    console.log("UID:", user.uid);
  } catch (error) {
    console.error("❌ Failed to make user admin:", error);
    process.exitCode = 1;
  }
}

makeAdmin();