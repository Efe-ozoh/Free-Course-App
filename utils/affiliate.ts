export function getAffiliateUrl(platform: string | undefined, rawUrl: string): string {
  if (!rawUrl) return "";

  const encodedUrl = encodeURIComponent(rawUrl);

  // Replace these domains with the approved Impact.com account links when available.
  const templates: Record<string, string> = {
    coursera: `https://pxf.io${encodedUrl}`,
    udemy: `https://sjv.io${encodedUrl}`,
  };

  const platformKey = platform?.toLowerCase() || "";
  return templates[platformKey] || rawUrl;
}