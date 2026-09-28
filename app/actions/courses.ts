"use server";

import { revalidateTag } from "next/cache";

export async function revalidateCoursesCache() {
  revalidateTag("courses-list", "default");
}
