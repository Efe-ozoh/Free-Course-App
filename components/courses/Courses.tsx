import { Suspense } from "react";
import { getCourses } from "@/lib/courses-server";
import CourseContent from "./CourseContent";

export default async function Courses() {
    let courses;

    try {
        courses = await getCourses();
    } catch (error) {
        console.error("Failed to load courses:", error);
        return <p className="col-span-full py-16 text-center text-sm text-rose-500">Unable to load courses. Please refresh and try again.</p>;
    }

    return (
        <Suspense
            fallback={
                <p className="col-span-full py-16 text-center text-sm text-slate-400">
                    Loading courses...
                </p>
            }
        >
            <CourseContent initialCourses={courses} />
        </Suspense>
    );
}