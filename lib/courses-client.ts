import { db } from "../db_firebase/firebase";
import {
  ref,
  push,
  set,
  get,
  remove,
  update,
} from "firebase/database";
import type { Course, StoredCourse } from "./courses";

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

export async function getCourses(): Promise<StoredCourse[]> {
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

export async function deleteCourse(id: string) {
  await remove(ref(db, `courses/${id}`));
}

export async function updateCourse(id: string, data: Partial<Course>) {
  await update(ref(db, `courses/${id}`), {
    ...data,
    updatedAt: Date.now(),
  });
}
