import "server-only";
import { unstable_cache } from "next/cache";
import { db } from "../db_firebase/firebase";
import { ref, get } from "firebase/database";
import type { Course, StoredCourse } from "./courses";

const getCachedCourses = unstable_cache(
  async (): Promise<StoredCourse[]> => {
    const snapshot = await get(ref(db, "courses"));

    if (!snapshot.exists()) return [];

    const data = snapshot.val();

    return Object.entries(data).map(([id, value]) => {
      const course = value as Course;

      return {
        id,
        ...course,
        image: course.image || course.imageUrl || "",
        published: course.published ?? true,
      };
    });
  },
  ["courses-list"],
  { revalidate: 3600, tags: ["courses-list"] },
);

export async function getCourses(): Promise<StoredCourse[]> {
  return getCachedCourses();
}

export async function getCourse(id: string): Promise<StoredCourse | null> {
  const snapshot = await get(ref(db, `courses/${id}`));

  if (!snapshot.exists()) return null;

  const course = snapshot.val() as Course;

  return {
    id,
    ...course,
    image: course.image || course.imageUrl || "",
    published: course.published ?? true,
  };
}
