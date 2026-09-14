"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

import CourseFilters from "@/components/AdminDashboard/CourseFilters";
import CourseList from "@/components/AdminDashboard/CourseList";
import DashboardSidebar from "@/components/AdminDashboard/DashboardSidebar";
import DashboardStats from "@/components/AdminDashboard/DashboardStats";
import { useAdminCourses } from "@/components/AdminDashboard/useAdminCourses";

export default function AdminDashboard() {
  const { courses, loading, removeCourse } = useAdminCourses();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = Array.from(new Set(courses.map((course) => course.category).filter(Boolean)));
  // Filtering remains in the page so the stats, result count, and list share one result set.
  const filteredCourses = courses.filter((course) => {
    const matchesTitle = course.title?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || course.category === category;
    return matchesTitle && matchesCategory;
  });

  const handleLogout = async () => {
    // Clear the server cookie before returning to the login screen.
    await fetch("/api/adminLogout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-[var(--background)]"><div className="flex items-center gap-3 text-sm font-medium text-[var(--muted)]"><span className="h-2 w-2 animate-pulse rounded-full bg-[#e37445]" />Loading your workspace...</div></div>;
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="flex min-h-screen">
        <DashboardSidebar onLogout={handleLogout} />
        <main className="min-w-0 flex-1 px-5 py-6 sm:px-8 lg:px-12 lg:py-9">
          <header className="flex items-center justify-between gap-4">
            <div><p className="text-sm font-semibold text-[#e37445]">Monday, September 7, 2026</p><h1 className="mt-1 text-3xl font-black tracking-tight sm:text-4xl">Good morning, Admin</h1><p className="mt-2 text-sm text-[var(--muted)]">Here is what is happening with your learning library.</p></div>
            <Link href="/admin/add_course" className="flex shrink-0 items-center gap-2 rounded-xl bg-[#e37445] px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#c95e32]"><Plus size={17} /><span className="hidden sm:inline">Add course</span></Link>
          </header>

          <DashboardStats courses={courses} visibleCourses={filteredCourses.length} />

          <section className="mt-10">
            <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><h2 className="text-xl font-black tracking-tight">Course library</h2><p className="mt-1 text-sm text-[var(--muted)]">Manage, organize, and refine your content.</p></div><div className="flex items-center gap-2 text-xs font-semibold text-[var(--muted)]"><span className="h-2 w-2 rounded-full bg-[#e37445]" />{filteredCourses.length} results</div></div>
            <CourseFilters search={search} category={category} categories={categories} onSearchChange={setSearch} onCategoryChange={setCategory} />
            <CourseList courses={filteredCourses} onDelete={removeCourse} />
          </section>
        </main>
      </div>
    </div>
  );
}
