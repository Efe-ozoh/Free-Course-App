import type { StoredCourse } from "@/lib/courses";

export default function DashboardStats({ courses, visibleCourses }: { courses: StoredCourse[]; visibleCourses: number }) {
  // Categories are derived from the loaded data instead of maintained as separate state.
  const categories = new Set(courses.map((course) => course.category).filter(Boolean));

  return (
    <section className="mt-9 grid gap-4 sm:grid-cols-3">
      <div className="rounded-2xl bg-[#17332d] p-5 text-white shadow-sm"><p className="text-sm text-[#a8c1b8]">Total courses</p><p className="mt-3 text-3xl font-black">{courses.length}</p><p className="mt-2 text-xs text-[#a8c1b8]">Published in your library</p></div>
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm"><p className="text-sm text-[var(--muted)]">Categories</p><p className="mt-3 text-3xl font-black">{categories.size}</p><p className="mt-2 text-xs text-[var(--muted)]">Topics covered</p></div>
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm"><p className="text-sm text-[var(--muted)]">Showing now</p><p className="mt-3 text-3xl font-black">{visibleCourses}</p><p className="mt-2 text-xs text-[var(--muted)]">Matching your filters</p></div>
    </section>
  );
}
