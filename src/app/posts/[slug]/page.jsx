import React from "react";
import Menu from "../../../components/menu/Menu";
import styles from "./singlePage.module.css";
import Image from "next/image";
import Comments from "../../../components/comments/Comments";
import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";
import { PortableText } from "@portabletext/react";
import Breadcrumbs from "../../../components/breadcrumbs/Breadcrumbs";
import RelatedPosts from "../../../components/relatedPosts/RelatedPosts";

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

export async function generateMetadata({ params }) {
  const post = await getData(params.slug);
  if (!post) return {};
  const siteUrl = "https://blog-t9vn.vercel.app";
  const postUrl = `${siteUrl}/posts/${post.slug.current}`;
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : `${siteUrl}/favicon.ico`;
  const description =
    post.body && Array.isArray(post.body)
      ? post.body
          .map((b) => b.children?.map((c) => c.text).join(" "))
          .join(" ")
          .slice(0, 160) + "..."
      : "Read this post on Blog App.";
  return {
    title: post.title,
    description,
    alternates: { canonical: postUrl },
    openGraph: {
      title: post.title,
      description,
      url: postUrl,
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      siteName: "Blog App",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [
        {
          url: imageUrl,
          alt: post.title,
        },
      ],
    },
    metadataBase: new URL(siteUrl),
    other: {
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: description,
        image: imageUrl,
        author: {
          "@type": "Person",
          name: post.author?.name || "Anonymous",
        },
        datePublished: post._createdAt,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": postUrl,
        },
      }),
    },
  };
}

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

  // Breadcrumbs
  const breadcrumbs = [
    { name: "Home", href: "/" },
    post.categories?.[0]?.title
      ? {
          name: post.categories[0].title,
          href: `/blog?cat=${post.categories[0].slug.current}`,
        }
      : null,
    { name: post.title },
  ].filter(Boolean);

  return (
    <main className={styles.container}>
      <Breadcrumbs items={breadcrumbs} />
      <article>
        <header className={styles.infoContainer}>
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
        </header>
        <div className={styles.content}>
          <section className={styles.posts}>
            <div className={styles.description}>
              <PortableText value={post.body} />
            </div>
            <section className={styles.comment}>
              <Comments />
            </section>
            <aside>
              <RelatedPosts
                categorySlug={post.categories?.[0]?.slug?.current}
                excludeSlug={post.slug.current}
              />
            </aside>
          </section>
          <aside>
            <Menu />
          </aside>
        </div>
      </article>
    </main>
  );
}
