import { NextResponse } from "next/server";
import { getCourse } from "@/lib/courses";
import { getAffiliateUrl } from "@/utils/affiliate";

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

    const finalTrackingUrl = getAffiliateUrl(course.platform, course.link);

    return NextResponse.redirect(finalTrackingUrl);
  } catch (error) {
    console.error("Affiliate redirect caught error:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}