"use client";

import { getApps, initializeApp, type FirebaseOptions } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
};

const missingConfig = [
  ["NEXT_PUBLIC_FIREBASE_API_KEY", firebaseConfig.apiKey],
  ["NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN", firebaseConfig.authDomain],
  ["NEXT_PUBLIC_FIREBASE_DATABASE_URL", firebaseConfig.databaseURL],
  ["NEXT_PUBLIC_FIREBASE_PROJECT_ID", firebaseConfig.projectId],
  ["NEXT_PUBLIC_FIREBASE_APP_ID", firebaseConfig.appId],
]
  .filter(([, value]) => !value)
  .map(([name]) => name);

if (missingConfig.length > 0) {
  throw new Error(
    `Missing Firebase client configuration: ${missingConfig.join(", ")}`,
  );
}

const app =
  getApps().find((existingApp) => existingApp.name === "[DEFAULT]") ??
  initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app, firebaseConfig.databaseURL);
export default app;