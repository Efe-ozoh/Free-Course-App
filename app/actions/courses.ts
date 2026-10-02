"use server";

import { revalidateTag } from "next/cache";

export async function revalidateCoursesCache(courseId?: string) {
  revalidateTag("courses-list", "default");

  if (courseId) {
    revalidateTag(`course:${courseId}`, "default");
  }
}
