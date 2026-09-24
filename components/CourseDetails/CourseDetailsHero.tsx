import { ArrowLeft, ArrowUpRight, Tag } from "lucide-react";
import Link from "next/link";
import type { StoredCourse } from "@/lib/courses";
import CourseImage from "@/components/Cards/CourseImage";

export default function CourseDetailsHero({ course }: { course: StoredCourse }) {
  return (
    <>
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-600">
        <ArrowLeft size={16} /> All courses
      </Link>
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
            <a href={`/api/redirect?courseId=${course.id}`} target="_blank" rel="nofollow noopener noreferrer" className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-indigo-400">Start learning <ArrowUpRight size={17} /></a>
          </div>
        </div>
      </section>
    </>
  );
}
