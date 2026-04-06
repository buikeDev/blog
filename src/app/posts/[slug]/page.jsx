import React from "react";
import Menu from "../../../components/menu/Menu";
import styles from "./singlePage.module.css";
import Image from "next/image";
import Link from "next/link";
import Comments from "../../../components/comments/Comments";
import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";
import { PortableText } from "@portabletext/react";
import Breadcrumbs from "../../../components/breadcrumbs/Breadcrumbs";
import RelatedPosts from "../../../components/relatedPosts/RelatedPosts";
import ViewTracker from "../../../components/viewTracker/ViewTracker";

const getData = async (slug) => {
  const query = `*[_type == "post" && slug.current == $slug][0] {
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
    author->{
      name,
      image { asset->{ _id, url } }
    }
  }`;
  return client.fetch(query, { slug });
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
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
      siteName: "Blog App",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [{ url: imageUrl, alt: post.title }],
    },
    metadataBase: new URL(siteUrl),
    other: {
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description,
        image: imageUrl,
        author: { "@type": "Person", name: post.author?.name || "Anonymous" },
        datePublished: post._createdAt,
        mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
      }),
    },
  };
}

export default async function SinglePage({ params }) {
  const post = await getData(params.slug);
  if (!post) return <div>Post not found</div>;

  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : null;

  const authorImageUrl = post.author?.image
    ? urlFor(post.author.image).width(88).height(88).url()
    : null;

  // Estimate reading time
  const wordCount = Array.isArray(post.body)
    ? post.body.map((b) => b.children?.map((c) => c.text).join(" ")).join(" ").split(" ").length
    : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const date = new Date(post._createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const breadcrumbs = [
    { name: "Home", href: "/" },
    post.categories?.[0]?.title
      ? { name: post.categories[0].title, href: `/blog?cat=${post.categories[0].slug.current}` }
      : null,
    { name: post.title },
  ].filter(Boolean);

  return (
    <main className={styles.container}>
      <ViewTracker postId={post._id} />

      {/* ── Post header ── */}
      <header className={styles.header}>
        <Breadcrumbs items={breadcrumbs} />

        {post.categories?.[0] && (
          <Link
            href={`/blog?cat=${post.categories[0].slug.current}`}
            className={styles.badge}
          >
            {post.categories[0].title}
          </Link>
        )}

        <h1 className={styles.title}>{post.title}</h1>

        <div className={styles.meta}>
          {authorImageUrl && (
            <div className={styles.authorAvatar}>
              <Image
                src={authorImageUrl}
                alt={post.author?.name || "Author"}
                fill
                className={styles.authorImage}
              />
            </div>
          )}
          <div className={styles.metaText}>
            <span className={styles.authorName}>
              {post.author?.name || "Anonymous"}
            </span>
            <span className={styles.metaDetails}>
              {date} · {readTime} min read
            </span>
          </div>
        </div>
      </header>

      {/* ── Hero image ── */}
      {imageUrl && (
        <div className={styles.heroImage}>
          <Image
            src={imageUrl}
            alt={post.mainImage?.alt || post.title}
            fill
            className={styles.heroImg}
            priority
          />
        </div>
      )}

      {/* ── Content layout ── */}
      <div className={styles.layout}>
        <article className={styles.article}>
          <div className={styles.body}>
            <PortableText value={post.body} />
          </div>

          <RelatedPosts
            categorySlug={post.categories?.[0]?.slug?.current}
            excludeSlug={post.slug.current}
          />

          <Comments postId={post._id} />
        </article>

        <aside className={styles.sidebar}>
          <Menu />
        </aside>
      </div>
    </main>
  );
}
