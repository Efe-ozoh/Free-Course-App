// lib/courses.ts
import { db } from "../db_firebase/firebase";
import {
  ref,
  push,
  set,
  get,
  remove
} from "firebase/database";

export interface Course {
  title: string;
  image: string;
  description1: string;
  description2?: string;
  link: string;
  category: string;
}

export async function addCourse(course: Course) {
  console.log("1. addCourse called:", course);

  try {
    const coursesRef = ref(db, "courses");
    console.log("2. coursesRef created");

    const newCourseRef = push(coursesRef);
    console.log("3. new course key:", newCourseRef.key);

    await set(newCourseRef, {
      ...course,
      createdAt: Date.now(),
    });

    console.log("4. Firebase write successful!");

    alert("Course uploaded successfully!");

    return newCourseRef.key;

  } catch (error) {
    console.error("❌ Firebase error:", error);

    alert("Failed to upload course. Check the console.");

    return null;
  }
}
export async function getCourses() {
  const snapshot = await get(ref(db, "courses"));

  if (!snapshot.exists()) return [];

  const data = snapshot.val();

  return Object.entries(data).map(([id, value]: any) => ({
    id,
    ...value,
  }));
}

export async function deleteCourse(id: string) {
  await remove(ref(db, `courses/${id}`));
}

export async function updateCourse(id: string, data: Partial<Course>) {
  await update(ref(db, `courses/${id}`), data);
}