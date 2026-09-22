"use client";

import { useEffect, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import CourseCard from "./CourseCard";
import { getCourses, type StoredCourse } from "@/lib/courses";

function shuffleCourses(courses: StoredCourse[]) {
    const shuffledCourses = [...courses];

    for (let index = shuffledCourses.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [shuffledCourses[index], shuffledCourses[randomIndex]] = [shuffledCourses[randomIndex], shuffledCourses[index]];
    }

    return shuffledCourses;
}

export default function CourseContent() {
    const searchParams = useSearchParams();
    const [courses, setCourses] = useState<StoredCourse[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState(searchParams.get("search") ?? "");
    const [category, setCategory] = useState("All categories");
    const [error, setError] = useState(false);

    useEffect(() => {
        // The header stores the search term in the URL so it survives navigation.
        setSearch(searchParams.get("search") ?? "");
    }, [searchParams]);

    useEffect(() => {
        // Load the full library once; search and category filtering stay local and responsive.
        getCourses()
            .then((loadedCourses) => setCourses(shuffleCourses(loadedCourses)))
            .catch((loadError) => {
                console.error("Failed to load courses:", loadError);
                setError(true);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <p className="col-span-full py-16 text-center text-sm text-slate-400">Loading courses...</p>;
    }

    if (error) {
        return <p className="col-span-full py-16 text-center text-sm text-rose-500">Unable to load courses. Please refresh and try again.</p>;
    }

    const categories = Array.from(new Set(courses.map((course) => course.category).filter(Boolean))).sort();
    // Apply both filters to the same source list so the result count stays consistent.
    const filteredCourses = courses.filter((course) => {
        const searchText = search.trim().toLowerCase();
        const matchesSearch = !searchText || [course.title, course.description1, course.category, course.tags].some((value) => value?.toLowerCase().includes(searchText));
        const matchesCategory = category === "All categories" || course.category === category;
        return matchesSearch && matchesCategory && course.published !== false;
    });

    return (
        <>
            <section id="course-library" className="col-span-full rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm sm:p-7">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--muted)]">Search the library or narrow it down by category.</p>
                    </div>
                    <div className="flex w-full justify-end sm:w-auto">
                        <label className="relative w-full sm:w-52">
                            <SlidersHorizontal className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-[var(--muted)]" />
                            <select value={category} onChange={(event) => setCategory(event.target.value)} className="w-full appearance-none rounded-xl border border-[var(--border)] bg-[var(--surface)] py-3 pl-11 pr-4 text-sm text-[var(--foreground)] outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20">
                                <option>All categories</option>
                                {categories.map((item) => <option key={item}>{item}</option>)}
                            </select>
                        </label>
                    </div>
                </div>
            </section>

            {filteredCourses.length === 0 ? (
                <div className="col-span-full py-16 text-center text-sm text-slate-400">No courses match your search or category.</div>
            ) : filteredCourses.map((course) => (
                <CourseCard key={course.id} category={course.category} title={course.title} image={course.image} href={`/CourseDetails?id=${course.id}`} />
            ))}
        </>
    );
}
