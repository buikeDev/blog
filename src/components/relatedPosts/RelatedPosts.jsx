import Link from "next/link";
import { client } from "../../sanity/lib/client";

export default async function RelatedPosts({ categorySlug, excludeSlug }) {
  if (!categorySlug) return null;
  const query = `*[_type == "post" && $cat in categories[]->slug.current && slug.current != $exclude] | order(_createdAt desc) [0...3]{
    title,
    slug
  }`;
  const related = await client.fetch(query, {
    cat: categorySlug,
    exclude: excludeSlug,
  });
  if (!related.length) return null;
  return (
    <div style={{ marginTop: 48 }}>
      <h3 style={{ fontSize: "1.2rem", marginBottom: 12 }}>Related Posts</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {related.map((post) => (
          <li key={post.slug.current} style={{ marginBottom: 8 }}>
            <Link
              href={`/posts/${post.slug.current}`}
              style={{
                color: "#667eea",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
