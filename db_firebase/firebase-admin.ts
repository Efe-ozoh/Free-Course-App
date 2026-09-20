import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY;

// Admin credentials must stay server-side; fail early if the deployment is incomplete.
if (!projectId || !clientEmail || !privateKey) {
  throw new Error(
    "Missing Firebase Admin credentials. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY."
  );
}

const adminConfig = {
  credential: cert({
    projectId,
    clientEmail,
    privateKey: privateKey?.replace(/\\n/g, "\n"),
  }),
};

// Firebase Admin is also initialized once so route reloads remain safe in development.
const adminApp =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp(adminConfig);

export const adminAuth = getAuth(adminApp);