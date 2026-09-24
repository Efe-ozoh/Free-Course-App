// app/sitemap.ts
import type { MetadataRoute } from 'next';
import { getCourses } from '@/lib/courses';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://eduliver.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Fetch all courses from your Cloudflare-safe Firebase utility
  let courses: Awaited<ReturnType<typeof getCourses>> = [];
  try {
    courses = await getCourses();
  } catch (error) {
    console.error("Sitemap build database error:", error);
  }

  // 2. Map through courses to create dynamic URLs
  const courseEntries = courses.map((course) => ({
    url: `${siteUrl}/course/${encodeURIComponent(course.id)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 3. Combine with static root paths
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    ...courseEntries,
  ];
}
