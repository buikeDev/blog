import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../../sanity/env";
import { urlFor } from "../../sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import styles from "./searchPage.module.css";

const searchClient = createClient({ projectId, dataset, apiVersion, useCdn: false });

const search = async (query) => {
  if (!query || query.length < 2) return [];
  const q = `${query}*`;
  const groqQuery = `*[_type == "post" && (
    title match $q ||
    pt::text(body) match $q
  )] | order(_createdAt desc) [0...20] {
    _id,
    title,
    slug,
    _createdAt,
    "excerpt": pt::text(body)[0..200],
    mainImage { asset->{ url }, alt },
    categories[]->{ title, slug }
  }`;
  return searchClient.fetch(groqQuery, { q });
};

export async function generateMetadata({ searchParams }) {
  const q = searchParams?.q || "";
  return {
    title: q ? `Search results for "${q}" — NemeBlog` : "Search — NemeBlog",
  };
}

export default async function SearchPage({ searchParams }) {
  const query = searchParams?.q?.trim() || "";
  const results = await search(query);

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <p className={styles.label}>Search results</p>
        {query ? (
          <h1 className={styles.title}>
            {results.length > 0
              ? `${results.length} result${results.length !== 1 ? "s" : ""} for `
              : "No results for "}
            <span className={styles.query}>&ldquo;{query}&rdquo;</span>
          </h1>
        ) : (
          <h1 className={styles.title}>Search NemeBlog</h1>
        )}
      </div>

      {results.length > 0 ? (
        <div className={styles.results}>
          {results.map((post) => {
            const imageUrl = post.mainImage?.asset?.url
              ? urlFor(post.mainImage).width(320).height(200).url()
              : null;
            const date = new Date(post._createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            });
            return (
              <Link key={post._id} href={`/posts/${post.slug.current}`} className={styles.result}>
                {imageUrl && (
                  <div className={styles.thumb}>
                    <Image
                      src={imageUrl}
                      alt={post.mainImage?.alt || post.title}
                      fill
                      className={styles.thumbImg}
                    />
                  </div>
                )}
                <div className={styles.text}>
                  <div className={styles.meta}>
                    {post.categories?.[0] && (
                      <>
                        <span className={styles.category}>
                          {post.categories[0].title}
                        </span>
                        <span className={styles.dot}>·</span>
                      </>
                    )}
                    <span className={styles.date}>{date}</span>
                  </div>
                  <h2 className={styles.postTitle}>{post.title}</h2>
                  {post.excerpt && (
                    <p className={styles.excerpt}>{post.excerpt}...</p>
                  )}
                  <span className={styles.readMore}>Read article →</span>
                </div>
              </Link>
            );
          })}
        </div>
      ) : query ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <p className={styles.emptyTitle}>No results found</p>
          <p className={styles.emptyDesc}>
            We couldn&apos;t find any posts matching &ldquo;{query}&rdquo;. Try different keywords.
          </p>
          <Link href="/" className={styles.homeLink}>← Back to home</Link>
        </div>
      ) : null}
    </main>
  );
}
