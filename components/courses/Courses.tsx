import { Suspense } from "react";
import { getAllCourses } from "@/lib/courses-server";
import CourseContent from "./CourseContent";

export default async function Courses() {
    let courses;

    try {
        courses = await getAllCourses();
    } catch (error) {
        console.error("Failed to load courses:", error);
        return <p className="col-span-full py-16 text-center text-sm text-rose-500">Unable to load courses. Please refresh and try again.</p>;
    }

    return (
        <Suspense
            fallback={
                <div className="col-span-full grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-72 animate-pulse rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
                        />
                    ))}
                </div>
            }
        >
            <CourseContent initialCourses={courses} />
        </Suspense>
    );
}