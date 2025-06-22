import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./menuPosts.module.css";
import PropTypes from "prop-types";
import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image";

// Function to get posts data from Sanity
const getData = async () => {
  const query = `*[_type == "post"] | order(_createdAt desc) [0...5] {
    _id,
    title,
    slug,
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

export default async function MenuPosts({ withImage }) {
  const posts = await getData();

  return (
    <div className={styles.items}>
      {posts?.map((post) => {
        const imageUrl = post.mainImage
          ? urlFor(post.mainImage).width(100).height(100).url()
          : "/default-image.jpg";

        const categorySlug = post.categories?.[0]?.slug?.current || "general";

        return (
          <Link
            href={`/posts/${post.slug.current}`}
            className={styles.item}
            key={post._id}
          >
            {withImage && (
              <div className={styles.imageContainer}>
                <Image
                  src={imageUrl}
                  alt={post.mainImage?.alt || post.title}
                  fill
                  className={styles.image}
                />
              </div>
            )}
            <div className={styles.textContainer}>
              <span className={`${styles.category} ${styles[categorySlug]}`}>
                {post.categories?.[0]?.title || "General"}
              </span>
              <h3 className={styles.postTitle}>{post.title}</h3>

              <div className={styles.details}>
                <span className={styles.username}>
                  {post.author?.name || "Anonymous"}
                </span>
                <span className={styles.date}>
                  {" "}
                  -{" "}
                  {new Date(post._createdAt).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

MenuPosts.propTypes = {
  withImage: PropTypes.bool.isRequired,
};
