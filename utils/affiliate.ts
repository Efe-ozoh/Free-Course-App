export function getAffiliateUrl(platform: string | undefined, rawUrl: string): string {
  if (!rawUrl) return "";

  const encodedUrl = encodeURIComponent(rawUrl);

  // Replace these domains with the approved Impact.com account links when available.
  const templates: Record<string, string> = {
    udem: `https://sjv.io${encodedUrl}`,
  };

  const platformKey = platform?.toLowerCase() || "";
  return templates[platformKey] || rawUrl;
}