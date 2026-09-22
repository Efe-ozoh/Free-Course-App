import Courses from "@/components/Cards/Courses";
import Footer from "@/components/Footer/Footer";


export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-[var(--background)] px-6 py-12 text-[var(--foreground)]">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Courses />
        </div>
      </main>
      <Footer />
    </>
  );
}
