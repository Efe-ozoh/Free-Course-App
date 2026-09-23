import type { StoredCourse } from "@/lib/courses";
import CourseCard from "@/components/Cards/CourseCard";

export default function RelatedCourses({ courses, category }: { courses: StoredCourse[]; category: string }) {
  if (courses.length === 0) return null;

  return (
    <section className="mt-14">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">Keep exploring</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight">See also</h2>
        </div>
        <span className="text-sm text-slate-500">More in {category}</span>
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            category={course.category}
            title={course.title}
            image={course.image}
            href={`/CourseDetails?id=${course.id}`}
          />
        ))}
      </div>
    </section>
  );
}
