import { Clock, Check, Camera, Bird, Sparkles, User } from "lucide-react";
import CourseCurriculum, {
  CurriculumSection,
} from "@/components/CourseDetails/CourseCurriculum";

const course = {
  category: "All Courses",
  readTime: "20 min read",
  title: "Google Veo 3.1 Complete Mastery: From Text to Cinema",
  subtitle:
    "Turn a plain-text prompt into a director-grade shot list — camera language, lighting, character consistency, and a repeatable workflow for shipping client-ready video.",
  learn: [
    "Go from zero to a working Veo 3.1 pipeline",
    "Write prompts that hold up across takes, not just the first one",
    "Keep a character's face and outfit consistent across shots",
    "Use 10 shot types and 8 camera moves with intent",
    "Light a scene for mood, not just visibility",
    "Assemble multi-clip sequences with clean transitions",
    "Sync cuts to a beat instead of eyeballing it",
    "Grade footage in DaVinci Resolve to a client-ready finish",
    "Storyboard before you spend a single generation credit",
    "Debug the usual failure modes: morphing, flicker, drift",
  ],
  requirements: [
    "No prior video or AI experience — every step is shown from scratch",
    "A computer with a browser; Windows or Mac both work",
    "A free Google AI Studio account (setup covered in lesson one)",
    "No design, editing, or coding background required",
  ],
  curriculum: [
    {
      title: "Getting started",
      lessons: [
        "Setting up your Google AI Studio account",
        "A tour of the Flow interface",
        "Your first clip in under 10 minutes",
        "Credits, resolution, and aspect ratios",
      ],
    },
    {
      title: "Prompt engineering foundations",
      lessons: [
        "The Subject → Action → Setting → Mood framework",
        "Visual descriptors that actually change output",
        "Camera language: naming the shot you want",
        "Lighting vocabulary: golden hour, rim light, fog",
      ],
    },
    {
      title: "Shots & camera moves",
      lessons: [
        "10 core shot types, from wide to extreme close-up",
        "8 camera moves: dolly, orbit, crane, rack focus, and more",
        "Lens choice and depth of field as storytelling tools",
      ],
    },
    {
      title: "Character consistency",
      lessons: [
        "Building a reusable reference library",
        "Keeping a face and wardrobe stable across scenes",
        "Seed and style controls, explained plainly",
      ],
    },
    {
      title: "Assembly, audio & grading",
      lessons: [
        "Multi-clip sequencing and transitions",
        "Layering dialogue, music, and sound design",
        "Color grading fundamentals in DaVinci Resolve",
        "Exporting for TikTok, Instagram, and YouTube",
      ],
    },
  ] satisfies CurriculumSection[],
};

function HeroCollage() {
  return (
    <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#1b2038] via-[#141726] to-[#0d0f18] sm:h-56 lg:h-64">
      <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-indigo-500/30 blur-3xl sm:h-40 sm:w-40" />
      <div className="pointer-events-none absolute -right-6 bottom-0 h-24 w-24 rounded-full bg-fuchsia-500/20 blur-3xl sm:h-32 sm:w-32" />

      <svg
        className="absolute left-4 top-1/2 h-20 w-20 -translate-y-1/2 opacity-70 sm:left-6 sm:h-28 sm:w-28"
        viewBox="0 0 100 100"
        fill="none"
      >
        <defs>
          <linearGradient id="swirl2" x1="0" y1="0" x2="100" y2="100">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="50%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <path
          d="M50 5 A45 45 0 1 1 5 50"
          stroke="url(#swirl2)"
          strokeWidth="7"
          strokeLinecap="round"
        />
      </svg>

      <div className="absolute right-3 top-3 flex -space-x-2.5 sm:right-4 sm:top-4 sm:-space-x-3">
        <div className="flex h-9 w-9 rotate-[-8deg] items-center justify-center rounded-lg bg-slate-700/90 ring-2 ring-[#141726] sm:h-11 sm:w-11">
          <Camera className="h-4 w-4 text-white sm:h-5 sm:w-5" />
        </div>
        <div className="flex h-9 w-9 rotate-[4deg] items-center justify-center rounded-lg bg-sky-600/90 ring-2 ring-[#141726] sm:h-11 sm:w-11">
          <Bird className="h-4 w-4 text-white sm:h-5 sm:w-5" />
        </div>
        <div className="flex h-9 w-9 rotate-[-4deg] items-center justify-center rounded-lg bg-violet-600/90 ring-2 ring-[#141726] sm:h-11 sm:w-11">
          <Sparkles className="h-4 w-4 text-white sm:h-5 sm:w-5" />
        </div>
      </div>

      <div className="absolute bottom-3 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-orange-500 ring-4 ring-[#141726] sm:bottom-4 sm:right-6 sm:h-16 sm:w-16">
        <User className="h-6 w-6 text-white/90 sm:h-8 sm:w-8" />
      </div>
    </div>
  );
}

function EnrollCard() {
  return (
    <a
      href="#enroll"
      className="block w-full rounded-xl bg-indigo-600 px-6 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
    >
      Enroll in this course
    </a>
  );
}

export default function CourseDetailPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 text-slate-900 sm:px-6 sm:py-10 lg:px-8">
      <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-12">
        {/* Main column */}
        <div className="min-w-0 max-w-2xl lg:max-w-none">
          {/* Eyebrow + meta */}
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              {course.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Clock className="h-3.5 w-3.5 shrink-0" />
              {course.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="break-words text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
            {course.title}
          </h1>

          {/* Hero collage */}
          <div className="my-6">
            <HeroCollage />
          </div>

          {/* Subtitle */}
          <p className="mb-8 break-words text-[15px] leading-relaxed text-slate-600">
            {course.subtitle}
          </p>

          {/* What you'll learn */}
          <section className="mb-10">
            <h2 className="mb-4 text-xl font-bold">What you'll learn</h2>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {course.learn.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Requirements */}
          <section className="mb-10">
            <h2 className="mb-4 text-xl font-bold">Requirements</h2>
            <ul className="space-y-2.5 text-sm text-slate-700">
              {course.requirements.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Curriculum */}
          <section className="mb-10">
            <h2 className="mb-4 text-xl font-bold">Course curriculum</h2>
            <CourseCurriculum sections={course.curriculum} />
          </section>

          {/* CTA — mobile & tablet only, sidebar handles it on desktop */}
          <div className="lg:hidden">
            <EnrollCard />
          </div>
        </div>

      </div>
    </main>
  );
}
