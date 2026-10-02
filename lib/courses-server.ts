import "server-only";
import { unstable_cache } from "next/cache";
import { db } from "../db_firebase/firebase";
import { ref, get, query, orderByChild, equalTo, limitToFirst } from "firebase/database";
import type { Course, StoredCourse } from "./courses";

const normalizeCourse = (id: string, value: unknown): StoredCourse => {
  const course = value as Course;

  return {
    ...course,
    id,
    image: course.image || course.imageUrl || "",
    published: course.published ?? true,
  };
};

const readPublishedCourses = async (limit?: number): Promise<StoredCourse[]> => {
  const snapshot = await get(ref(db, "courses"));

  if (!snapshot.exists()) return [];

  const data = snapshot.val() as Record<string, unknown>;

  const courses = Object.entries(data)
    .map(([id, value]) => normalizeCourse(id, value))
    .filter((course) => course.published !== false);

  return typeof limit === "number" ? courses.slice(0, limit) : courses;
};

const getCachedAllCourses = unstable_cache(
  async (): Promise<StoredCourse[]> => readPublishedCourses(),
  ["courses-list-all"],
  { revalidate: 3600, tags: ["courses-list"] },
);

const getCachedCourses = unstable_cache(
  async (limit = 12): Promise<StoredCourse[]> => readPublishedCourses(limit),
  ["courses-list"],
  { revalidate: 3600, tags: ["courses-list"] },
);

export async function getCourses(limit = 12): Promise<StoredCourse[]> {
  return getCachedCourses(limit);
}

export async function getCoursesPage(offset = 0, limit = 12): Promise<StoredCourse[]> {
  const snapshot = await get(ref(db, "courses"));

  if (!snapshot.exists()) return [];

  const data = snapshot.val() as Record<string, unknown>;

  const publishedCourses = Object.entries(data)
    .map(([id, value]) => normalizeCourse(id, value))
    .filter((course) => course.published !== false)
    .sort((a, b) => Number(b.createdAt ?? 0) - Number(a.createdAt ?? 0));

  return publishedCourses.slice(offset, offset + limit);
}

export async function getAllCourses(): Promise<StoredCourse[]> {
  return getCachedAllCourses();
}

export async function getCourse(id: string): Promise<StoredCourse | null> {
  const getCachedCourse = unstable_cache(
    async (): Promise<StoredCourse | null> => {
      const snapshot = await get(ref(db, `courses/${id}`));

      if (!snapshot.exists()) return null;

      return normalizeCourse(id, snapshot.val());
    },
    ["course", id],
    { revalidate: 3600, tags: [`course:${id}`] },
  );

  return getCachedCourse();
}
