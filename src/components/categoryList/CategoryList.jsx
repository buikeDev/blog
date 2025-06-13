import React from "react";
import styles from "./categoryList.module.css";
import Image from "next/image";
import Link from "next/link";

const getData = async () => {
  const res = await fetch("https://blog-t9vn.vercel.app/api/categories", {
    cache: "no-store",
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
      <h1 className={styles.title}>Porpular Categories</h1>
      <div className={styles.categories}>
        {data?.map((item) => {
          return (
            <Link
              href="/blog?cat=style"
              className={`${styles.category} ${styles[item.slug]}`}
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
    </div>
  );
}
