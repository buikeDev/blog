import React from "react";
import Menu from "@/components/menu/Menu";
import styles from "./singlePage.module.css";
import Image from "next/image";
import Comments from "@/components/comments/Comments";

export default function SinglePage() {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </h1>
          <div className={styles.user}>
            <div className={styles.userImageContainer}>
              <Image src="/p1.jpeg" alt="" fill className={styles.image} />
            </div>
            <div className={styles.userTextContainer}>
              <span className={styles.username}>John Doe</span>
              <span>01.01.2025</span>
            </div>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image src="/p1.jpeg" alt="" fill className={styles.image} />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.posts}>
          <div className={styles.description}>
            <h3>Lorem ipsum dolor sit amet consectetur </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              excepturi, voluptate incidunt quasi inventore maiores, modi sed
              distinctio, perferendis eligendi tempora alias enim consectetur
              quisquam corporis eius perspiciatis a deserunt.
            </p>
            <h3>Lorem ipsum dolor sit amet consectetur </h3>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              excepturi, voluptate incidunt quasi inventore maiores, modi sed
              distinctio, perferendis eligendi tempora alias enim consectetur
              quisquam corporis eius perspiciatis a deserunt.
            </p>
            <h3>Lorem ipsum dolor sit amet consectetur </h3>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              excepturi, voluptate incidunt quasi inventore maiores, modi sed
              distinctio, perferendis eligendi tempora alias enim consectetur
              quisquam corporis eius perspiciatis a deserunt.
            </p>
          </div>
          <div className={styles.comment}>
            <Comments />
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
}
