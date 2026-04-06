import Link from "next/link";
import { client } from "../../sanity/lib/client";
import styles from "./relatedPosts.module.css";

export default async function RelatedPosts({ categorySlug, excludeSlug }) {
  if (!categorySlug) return null;

  const query = `*[_type == "post" && $cat in categories[]->slug.current && slug.current != $exclude] | order(_createdAt desc) [0...3] {
    title,
    slug,
    _createdAt
  }`;

  const related = await client.fetch(query, {
    cat: categorySlug,
    exclude: excludeSlug,
  });

  if (!related.length) return null;

  return (
    <div className={styles.container}>
      <p className={styles.title}>Continue Reading</p>
      <ul className={styles.list}>
        {related.map((post) => (
          <li key={post.slug.current}>
            <Link href={`/posts/${post.slug.current}`} className={styles.item}>
              <span className={styles.itemTitle}>{post.title}</span>
              <span className={styles.arrow}>Read article →</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
