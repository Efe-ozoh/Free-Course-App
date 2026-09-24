import { BookOpen, CheckCircle2, ExternalLink, Tag } from "lucide-react";
import type { StoredCourse } from "@/lib/courses";

export default function CourseOverview({ course }: { course: StoredCourse }) {
  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
      <article className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-9">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">About this course</p>
        <h2 className="mt-3 text-2xl font-black tracking-tight">Build useful skills with a clear direction.</h2>
        <p className="mt-5 whitespace-pre-line text-[15px] leading-8 text-slate-600">{course.description1}</p>
        {course.description2 && <p className="mt-4 whitespace-pre-line text-[15px] leading-8 text-slate-600">{course.description2}</p>}
      </article>
      <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 lg:sticky lg:top-24">
        <p className="text-sm font-bold text-slate-900">Course overview</p>
        <div className="mt-5 space-y-4 text-sm text-slate-600">
          <div className="flex items-center gap-3"><CheckCircle2 className="text-emerald-500" size={18} /> Self-paced learning</div>
          <div className="flex items-center gap-3"><BookOpen className="text-indigo-500" size={18} /> Curated tutorial content</div>
          <div className="flex items-center gap-3"><Tag className="text-orange-500" size={18} /> {course.category}</div>
        </div>
        <a href={`/api/redirect?courseId=${course.id}`} target="_blank" rel="nofollow noopener noreferrer" className="mt-7 flex items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm font-bold text-indigo-700 hover:bg-indigo-100">Open course link <ExternalLink size={15} /></a>
      </aside>
    </div>
  );
}
