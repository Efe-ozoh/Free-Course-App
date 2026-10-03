"use client";

import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getCourse } from "@/lib/courses-client";
import type { RelatedCourse, StoredCourse } from "@/lib/courses";
import CourseDetailsHero from "@/components/CourseDetails/CourseDetailsHero";
import CourseOverview from "@/components/CourseDetails/CourseOverview";
import RelatedCourses from "@/components/CourseDetails/RelatedCourses";

type CourseWithId = StoredCourse;

export default function CourseDetailsClient({ initialCourse }: { initialCourse?: CourseWithId }) {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("id");
  const [course, setCourse] = useState<CourseWithId | null>(initialCourse ?? null);
  const [relatedCourses, setRelatedCourses] = useState<RelatedCourse[]>([]);
  const [relatedStatus, setRelatedStatus] = useState<"idle" | "loading" | "loaded" | "error">(
    initialCourse ? "loading" : "idle",
  );
  const [relatedRetry, setRelatedRetry] = useState(0);
  const [loading, setLoading] = useState(!initialCourse);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    setError(false);
    setRelatedCourses([]);

    const loadRelatedCourses = (currentCourse: CourseWithId) => {
      setRelatedStatus("loading");
      const params = new URLSearchParams({
        category: currentCourse.category,
        excludeId: currentCourse.id,
      });

      void fetch(`/api/courses?${params}`, {
        cache: "no-store",
        signal: controller.signal,
      })
        .then(async (response) => {
          if (!response.ok) throw new Error(`Related courses request failed: ${response.status}`);
          return (await response.json()) as { courses: RelatedCourse[] };
        })
        .then(({ courses }) => {
          if (!active) return;

          setRelatedCourses(courses);
          setRelatedStatus("loaded");
        })
        .catch((loadError) => {
          if (!active || controller.signal.aborted) return;

          console.error("Failed to load related courses:", loadError);
          setRelatedStatus("error");
        });
    };

    if (initialCourse) {
      setCourse(initialCourse);
      setLoading(false);
      loadRelatedCourses(initialCourse);
      return () => {
        active = false;
        controller.abort();
      };
    }

    setLoading(true);

    // The legacy detail route receives the Firebase record ID as ?id=...
    if (!courseId) {
      setCourse(null);
      setLoading(false);
      setRelatedStatus("idle");
      return () => {
        active = false;
        controller.abort();
      };
    }

    getCourse(courseId)
      .then((loadedCourse) => {
        if (!active) return;

        setCourse(loadedCourse);
        setLoading(false);

        if (!loadedCourse) {
          setRelatedStatus("idle");
          return;
        }

        loadRelatedCourses(loadedCourse);
      })
      .catch((loadError) => {
        if (!active) return;

        console.error("Failed to load course:", loadError);
        setError(true);
        setCourse(null);
        setRelatedStatus("idle");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [courseId, initialCourse, relatedRetry]);

  const displayedCourse = initialCourse ?? course;

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

  if (!displayedCourse) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
        <BookOpen className="h-10 w-10 text-indigo-500" />
        <h1 className="mt-5 text-2xl font-black text-slate-900">Course not found</h1>
        <p className="mt-2 text-sm text-slate-500">This course may have been removed or the link is incomplete.</p>
        <Link href="/" className="mt-6 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white hover:bg-indigo-700">Back to courses</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f8fc] pb-16 text-slate-900">
      <div className="mx-auto w-full px-4 py-8 sm:w-[90%] sm:px-0 lg:w-[80%] lg:py-12">
        <CourseDetailsHero course={displayedCourse} />
        <CourseOverview course={displayedCourse} />
        <RelatedCourses
          courses={relatedCourses}
          category={displayedCourse.category}
          status={relatedStatus}
          onRetry={() => setRelatedRetry((attempt) => attempt + 1)}
        />
      </div>
    </main>
  );
}
