import "server-only";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import type { Course, StoredCourse } from "./courses";

const FIREBASE_REQUEST_TIMEOUT_MS = 15_000;
const COURSE_CACHE_REVALIDATE_SECONDS = 300;

async function readFirebaseJson(path: string): Promise<unknown> {
  const databaseUrl = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("NEXT_PUBLIC_FIREBASE_DATABASE_URL is not configured");
  }

  const requestUrl = `${databaseUrl.replace(/\/+$/, "")}/${path}.json`;
  const start = Date.now();

  console.info(`[Eduliver] Starting Firebase REST request: ${path}`);

  try {
    const response = await fetch(requestUrl, {
      cache: "no-store",
      signal: AbortSignal.timeout(FIREBASE_REQUEST_TIMEOUT_MS),
    });

    if (!response.ok) {
      throw new Error(
        `Firebase REST request failed: ${response.status} ${response.statusText}`,
      );
    }

    const data: unknown = await response.json();
    console.info(
      `[Eduliver] Firebase REST request completed in ${Date.now() - start}ms: ${path}`,
    );

    return data;
  } catch (error) {
    console.error(
      `[Eduliver] Firebase REST request failed after ${Date.now() - start}ms: ${path}`,
      error,
    );
    throw error;
  }
}

const normalizeCourse = (id: string, value: unknown): StoredCourse => {
  const course = value as Course;

  return {
    ...course,
    id,
    image: course.image || course.imageUrl || "",
    published: course.published ?? true,
  };
};

const readPublishedCourses = async (): Promise<StoredCourse[]> => {
  const data = await readFirebaseJson("courses");

  if (data === null) return [];

  if (typeof data !== "object") {
    throw new Error("Firebase courses response must be an object or null");
  }

  const courses = Object.entries(data)
    .map(([id, value]) => normalizeCourse(id, value))
    .filter((course) => course.published !== false);

  return courses;
};

const getCachedPublishedCourses = unstable_cache(
  readPublishedCourses,
  ["published-courses"],
  {
    revalidate: COURSE_CACHE_REVALIDATE_SECONDS,
    tags: ["courses"],
  },
);

export async function getCourses(limit = 12): Promise<StoredCourse[]> {
  return (await getAllCourses()).slice(0, limit);
}

export async function getCoursesPage(offset = 0, limit = 12): Promise<StoredCourse[]> {
  const publishedCourses = [...await getAllCourses()]
    .sort((a, b) => Number(b.createdAt ?? 0) - Number(a.createdAt ?? 0));

  return publishedCourses.slice(offset, offset + limit);
}

export async function getAllCourses(): Promise<StoredCourse[]> {
  return getCachedPublishedCourses();
}

const getCachedCourse = unstable_cache(
  async (id: string): Promise<StoredCourse | null> => {
    const data = await readFirebaseJson(`courses/${encodeURIComponent(id)}`);

    if (data === null) return null;

    if (typeof data !== "object" || Array.isArray(data)) {
      throw new Error(`Firebase course response is invalid for course ${id}`);
    }

    return normalizeCourse(id, data);
  },
  ["course-by-id"],
  {
    revalidate: COURSE_CACHE_REVALIDATE_SECONDS,
    tags: ["courses"],
  },
);

// Metadata and the page body can share one cold course read in the same render.
export const getCourse = cache(
  async (id: string): Promise<StoredCourse | null> => getCachedCourse(id),
);
