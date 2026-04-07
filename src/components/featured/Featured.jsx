import React from "react";
import styles from "./featured.module.css";
import Image from "next/image";
import Link from "next/link";
import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image";

const getFeaturedPosts = async () => {
  const query = `*[_type == "post" && "featured" in categories[]->slug.current] | order(_createdAt desc) [0...1] {
    _id,
    title,
    slug,
    body,
    _createdAt,
    mainImage {
      asset->{ _id, url },
      alt
    },
    categories[]->{ title, slug },
    author->{ name }
  }`;
  return client.fetch(query);
};

export default async function Featured() {
  const featuredPosts = await getFeaturedPosts();
  const post = featuredPosts?.[0];

  if (!post) {
    return (
      <div className={styles.container}>
        <div className={styles.fallback}>
          <span className={styles.fallbackLabel}>Welcome</span>
          <h1 className={styles.fallbackTitle}>Stories worth reading.</h1>
          <p className={styles.fallbackDesc}>
            Short takes on health, education, and the human experience.
          </p>
        </div>
      </div>
    );
  }

  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(900).height(600).url()
    : null;

  const description = Array.isArray(post.body)
    ? post.body
        .map((b) => b.children?.map((c) => c.text).join(" "))
        .join(" ")
        .slice(0, 160) + "..."
    : "";

  const date = new Date(post._createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className={styles.container}>
      <Link href={`/posts/${post.slug.current}`} className={styles.hero}>
        <div className={styles.heroText}>
          {post.categories?.[0] && (
            <span className={styles.badge}>{post.categories[0].title}</span>
          )}
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.desc}>{description}</p>
          <div className={styles.meta}>
            {post.author?.name && (
              <>
                <span>{post.author.name}</span>
                <span className={styles.dot}>·</span>
              </>
            )}
            <span>{date}</span>
          </div>
          <span className={styles.readMore}>Read article →</span>
        </div>
        {imageUrl && (
          <div className={styles.heroImage}>
            <Image
              src={imageUrl}
              alt={post.mainImage?.alt || post.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.image}
            />
          </div>
        )}
      </Link>
    </div>
  );
}
