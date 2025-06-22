import React from "react";
import Menu from "../../../components/menu/Menu";
import styles from "./singlePage.module.css";
import Image from "next/image";
import Comments from "../../../components/comments/Comments";
import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";
import { PortableText } from "@portabletext/react";

// Function to get post data from Sanity
const getData = async (slug) => {
  const query = `*[_type == "post" && slug.current == $slug][0] {
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

  const post = await client.fetch(query, { slug });
  return post;
};

export default async function SinglePage({ params }) {
  const post = await getData(params.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(800).url()
    : "/default-image.jpg";

  const authorImageUrl = post.author?.image
    ? urlFor(post.author.image).width(50).height(50).url()
    : "/default-avatar.jpg";

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.user}>
            <div className={styles.userImageContainer}>
              <Image
                src={authorImageUrl}
                alt={post.author?.name || "Author"}
                fill
                className={styles.image}
              />
            </div>
            <div className={styles.userTextContainer}>
              <span className={styles.username}>
                {post.author?.name || "Anonymous"}
              </span>
              <span>
                {new Date(post._createdAt).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src={imageUrl}
            alt={post.mainImage?.alt || post.title}
            fill
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.posts}>
          <div className={styles.description}>
            <PortableText value={post.body} />
          </div>
          <div className={styles.comment}>
            <Comments />
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
}
