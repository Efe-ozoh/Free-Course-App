"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";

import CourseForm from "@/components/AdminCourse/CourseForm";
import { auth } from "@/db_firebase/firebase";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function AddCoursePage() {
  const router = useRouter();

  useEffect(() => {
    // Keep the client-side guard for direct navigation before Firebase session state settles.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/admin/login");
      }
    });

    return unsubscribe;
  }, [router]);

  return (
    <div className="min-h-screen bg-[var(--background)] px-4 py-8 text-[var(--foreground)] sm:px-8 lg:px-12 lg:py-10">
      <div className="mx-auto max-w-6xl">
        <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--muted)] transition hover:text-[#e37445]">
          <ArrowLeft size={16} /> Back to dashboard
        </Link>
        <div className="mt-8 max-w-2xl">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[#e37445]"><Sparkles size={16} /> Course studio</div>
          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Add something worth learning.</h1>
          <p className="mt-3 text-base leading-7 text-[var(--muted)]">Give learners a clear path into your next course. You can refine every detail before publishing it to your library.</p>
        </div>
        <div className="mt-10 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm sm:p-8">
          <CourseForm />
        </div>
      </div>
    </div>
  );
}
