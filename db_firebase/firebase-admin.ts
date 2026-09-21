import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY;

if (!projectId || !clientEmail || !privateKey) {
  throw new Error("Missing Firebase Admin environment variables.");
}

const formattedPrivateKey = privateKey
  .replace(/\\n/g, "\n")
  .replace(/\r/g, "");

console.log("FIREBASE ADMIN CHECK", {
  projectId,
  clientEmail,
  privateKeyLength: formattedPrivateKey.length,
  startsWithBegin: formattedPrivateKey.startsWith(
    "-----BEGIN PRIVATE KEY-----"
  ),
  endsWithEnd: formattedPrivateKey.trim().endsWith(
    "-----END PRIVATE KEY-----"
  ),
  newlineCount: (formattedPrivateKey.match(/\n/g) || []).length,
});

const adminApp =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey: formattedPrivateKey,
        }),
      });

export const adminAuth = getAuth(adminApp);