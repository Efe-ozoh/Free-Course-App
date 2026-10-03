export default function Loading() {
  return (
    <main
      aria-label="Loading page"
      aria-busy="true"
      className="min-h-screen bg-[var(--background)] px-6 py-12"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 motion-reduce:animate-none">
        {Array.from({ length: 9 }, (_, index) => (
          <div
            key={index}
            className="h-72 animate-pulse rounded-2xl border border-[var(--border)] bg-[var(--surface)] motion-reduce:animate-none"
          />
        ))}
      </div>
    </main>
  );
}
