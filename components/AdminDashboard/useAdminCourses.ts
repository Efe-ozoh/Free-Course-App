"use client";

import { useEffect, useState } from "react";
import { deleteCourse, getCourses, type StoredCourse } from "@/lib/courses";

export function useAdminCourses() {
  const [courses, setCourses] = useState<StoredCourse[]>([]);
  const [loading, setLoading] = useState(true);

  // Keep Firebase access and refresh behavior out of the dashboard layout.
  const loadCourses = async () => {
    try {
      setLoading(true);
      setCourses(await getCourses());
    } catch (error) {
      console.error("Failed to load courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadCourses();
  }, []);

  const removeCourse = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this course? This cannot be undone.")) {
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

  return { courses, loading, removeCourse };
}
