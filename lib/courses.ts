// lib/courses.ts
import { db } from "../db_firebase/firebase";
import {
  ref,
  push,
  set,
  get,
  remove,
  update
} from "firebase/database";

export interface Course {
  title: string;
  image: string;
  description1: string;
  description2?: string;
  link: string;
  category: string;
  level?: "Beginner" | "Intermediate" | "Advanced";
  tags?: string;
  published?: boolean;
  createdAt?: number;
  updatedAt?: number;
}

// Course records are stored under one Firebase path; Firebase generates each record's ID.
export async function addCourse(course: Course) {
  const coursesRef = ref(db, "courses");
  const newCourseRef = push(coursesRef);

  await set(newCourseRef, {
    ...course,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });

  return newCourseRef.key;
}
export type StoredCourse = Course & { id: string };

// Convert Firebase's ID-keyed object into the array shape used by the UI.
export async function getCourses(): Promise<StoredCourse[]> {
  const snapshot = await get(ref(db, "courses"));

  if (!snapshot.exists()) return [];

  const data = snapshot.val();

  return Object.entries(data).map(([id, value]) => ({
    id,
    ...(value as Course),
    published: (value as Course).published ?? true,
  }));
}

export async function getCourse(id: string): Promise<StoredCourse | null> {
  const snapshot = await get(ref(db, `courses/${id}`));

  if (!snapshot.exists()) return null;

  return {
    id,
    ...(snapshot.val() as Course),
    published: (snapshot.val() as Course).published ?? true,
  };
}

export async function deleteCourse(id: string) {
  await remove(ref(db, `courses/${id}`));
}

export async function updateCourse(id: string, data: Partial<Course>) {
  await update(ref(db, `courses/${id}`), {
    ...data,
    updatedAt: Date.now(),
  });
}