import { Suspense } from "react";
import CourseContent from "./CourseContent"

export default function Courses() {
    return (
        <Suspense
            fallback={
                <p className="col-span-full py-16 text-center text-sm text-slate-400">
                    Loading courses...
                </p>
            }
        >
            <CourseContent />
        </Suspense>
    );
}