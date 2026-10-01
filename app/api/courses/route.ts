import { NextResponse } from "next/server";
import { getAllCourses, getCoursesPage } from "@/lib/courses-server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const offset = Number(searchParams.get("offset") ?? "0");
  const limit = Math.min(Number(searchParams.get("limit") ?? "12"), 24);

  const [courses, allCourses] = await Promise.all([
    getCoursesPage(offset, limit),
    getAllCourses(),
  ]);

  const hasMore = offset + courses.length < allCourses.length;

  return NextResponse.json({ courses, hasMore });
}
