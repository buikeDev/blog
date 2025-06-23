import React from "react";
import styles from "./card.module.css";
import Image from "next/image";
import Link from "next/link";
import { toPlainText } from "@portabletext/toolkit";
import { urlFor } from "../../sanity/lib/image";

export default function Card({ item }) {
  // Convert PortableText to plain text
  const fullText = toPlainText(item.body);
  const shortText = fullText.split(" ").slice(0, 30).join(" ") + "...";
  const imageUrl = item.mainImage
    ? urlFor(item.mainImage).width(600).url()
    : "/default-image.jpg";
  {
  }
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src={imageUrl}
          alt={item.mainImage?.alt || item.title}
          fill
          className={styles.image}
        />
      </div>
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>
            {" "}
            {(() => {
              const d = new Date(item._createdAt);
              const day = String(d.getDate()).padStart(2, "0");
              const month = String(d.getMonth() + 1).padStart(2, "0");
              const year = d.getFullYear();
              return `${day}-${month}-${year}`;
            })()}{" "}
            -{" "}
          </span>
          <span className={styles.category}>{item.categories?.[0]?.title}</span>
        </div>
        <Link href={`/posts/${item.slug.current}`}>
          <h1 className={styles.title}>{item.title}</h1>
        </Link>
        <p className={styles.desc}>{shortText}</p>
        <Link href={`/posts/${item.slug.current}`} className={styles.link}>
          Read More
        </Link>
      </div>
    </div>
  );
}
