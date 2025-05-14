import React from "react";
import styles from "./menu.module.css";
import Link from "next/link";
import Image from "next/image";
import MenuPosts from "../menuPosts/MenuPosts";
import MenuCategories from "../menuCategories/MenuCategories";

export default function Menu() {
  return (
    <div className={styles.container}>
      {/* {Most Popular section} */}
      <h2 className={styles.subtitle}>{"What's Popular"}</h2>
      <h1 className={styles.title}>Most Popular</h1>
      <MenuPosts withImage={false} />
      {/* {Categories} */}
      <h2 className={styles.subtitle}>{"Discover by topic"}</h2>
      <h1 className={styles.title}>Categories</h1>
      <MenuCategories />
      {/* {The creators pickcs section} */}
      <h2 className={styles.subtitle}>{"Chosen by Editor"}</h2>
      <h1 className={styles.title}>Editors Pick</h1>
      <MenuPosts withImage={true} />
    </div>
  );
}
