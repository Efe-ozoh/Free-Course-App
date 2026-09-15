"use client";

import { useState } from "react";
import { CheckCircle2, ImagePlus, LoaderCircle, Link2 } from "lucide-react";
import { addCourse, updateCourse, type Course } from "@/lib/courses";
import CourseImage from "@/components/Cards/CourseImage";

const emptyCourse: Course = {
  title: "",
  image: "",
  description1: "",
  description2: "",
  link: "",
  category: "",
  level: "Beginner",
  tags: "",
  published: true,
};

export default function CourseForm({ initialCourse, courseId, onSaved }: { initialCourse?: Course; courseId?: string; onSaved?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState<Course>(initialCourse ?? emptyCourse);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

 const handleChange = (
  event: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >
) => {
  // All fields share one object so the payload matches the Course data model.
  setCourse((currentCourse) => ({
    ...currentCourse,
    [event.target.name]: event.target.value,
  }));
  setError("");
  setSubmitted(false);
};

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedCourse = Object.fromEntries(
      Object.entries(course).map(([key, value]) => [key, typeof value === "string" ? value.trim() : value]),
    ) as Course;
    if (!trimmedCourse.title || !trimmedCourse.image || !trimmedCourse.description1 || !trimmedCourse.link || !trimmedCourse.category) {
      setError("Complete the required fields before publishing this course.");
      return;
    }
    if (!/^https?:\/\//i.test(trimmedCourse.image) || !/^https?:\/\//i.test(trimmedCourse.link)) {
      setError("Image and course links must start with http:// or https://.");
      return;
    }

    setLoading(true);
    try {
      if (courseId) {
        await updateCourse(courseId, trimmedCourse);
      } else {
        await addCourse(trimmedCourse);
        setCourse(emptyCourse);
      }
      setSubmitted(true);
      onSaved?.();
    } catch (error) {
      console.error(error);
      setError("We could not publish this course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="space-y-6">
          <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#e37445]">Course details</p><h2 className="mt-2 text-xl font-black">Shape the first impression</h2></div>
          <Field label="Course title" name="title" value={course.title} onChange={handleChange} placeholder="e.g. Build your first React app" />
          <div className="grid gap-5 sm:grid-cols-2"><Field label="Category" name="category" value={course.category} onChange={handleChange} placeholder="Frontend, AI, Design..." /><label className="block text-sm font-bold"><span className="mb-2 block">Level</span><select name="level" value={course.level ?? "Beginner"} onChange={handleChange} className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3.5 font-normal text-[var(--foreground)] outline-none focus:border-[#e37445] focus:ring-4 focus:ring-[#e37445]/10"><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></label></div>
          <Field label="Course URL" name="link" type="url" value={course.link} onChange={handleChange} placeholder="https://example.com/course" icon={<Link2 size={16} />} />
          <Field label="Cover image URL" name="image" type="url" value={course.image} onChange={handleChange} placeholder="https://images.example.com/cover.jpg" icon={<ImagePlus size={16} />} />
          <Field label="Tags" name="tags" value={course.tags ?? ""} onChange={handleChange} placeholder="react, javascript, frontend" />
          {course.image && <CourseImage src={course.image} alt="Course cover preview" className="h-44 w-full rounded-2xl object-cover" />}
        </div>
        <div className="space-y-6">
          <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#e37445]">The promise</p><h2 className="mt-2 text-xl font-black">Help learners choose well</h2></div>
          <TextField label="Short description" name="description1" value={course.description1} onChange={handleChange} placeholder="What will learners be able to do after this course?" />
          <TextField label="More context" name="description2" value={course.description2 ?? ""} onChange={handleChange} placeholder="Optional details, prerequisites, or a motivating note." />
        </div>
      </div>
      {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}
      {submitted && <p role="status" className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700"><CheckCircle2 size={17} /> Course published successfully.</p>}
      <div className="flex flex-col-reverse justify-between gap-4 border-t border-[var(--border)] pt-6 sm:flex-row sm:items-center"><label className="flex items-center gap-3 text-sm font-semibold"><input type="checkbox" name="published" checked={course.published ?? true} onChange={(event) => setCourse((current) => ({ ...current, published: event.target.checked }))} className="h-4 w-4 accent-[#e37445]" /> Publish immediately</label><button type="submit" disabled={loading} className="flex items-center justify-center gap-2 rounded-xl bg-[#e37445] px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#c95e32] disabled:cursor-not-allowed disabled:opacity-60">{loading && <LoaderCircle className="animate-spin" size={17} />}{loading ? "Saving..." : courseId ? "Save changes" : "Publish course"}</button></div>
    </form>
  );
}

function Field({ label, name, value, onChange, placeholder, type = "text", icon }: { label: string; name: string; value: string; onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; placeholder: string; type?: string; icon?: React.ReactNode }) {
  return <label className="block text-sm font-bold"><span className="mb-2 block">{label}</span><span className="relative block">{icon && <span className="pointer-events-none absolute left-3.5 top-3.5 text-[var(--muted)]">{icon}</span>}<input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} className={`w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3.5 font-normal text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[#e37445] focus:ring-4 focus:ring-[#e37445]/10 ${icon ? "pl-10" : ""}`} /></span></label>;
}

function TextField({ label, name, value, onChange, placeholder }: { label: string; name: string; value: string; onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void; placeholder: string }) {
  return <label className="block text-sm font-bold"><span className="mb-2 block">{label}{name === "description2" && <span className="ml-2 font-normal text-[var(--muted)]">Optional</span>}</span><textarea rows={name === "description1" ? 7 : 5} name={name} value={value} onChange={onChange} placeholder={placeholder} className="w-full resize-y rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3.5 font-normal leading-6 text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[#e37445] focus:ring-4 focus:ring-[#e37445]/10" /></label>;
}
