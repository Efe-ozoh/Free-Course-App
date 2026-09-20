"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import CourseForm from "@/components/AdminCourse/CourseForm";
import { getCourse, type StoredCourse } from "@/lib/courses";

export default function EditCoursePage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-[var(--background)] text-sm text-[var(--muted)]"><LoaderCircle className="mr-2 animate-spin" size={17} /> Loading course...</div>}>
      <EditCourseContent />
    </Suspense>
  );
}

function EditCourseContent() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [course, setCourse] = useState<StoredCourse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCourse(params.id)
      .then(setCourse)
      .catch((error) => console.error("Failed to load course:", error))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-[var(--background)] text-sm text-[var(--muted)]"><LoaderCircle className="mr-2 animate-spin" size={17} /> Loading course...</div>;
  }

  if (!course) {
    return <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--background)] px-5 text-center"><h1 className="text-2xl font-black">Course not found</h1><Link href="/admin/dashboard" className="mt-4 text-sm font-bold text-[#e37445]">Back to dashboard</Link></div>;
  }

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-8 text-[var(--foreground)] sm:px-8 lg:px-12 lg:py-10">
      <div className="mx-auto max-w-6xl">
        <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--muted)] transition hover:text-[#e37445]"><ArrowLeft size={16} /> Back to dashboard</Link>
        <div className="mt-8 max-w-2xl"><p className="text-sm font-bold uppercase tracking-[0.18em] text-[#e37445]">Course studio</p><h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Refine your course.</h1><p className="mt-3 text-base leading-7 text-[var(--muted)]">Update the details, change its visibility, and keep the learning path current.</p></div>
        <div className="mt-10 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm sm:p-8"><CourseForm initialCourse={course} courseId={course.id} onSaved={() => router.refresh()} /></div>
      </div>
    </main>
  );
}
