This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment variables

Copy `.env.example` to `.env.local` and fill in the Firebase values before using the admin login or admin routes. The `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, and `FIREBASE_PRIVATE_KEY` variables are required by the Firebase Admin SDK and must remain server-only; do not rename them with the `NEXT_PUBLIC_` prefix.

When storing `FIREBASE_PRIVATE_KEY` in `.env.local`, keep the escaped `\\n` characters. The server converts them to line breaks when creating the Admin SDK credential.

## Admin setup and deployment

The admin role is stored as a Firebase Authentication custom claim, so it does not need to be assigned every time the app starts. In the Firebase project used by the deployment, create the admin user and assign the claim once:

```bash
ADMIN_EMAIL=your-admin@example.com npm run set-admin
```

On Windows PowerShell, use:

```powershell
$env:ADMIN_EMAIL = "your-admin@example.com"
npm run set-admin
```

Run this command with the production Firebase Admin credentials in `.env.local`, or with the same `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, and `FIREBASE_PRIVATE_KEY` environment variables that are configured in production. Do not add `set-admin` to the build or start command. After assigning the claim, sign out and sign in again so the login flow can receive a refreshed token.

The `NEXT_PUBLIC_FIREBASE_PROJECT_ID` and server-side `FIREBASE_PROJECT_ID` values must refer to the same Firebase project. If the role appears to disappear, this project mismatch is the first thing to check; custom claims persist in Firebase and are not reset by a Next.js restart or deployment.

## Firebase rules

Deploy `database.rules.json` to the Realtime Database. It allows public course reads while restricting course writes to Firebase users with the `admin: true` custom claim. The admin credentials must remain server-only environment variables.

## Course workflow

Admins can create or edit courses, add categories, levels, and tags, and save a course as a draft. The public library hides records with `published: false`; older records without that field remain public for backwards compatibility.
You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
