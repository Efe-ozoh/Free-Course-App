import Footer from "@/components/Footer/Footer";

const TERMS_SECTIONS = [
  {
    title: "Using Eduliver",
    paragraphs: [
      "Eduliver provides access to educational course listings and related learning content. You may use the service for personal, non-commercial learning and exploration.",
      "Please use the site lawfully and respectfully. Do not attempt to disrupt the service, access areas you are not authorized to use, or misuse content and account information.",
    ],
  },
  {
    title: "Course content",
    paragraphs: [
      "Course information is provided for general educational purposes. Availability, descriptions, links, and content may change as courses are updated or removed.",
      "Eduliver does not guarantee that any course will meet a particular goal or produce a specific result. Please evaluate whether a course is right for your needs before relying on it.",
    ],
  },
  {
    title: "Accounts and security",
    paragraphs: [
      "If an account is required for a feature, you are responsible for keeping your sign-in details confidential and for activity associated with your account.",
      "Contact the site administrator promptly if you believe your account has been used without permission.",
    ],
  },
  {
    title: "Changes and contact",
    paragraphs: [
      "We may update these terms when the service changes. The latest version will be posted on this page, and continued use of Eduliver after an update means you accept the revised terms.",
      "Questions about these terms can be directed to the Eduliver site administrator.",
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <section className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8 lg:py-24">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">Eduliver policies</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Terms of use</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            A straightforward guide to using Eduliver and the expectations that help keep the learning experience useful for everyone.
          </p>
          <p className="mt-8 text-sm text-[var(--muted)]">Last updated: September 14, 2026</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-12 sm:px-8 lg:py-20">
        <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {TERMS_SECTIONS.map(({ title, paragraphs }) => (
            <article key={title} className="py-9 first:pt-0 last:pb-0">
              <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-[var(--muted)]">
                {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}