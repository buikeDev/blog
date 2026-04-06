import React from "react";
import styles from "./categoryList.module.css";
import Link from "next/link";

const getData = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/categories`, {
    next: { revalidate: 86400 },
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

export default async function CategoryList() {
  const data = await getData();

  return (
    <div className={styles.container}>
      <p className={styles.title}>Browse by topic</p>
      <div className={styles.categories}>
        {data?.map((item) => (
          <Link
            href={`/blog?cat=${item.slug.current}`}
            className={`${styles.category} ${styles["category-" + item.slug.current]}`}
            key={item._id}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
