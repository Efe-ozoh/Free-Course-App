"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, BookOpen, CheckCircle2, ExternalLink, Tag } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getCourse, type StoredCourse } from "@/lib/courses";
import CourseImage from "@/components/Cards/CourseImage";

type CourseWithId = StoredCourse;

export default function CourseDetailsClient() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("id");
  const [course, setCourse] = useState<CourseWithId | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    // The detail route receives the Firebase record ID as ?id=...
    if (!courseId) {
      setCourse(null);
      setLoading(false);
      return;
    }

    getCourse(courseId)
      .then(setCourse)
      .catch((loadError) => {
        console.error("Failed to load course:", loadError);
        setError(true);
        setCourse(null);
      })
      .finally(() => setLoading(false));
  }, [courseId]);

  if (loading) {
    return <main className="flex min-h-[70vh] items-center justify-center text-sm text-slate-400">Loading course...</main>;
  }

  if (error) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
        <BookOpen className="h-10 w-10 text-rose-500" />
        <h1 className="mt-5 text-2xl font-black text-slate-900">Unable to load course</h1>
        <p className="mt-2 text-sm text-slate-500">Check your connection and try again.</p>
        <button onClick={() => window.location.reload()} className="mt-6 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white hover:bg-indigo-700">Try again</button>
      </main>
    );
  }

  if (!course) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
        <BookOpen className="h-10 w-10 text-indigo-500" />
        <h1 className="mt-5 text-2xl font-black text-slate-900">Course not found</h1>
        <p className="mt-2 text-sm text-slate-500">This course may have been removed or the link is incomplete.</p>
        <Link href="/" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white hover:bg-indigo-700"><ArrowLeft size={16} /> Back to courses</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f8fc] pb-16 text-slate-900">
      <div className="mx-auto w-[80%] px-0 py-8 sm:py-8 lg:py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-600"><ArrowLeft size={16} /> All courses</Link>
        <section className="mt-7 overflow-hidden rounded-[2rem] bg-[#10152d] shadow-2xl shadow-indigo-950/10">
          <div className="flex flex-col">
            <div className="relative min-h-64 bg-indigo-950 sm:min-h-96">
              <CourseImage src={course.image} alt={`${course.title} cover`} className="absolute inset-0 h-full w-full object-cover opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10152d]/60 to-transparent" />
              <div className="absolute bottom-5 left-5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-900 backdrop-blur sm:bottom-7 sm:left-7">A focused learning path</div>
            </div>
            <div className="flex flex-col justify-center p-7 text-white sm:p-10 lg:p-14">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-indigo-300"><Tag size={14} /> {course.category}</div>
              <h1 className="mt-5 max-w-2xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">{course.title}</h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">{course.description1}</p>
              <a href={course.link} target="_blank" rel="noreferrer" className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-indigo-400">Start learning <ArrowUpRight size={17} /></a>
            </div>
          </div>
        </section>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          <article className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">About this course</p>
            <h2 className="mt-3 text-2xl font-black tracking-tight">Build useful skills with a clear direction.</h2>
            <p className="mt-5 whitespace-pre-line text-[15px] leading-8 text-slate-600">{course.description1}</p>
            {course.description2 && <p className="mt-4 whitespace-pre-line text-[15px] leading-8 text-slate-600">{course.description2}</p>}
          </article>
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 lg:sticky lg:top-24">
            <p className="text-sm font-bold text-slate-900">Course overview</p>
            <div className="mt-5 space-y-4 text-sm text-slate-600"><div className="flex items-center gap-3"><CheckCircle2 className="text-emerald-500" size={18} /> Self-paced learning</div><div className="flex items-center gap-3"><BookOpen className="text-indigo-500" size={18} /> Curated tutorial content</div><div className="flex items-center gap-3"><Tag className="text-orange-500" size={18} /> {course.category}</div></div>
            <a href={course.link} target="_blank" rel="noreferrer" className="mt-7 flex items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm font-bold text-indigo-700 hover:bg-indigo-100">Open course link <ExternalLink size={15} /></a>
          </aside>
        </div>
      </div>
    </main>
  );
}
