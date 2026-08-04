export function getSiteUrl(): URL | null {
  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!rawUrl) return null;

  try {
    const url = new URL(rawUrl);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url : null;
  } catch {
    return null;
  }
}
