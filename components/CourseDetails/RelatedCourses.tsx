import type { RelatedCourse } from "@/lib/courses";
import CourseCard from "@/components/courses/CourseCard";

type RelatedCoursesProps = {
  courses: RelatedCourse[];
  category: string;
  status: "idle" | "loading" | "loaded" | "error";
  onRetry: () => void;
};

export default function RelatedCourses({
  courses,
  category,
  status,
  onRetry,
}: RelatedCoursesProps) {
  if (status === "idle") return null;

  return (
    <section className="mt-14">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">Keep exploring</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight">See also</h2>
        </div>
        <span className="text-sm text-slate-500">More in {category}</span>
      </div>
      {status === "loading" ? (
        <div
          aria-label="Loading related courses"
          aria-busy="true"
          className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className="h-72 animate-pulse rounded-2xl border border-[var(--border)] bg-[var(--surface)] motion-reduce:animate-none"
            />
          ))}
        </div>
      ) : status === "error" ? (
        <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 text-sm text-[var(--muted)]">
          <p>Related courses could not be loaded.</p>
          <button
            type="button"
            onClick={onRetry}
            className="mt-3 rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
          >
            Try again
          </button>
        </div>
      ) : courses.length > 0 ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              category={course.category}
              title={course.title}
              image={course.image}
              prefetch={false}
              href={`/course/${course.id}`}
            />
          ))}
        </div>
      ) : (
        <p className="mt-6 text-sm text-[var(--muted)]">
          No other courses in this category yet.
        </p>
      )}
    </section>
  );
}
