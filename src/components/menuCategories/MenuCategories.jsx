import Link from "next/link";
import React from "react";
import styles from "./menuCategories.module.css";

const getData = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/categories`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

export default async function MenuCategories() {
  const data = await getData();
  return (
    <div className={styles.categoryList}>
      {data?.map((item) => {
        return (
          <Link
            href={`/blog?cat=${item.slug.current}`}
            className={`${styles.categoryItem} ${styles["categoryItem-" + item.slug.current]}`}
            key={item._id}
          >
            {item.img && (
              <Image
                src={item.img}
                width={32}
                height={32}
                className={styles.image}
                alt={item.title}
              />
            )}
            {item.title}
          </Link>
        );
      })}
    </div>
  );
}
