import React from "react";
import styles from "./featured.module.css";
import Image from "next/image";
import Link from "next/link";
import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image";

// Function to get featured posts data from Sanity
const getFeaturedPosts = async () => {
  const query = `*[_type == "post" && "featured" in categories[]->slug.current] | order(_createdAt desc) [0...3] {
    _id,
    title,
    slug,
    body,
    _createdAt,
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    },
    categories[]->{
      title,
      slug
    },
    author->{
      name,
      image {
        asset->{
          _id,
          url
        }
      }
    }
  }`;

  const posts = await client.fetch(query);
  return posts;
};

export default async function Featured() {
  const featuredPosts = await getFeaturedPosts();

  return (
    <div className={styles.container}>
      {/* {Title} */}
      <div className={styles.title}>
        <h1>
          <b className={styles.bold}>Short and powerful.</b>
        </h1>
        <span>
          Covers all themes: health (heal), education (teach), relationships
          (connect).
        </span>
      </div>

      {/* {Featured Posts} */}
      {featuredPosts && featuredPosts.length > 0 ? (
        <div className={styles.posts}>
          {featuredPosts.map((post) => {
            const imageUrl = post.mainImage
              ? urlFor(post.mainImage).width(800).height(400).url()
              : "/default-image.jpg";

            // Get plain text from body for description
            let description = "";
            if (Array.isArray(post.body)) {
              description =
                post.body
                  .map((b) => b.children?.map((c) => c.text).join(" "))
                  .join(" ")
                  .slice(0, 150) + "...";
            }

            return (
              <div className={styles.post} key={post._id}>
                <div className={styles.imgContainer}>
                  <Image
                    src={imageUrl}
                    alt={post.mainImage?.alt || post.title}
                    fill
                    className={styles.image}
                  />
                </div>

                <div className={styles.textContainer}>
                  <h1 className={styles.postTitle}>{post.title}</h1>
                  <p className={styles.postDesc}>
                    {description || "Read this featured post to learn more."}
                  </p>

                  <Link href={`/posts/${post.slug.current}`}>
                    <button className={styles.button}>Read More</button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // Fallback content if no featured posts found
        <div className={styles.post}>
          <div className={styles.imgContainer}>
            <Image src="/p1.jpeg" alt="" fill className={styles.image}></Image>
          </div>

          <div className={styles.textContainer}>
            <h1 className={styles.postTitle}>No Featured Posts Yet</h1>
            <p className={styles.postDesc}>
              Create some posts and add them to the "featured" category to see
              them here.
            </p>
            <button className={styles.button} disabled>
              Coming Soon
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
