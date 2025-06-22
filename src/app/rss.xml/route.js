import { client } from "../../../src/sanity/lib/client";

export async function GET() {
  const siteUrl = "https://blog-t9vn.vercel.app";
  const posts =
    await client.fetch(`*[_type == "post"] | order(_createdAt desc) [0...20]{
    title,
    slug,
    body,
    _createdAt,
    author->{name}
  }`);

  const feedItems = posts
    .map((post) => {
      const postUrl = `${siteUrl}/posts/${post.slug.current}`;
      // Get plain text from body (first 160 chars)
      let description = "";
      if (Array.isArray(post.body)) {
        description =
          post.body
            .map((b) => b.children?.map((c) => c.text).join(" "))
            .join(" ")
            .slice(0, 160) + "...";
      }
      return `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${postUrl}</link>
        <guid>${postUrl}</guid>
        <description><![CDATA[${description}]]></description>
        <pubDate>${new Date(post._createdAt).toUTCString()}</pubDate>
        <author>${post.author?.name || "Anonymous"}</author>
      </item>
    `;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>Blog App – Stories & Insights</title>
      <link>${siteUrl}</link>
      <description>A modern blog sharing stories, insights, and perspectives that matter.</description>
      <language>en-us</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      ${feedItems}
    </channel>
  </rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
