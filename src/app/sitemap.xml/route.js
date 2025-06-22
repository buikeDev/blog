import { client } from "../../../src/sanity/lib/client";

export async function GET() {
  const siteUrl = "https://blog-t9vn.vercel.app";
  // Fetch all post slugs from Sanity
  const posts = await client.fetch(`*[_type == "post"]{ slug, _createdAt }`);

  let urls = [
    { loc: siteUrl, lastmod: new Date().toISOString() },
    { loc: `${siteUrl}/about`, lastmod: new Date().toISOString() },
  ];

  posts.forEach((post) => {
    if (post.slug?.current) {
      urls.push({
        loc: `${siteUrl}/posts/${post.slug.current}`,
        lastmod: post._createdAt,
      });
    }
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (url) => `
    <url>
      <loc>${url.loc}</loc>
      <lastmod>${url.lastmod}</lastmod>
    </url>`
    )
    .join("")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
