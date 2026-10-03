import { NextResponse } from "next/server";
import { getCourse } from "@/lib/courses-server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const courseId = searchParams.get("courseId");

  if (!courseId) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const course = await getCourse(courseId);

    if (!course || !course.link) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.redirect(course.link);
  } catch (error) {
    console.error("Course redirect failed:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}