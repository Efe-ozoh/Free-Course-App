"use client";

import { useEffect, useState } from "react";
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

export default function CourseContent({ initialCourses, hasMore: initialHasMore }: { initialCourses: StoredCourse[]; hasMore: boolean }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [courses, setCourses] = useState<StoredCourse[]>(initialCourses);
    const [visibleCount, setVisibleCount] = useState(Math.min(initialCourses.length, 12));
    const [hasMore, setHasMore] = useState(initialHasMore);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [searchInput, setSearchInput] = useState(searchParams.get("search") ?? "");

    useEffect(() => {
        setCourses(shuffleCourses(initialCourses));
        setVisibleCount(Math.min(initialCourses.length, 12));
        setHasMore(initialHasMore);
    }, [initialCourses, initialHasMore]);

    
    const search = searchParams.get("search") ?? "";
    const category = searchParams.get("category") ?? "All categories";
    const categories = Array.from(new Set(courses.map((course) => course.category).filter(Boolean))).sort();
    const normalizedCategory = categories.includes(category) ? category : "All categories";

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

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        updateSearchParam("search", searchInput.trim(), "replace");
    };

    const handleCategoryChange = (newCategory: string) => {
        updateSearchParam("category", newCategory === "All categories" ? "" : newCategory, "push");
    };

    const handleLoadMore = async () => {
        setIsLoadingMore(true);

        try {
            const response = await fetch(`/api/courses?offset=${visibleCount}&limit=12`);
            const data = await response.json();
            const nextCourses = Array.isArray(data.courses) ? data.courses : [];
            const nextHasMore = Boolean(data.hasMore);

            if (nextCourses.length > 0) {
                setCourses((existingCourses) => {
                    const existingIds = new Set(existingCourses.map((course) => course.id));
                    const uniqueCourses = nextCourses.filter((course: StoredCourse) => !existingIds.has(course.id));
                    return [...existingCourses, ...uniqueCourses];
                });
                setVisibleCount((currentValue) => currentValue + nextCourses.length);
            }

            setHasMore(nextHasMore);
        } finally {
            setIsLoadingMore(false);
        }
    };

    // Dynamic filtering stays local so results update immediately.
    const filteredCourses = courses.filter((course) => {
        const searchText = search.trim().toLowerCase();
        
        const matchesSearch = !searchText || [
            course.title, 
            course.description1, 
            course.category, 
            course.tags
        ].some((value) => value?.toLowerCase().includes(searchText));
        
        const matchesCategory = normalizedCategory === "All categories" || course.category === normalizedCategory;
        
        return matchesSearch && matchesCategory && course.published !== false;
    });

    const visibleCourses = filteredCourses.slice(0, visibleCount);
    const hasMoreCourses = hasMore || filteredCourses.length > visibleCourses.length;

    return (
        <>
            <section id="course-library" className="col-span-full rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm sm:p-7">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--muted)]">Search the library or narrow it down by category.</p>
                    </div>
                    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-64">
                            <Search className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-[var(--muted)]" />
                            <input
                                type="search"
                                aria-label="Search courses"
                                placeholder="Search courses"
                                value={searchInput}
                                onChange={(event) => setSearchInput(event.target.value)}
                                className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] py-3 pl-11 pr-4 text-sm text-[var(--foreground)] outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20"
                            />
                        </form>
                        <label className="relative w-full sm:w-52">
                            <SlidersHorizontal className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-[var(--muted)]" />
                            <select
                                value={normalizedCategory}
                                onChange={(event) => handleCategoryChange(event.target.value)}
                                className="w-full appearance-none rounded-xl border border-[var(--border)] bg-[var(--surface)] py-3 pl-11 pr-4 text-sm text-[var(--foreground)] outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20"
                            >
                                <option value="All categories">All categories</option>
                                {categories.map((item) => <option key={item} value={item}>{item}</option>)}
                            </select>
                        </label>
                    </div>
                </div>
            </section>

            {visibleCourses.length === 0 ? (
                <div className="col-span-full py-16 text-center text-sm text-slate-400">No courses match your search or category.</div>
            ) : (
                <>
                    {visibleCourses.map((course) => (
                        <CourseCard
                        key={course.id}
                         category={course.category}
                        title={course.title} 
                        image={course.image} 
                        href={`/course/${course.id}`} />
                    ))}

                    {hasMoreCourses && (
                        <div className="col-span-full flex justify-center pt-4">
                            <button
                                type="button"
                                onClick={handleLoadMore}
                                disabled={isLoadingMore}
                                className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 text-sm font-medium text-[var(--foreground)] transition hover:border-indigo-400 hover:text-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isLoadingMore ? "Loading more..." : "Load more"}
                            </button>
                        </div>
                    )}
                </>
            )}
        </>
    );
}
