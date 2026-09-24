import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer/Footer";
import CourseDetailsClient from "@/app/course/[id]/CourseDetailsClient";
import { getCourse } from "@/lib/courses";

type CoursePageProps = {
  params: Promise<{ id: string }>;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

function getCourseDescription(course: Awaited<ReturnType<typeof getCourse>>) {
  if (!course) return "";

  return [course.description1, course.description2]
    .filter(Boolean)
    .join(" ") || `Learn ${course.title} with this free online course.`;
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const course = await getCourse(id);

    if (!course) return { title: "Course Not Found | Eduliver" };

    return {
      title: `Free Course: ${course.title}`,
      description: getCourseDescription(course),
      alternates: {
        canonical: new URL(`/course/${encodeURIComponent(id)}`, siteUrl).toString(),
      },
    };
  } catch {
    return { title: "Free Online Course | Eduliver" };
  }
}

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const { id } = await params;
  let course;

  try {
    course = await getCourse(id);
  } catch (error) {
    console.error("Failed to load course on server:", error);
  }

  if (!course) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: getCourseDescription(course),
    provider: {
      "@type": "Organization",
      name: "Eduliver",
      url: siteUrl,
    },
    offers: {
      "@type": "Offer",
      price: "0.00",
      priceCurrency: "USD",
      category: "Free Education",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <CourseDetailsClient initialCourse={course} />
      <Footer />
    </>
  );
}