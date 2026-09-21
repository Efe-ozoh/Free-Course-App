"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../db_firebase/firebase";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      /*
       * Firebase handles email/password authentication.
       */
      const credential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      /*
       * Get a fresh Firebase ID token.
       */
      const idToken =
        await credential.user.getIdToken(true);

      /*
       * Send the ID token to our server.
       */
      const response = await fetch(
        "/api/adminLogin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken,
          }),
        }
      );

      const data = await response.json();

      console.log(
        "ADMIN LOGIN RESPONSE:",
        response.status,
        data
      );

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to create admin session"
        );
      }

      router.replace("/admin/dashboard");
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)] px-5 text-[var(--foreground)]">
      <form
        onSubmit={login}
        className="w-full max-w-md space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm"
      >
        <h1 className="text-2xl font-bold">
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-[var(--foreground)] outline-none focus:border-[#e37445]"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-[var(--foreground)] outline-none focus:border-[#e37445]"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-[#e37445] p-3 font-bold text-white transition hover:bg-[#c95e32] disabled:opacity-50"
        >
          {loading
            ? "Signing in..."
            : "Login"}
        </button>
      </form>
    </div>
  );
}