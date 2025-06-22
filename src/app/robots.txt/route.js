export async function GET() {
  const siteUrl = "https://blog-t9vn.vercel.app";
  const robots = `User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /studio/\nSitemap: ${siteUrl}/sitemap.xml`;
  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
