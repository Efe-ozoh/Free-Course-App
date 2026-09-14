import { ArrowRight, BookOpen, Compass, HeartHandshake } from "lucide-react";
import Footer from "@/components/Footer/Footer";

const VALUES = [
  {
    icon: Compass,
    title: "Learn with direction",
    description: "Clear course paths help you spend less time searching and more time building useful skills.",
  },
  {
    icon: BookOpen,
    title: "Keep it practical",
    description: "We focus on approachable lessons and resources that make progress feel tangible from day one.",
  },
  {
    icon: HeartHandshake,
    title: "Make learning open",
    description: "Everyone deserves a welcoming place to explore a new idea, refresh a skill, or start from scratch.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <section className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16 lg:py-24">
          <div>
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">About Eduliver</p>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              A quieter way to keep learning.
            </h1>
          </div>
          <p className="max-w-xl text-lg leading-8 text-[var(--muted)]">
            Eduliver brings useful online courses into one friendly library, so curious people can find their next skill without the noise.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">Why we exist</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Learning should feel possible.</h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-[var(--muted)]">
            <p>There is always another skill worth exploring, but finding a good place to begin can be harder than it should be. Eduliver is designed to make that first step simple.</p>
            <p>Browse at your own pace, return when you have time, and build a learning habit that fits the rest of your life. No pressure, just a useful next lesson.</p>
          </div>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {VALUES.map(({ icon: Icon, title, description }) => (
            <article key={title} className="border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm shadow-emerald-950/[0.03]">
              <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--border)] bg-[var(--surface-muted)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Ready to find your next course?</h2>
            <p className="mt-2 text-[var(--muted)]">Start with one topic and see where it takes you.</p>
          </div>
          <a href="/" className="inline-flex w-fit items-center gap-2 rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700">
            Explore courses
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}