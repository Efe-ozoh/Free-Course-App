import CourseCard from "@/components/Cards/CourseCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0b10] px-6 py-12">
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <CourseCard
        category="All Courses"
        title="Google Veo 3.1 Complete Mastery: From Text to Cinema"
      />
      <CourseCard
        category="All Courses"
        title="FastAPI + WebSockets: Real-Time Job Pipelines"
      />
      <CourseCard
        category="All Courses"
        title="Machine Learning for Counterfeit Detection"
      />
    </div>
  </main>
  );
}
