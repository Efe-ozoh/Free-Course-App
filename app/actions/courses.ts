"use server";

import { updateTag } from "next/cache";
import { verifySession } from "@/lib/session";

export async function invalidateCoursesCache() {
  const session = await verifySession();

  if (!session) {
    throw new Error("Unauthorized course cache invalidation");
  }

  updateTag("courses");
}
