"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { getCourses, deleteCourse } from "@/lib/courses";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const loadCourses = async () => {
    try {
      setLoading(true);

      const data = await getCourses();
      setCourses(data);
    } catch (error) {
      console.error("Failed to load courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course?")) {
      return;
    }

    try {
      await deleteCourse(id);
      await loadCourses();
    } catch (error) {
      console.error("Failed to delete course:", error);
      alert("Failed to delete course.");
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchTitle = course.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "All" ||
      course.category === category;

    return matchTitle && matchCategory;
  });

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-gray-500">Loading courses...</p>
      </div>
    );
  }

  return (
    <div className="p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Course Dashboard
        </h1>

        <p className="mt-1 text-gray-500">
          Manage your courses from here.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">

        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border px-4 py-3 outline-none focus:border-blue-500 sm:w-80"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
        >
          <option value="All">All Categories</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="AI">AI</option>
          <option value="UI/UX">UI/UX</option>
        </select>

      </div>

      {/* Course Count */}
      <div className="mb-5">
        <h2 className="font-semibold">
          Total Courses: {filteredCourses.length}
        </h2>
      </div>

      {/* Courses */}
      {filteredCourses.length === 0 ? (
        <div className="rounded-lg border p-10 text-center">
          <p className="text-gray-500">
            No courses found.
          </p>
        </div>
      ) : (
        <div className="space-y-4">

          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="flex flex-col gap-4 rounded-xl border bg-white p-4 shadow-sm sm:flex-row sm:items-center"
            >

              {/* Image */}
              <Image
                src={course.image}
                alt={course.title}
                width={80}
                height={80}
                className="h-20 w-20 rounded-lg object-cover"
              />

              {/* Course information */}
              <div className="flex-1">
                <h3 className="font-semibold">
                  {course.title}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {course.category}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">

                <button
                  type="button"
                  className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-600"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(course.id)}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}