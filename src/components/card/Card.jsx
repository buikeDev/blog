import React from "react";
import styles from "./card.module.css";
import Image from "next/image";
import Link from "next/link";
import { toPlainText } from "@portabletext/toolkit";
import { urlFor } from "../../sanity/lib/image";

export default function Card({ item }) {
  const fullText = toPlainText(item.body);
  const shortText = fullText.split(" ").slice(0, 30).join(" ") + "...";
  const imageUrl = item.mainImage
    ? urlFor(item.mainImage).width(600).url()
    : null;

  const date = new Date(item._createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const href = `/posts/${item.slug.current}`;

  return (
    <div className={styles.container}>
      {imageUrl && (
        <div className={styles.imageContainer}>
          <Image
            src={imageUrl}
            alt={item.mainImage?.alt || item.title}
            fill
            className={styles.image}
          />
        </div>
      )}
      <div className={styles.meta}>
        {item.categories?.[0] && (
          <>
            <span className={styles.category}>{item.categories[0].title}</span>
            <span className={styles.dot}>·</span>
          </>
        )}
        <span className={styles.date}>{date}</span>
      </div>
      {/* Stretched link — covers the entire card as a tap target */}
      <Link href={href} className={styles.titleLink}>
        <h2 className={styles.title}>{item.title}</h2>
      </Link>
      <p className={styles.desc}>{shortText}</p>
      {/* Sits above the stretched link via z-index */}
      <Link href={href} className={styles.readMore} tabIndex={-1} aria-hidden="true">
        Read more →
      </Link>
    </div>
  );
}
