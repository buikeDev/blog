import Link from "next/link";
import React from "react";
import styles from "./menuCategories.module.css";

export default function MenuCategories() {
  return (
    <div className={styles.categoryList}>
      <Link
        href="/blog?cat=style"
        className={`${styles.categoryItem} ${styles.style}`}
      >
        Dating
      </Link>
      <Link
        href="/blog?cat=style"
        className={`${styles.categoryItem} ${styles.fashion}`}
      >
        Fashion
      </Link>
      <Link
        href="/blog?cat=style"
        className={`${styles.categoryItem} ${styles.food}`}
      >
        Finance
      </Link>
      <Link
        href="/blog?cat=style"
        className={`${styles.categoryItem} ${styles.travel}`}
      >
        Education
      </Link>
    </div>
  );
}
