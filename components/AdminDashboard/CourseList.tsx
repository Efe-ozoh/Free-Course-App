import Link from "next/link";
import { BookOpen, Pencil, Trash2 } from "lucide-react";
import type { StoredCourse } from "@/lib/courses";
import CourseImage from "@/components/Cards/CourseImage";

type CourseListProps = {
  courses: StoredCourse[];
  onDelete: (id: string) => void;
};

export default function CourseList({ courses, onDelete }: CourseListProps) {
  // Keep the empty state here so the dashboard does not need to know how courses are rendered.
  if (courses.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)] p-14 text-center">
        <BookOpen className="mx-auto text-[#a8b8b1]" size={28} />
        <p className="mt-3 font-bold">No courses found</p>
        <p className="mt-1 text-sm text-[#6c7c77]">Try a different search or category.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
      {courses.map((course) => (
        <div key={course.id} className="flex flex-col gap-4 border-b border-[var(--border)] p-4 last:border-0 sm:flex-row sm:items-center sm:p-5">
          <CourseImage src={course.image} alt={`${course.title} cover`} className="h-16 w-full rounded-xl object-cover sm:h-16 sm:w-24" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate font-bold">{course.title}</h3>
              <span className="rounded-full bg-[#fff0e9] px-2.5 py-1 text-[11px] font-bold text-[#c95e32]">{course.category}</span>
              <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${course.published === false ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>{course.published === false ? "Draft" : "Published"}</span>
            </div>
            <p className="mt-2 line-clamp-1 text-sm text-[#7b8984]">Ready for learners to explore and build with.</p>
          </div>
          <div className="flex gap-2">
            <Link href={`/admin/edit_course/${course.id}`} aria-label={`Edit ${course.title}`} className="flex items-center justify-center rounded-lg border border-[var(--border)] p-2 text-[var(--muted)] transition hover:border-[#e37445] hover:text-[#c95e32]"><Pencil size={17} /></Link>
            <Link href={`/course/${course.id}`} className="rounded-lg border border-[#dfe8e3] px-3 py-2 text-sm font-bold text-[#48625a] transition hover:border-[#e37445] hover:text-[#c95e32]">View</Link>
            <button type="button" onClick={() => onDelete(course.id)} aria-label={`Delete ${course.title}`} className="flex items-center justify-center rounded-lg border border-[#f3d8d0] p-2 text-[#d06443] transition hover:bg-[#fff0e9]"><Trash2 size={17} /></button>
          </div>
        </div>
      ))}
    </div>
  );
}
