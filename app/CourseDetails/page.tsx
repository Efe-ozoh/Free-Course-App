import { Suspense } from "react";
import CourseDetailsClient from "./CourseDetailsClient";

export default function CourseDetailsPage() {
  return (
    <Suspense fallback={<p>Loading course details...</p>}>
      <CourseDetailsClient />
    </Suspense>
  );
}