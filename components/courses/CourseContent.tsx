"use client";

import { useEffect, useRef, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import CourseCard from "./CourseCard";
import type { StoredCourse } from "@/lib/courses";

function shuffleCourses(courses: StoredCourse[]) {
    const shuffledCourses = [...courses];
    for (let index = shuffledCourses.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [shuffledCourses[index], shuffledCourses[randomIndex]] = [shuffledCourses[randomIndex], shuffledCourses[index]];
    }
    return shuffledCourses;
}

export default function CourseContent({ initialCourses }: { initialCourses: StoredCourse[] }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [courses, setCourses] = useState<StoredCourse[]>(initialCourses);
    const [searchInput, setSearchInput] = useState(searchParams.get("search") ?? "");

    useEffect(() => {
        setCourses(shuffleCourses(initialCourses));
    }, [initialCourses]);

    useEffect(() => {
        setSearchInput(searchParams.get("search") ?? "");
    }, [searchParams]);

    const search = searchParams.get("search") ?? "";
    const category = searchParams.get("category") ?? "All categories";

    const updateSearchParam = (key: string, value: string, method: "push" | "replace") => {
        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        const query = params.toString();
        router[method](query ? `${pathname}?${query}` : pathname, { scroll: false });
    };

    useEffect(() => {
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        searchTimeoutRef.current = setTimeout(() => {
            updateSearchParam("search", searchInput.trim(), "replace");
        }, 250);

        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [searchInput]);

    const handleCategoryChange = (newCategory: string) => {
        updateSearchParam("category", newCategory === "All categories" ? "" : newCategory, "push");
    };

    const categories = Array.from(new Set(courses.map((course) => course.category).filter(Boolean))).sort();

    // Dynamic filtering stays local so results update immediately.
    const filteredCourses = courses.filter((course) => {
        const searchText = search.trim().toLowerCase();
        
        const matchesSearch = !searchText || [
            course.title, 
            course.description1, 
            course.category, 
            course.tags
        ].some((value) => value?.toLowerCase().includes(searchText));
        
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
                            <select 
                                value={category} 
                                onChange={(event) => handleCategoryChange(event.target.value)} 
                                className="w-full appearance-none rounded-xl border border-[var(--border)] bg-[var(--surface)] py-3 pl-11 pr-4 text-sm text-[var(--foreground)] outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20"
                            >
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
                <CourseCard key={course.id} category={course.category} title={course.title} image={course.image} href={`/course/${course.id}`} />
            ))}
        </>
    );
}
