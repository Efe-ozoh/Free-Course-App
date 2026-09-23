"use client";

import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getCourse, getCourses, type StoredCourse } from "@/lib/courses";
import CourseDetailsHero from "@/components/CourseDetails/CourseDetailsHero";
import CourseOverview from "@/components/CourseDetails/CourseOverview";
import RelatedCourses from "@/components/CourseDetails/RelatedCourses";

type CourseWithId = StoredCourse;

export default function CourseDetailsClient() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("id");
  const [course, setCourse] = useState<CourseWithId | null>(null);
  const [relatedCourses, setRelatedCourses] = useState<StoredCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setRelatedCourses([]);

    // The detail route receives the Firebase record ID as ?id=...
    if (!courseId) {
      setCourse(null);
      setLoading(false);
      return;
    }

    getCourse(courseId)
      .then(async (loadedCourse) => {
        setCourse(loadedCourse);

        if (!loadedCourse) return;

        const courses = await getCourses();
        setRelatedCourses(
          courses
            .filter(
              (candidate) =>
                candidate.id !== loadedCourse.id &&
                candidate.published !== false &&
                candidate.category === loadedCourse.category,
            )
            .slice(0, 4),
        );
      })
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
        <Link href="/" className="mt-6 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white hover:bg-indigo-700">Back to courses</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f8fc] pb-16 text-slate-900">
      <div className="mx-auto w-[80%] px-0 py-8 sm:py-8 lg:py-12">
        <CourseDetailsHero course={course} />
        <CourseOverview course={course} />
        <RelatedCourses courses={relatedCourses} category={course.category} />
      </div>
    </main>
  );
}
