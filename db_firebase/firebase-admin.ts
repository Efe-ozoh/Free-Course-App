import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY;

console.log("FIREBASE ADMIN ENV CHECK", {
  projectId,
  clientEmail,
  privateKeyExists: !!privateKey,
  privateKeyLength: privateKey?.length,
  startsCorrectly: privateKey?.startsWith(
    "-----BEGIN PRIVATE KEY-----"
  ),
  containsLiteralNewline: privateKey?.includes("\\n"),
});

if (!projectId || !clientEmail || !privateKey) {
  throw new Error(
    "Missing Firebase Admin environment variables."
  );
}

const adminApp =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey: privateKey.replace(/\\n/g, "\n"),
        }),
      });

export const adminAuth = getAuth(adminApp);