import { NextResponse } from "next/server";
import { getAllCourses } from "@/lib/courses-server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const category = searchParams.get("category");
  if (category !== null) {
    const excludeId = searchParams.get("excludeId");
    const courses = (await getAllCourses())
      .filter((course) => course.category === category && course.id !== excludeId)
      .slice(0, 4)
      .map(({ id, title, image, category: courseCategory }) => ({
        id,
        title,
        image,
        category: courseCategory,
      }));

    return NextResponse.json({ courses });
  }

  const offset = Number(searchParams.get("offset") ?? "0");
  const limit = Math.min(Number(searchParams.get("limit") ?? "12"), 24);
  const allCourses = await getAllCourses();
  const sortedCourses = [...allCourses].sort(
    (a, b) => Number(b.createdAt ?? 0) - Number(a.createdAt ?? 0),
  );
  const courses = sortedCourses.slice(offset, offset + limit);

  const hasMore = offset + courses.length < allCourses.length;

  return NextResponse.json({ courses, hasMore });
}
