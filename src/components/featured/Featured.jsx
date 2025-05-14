import React from "react";
import styles from "./featured.module.css";
import Image from "next/image";

export default function Featured() {
  return (
    <div className={styles.container}>
      {/* {Title} */}
      <h1 className={styles.title}>
        <b className={styles.bold}>Hey, such and such</b>, my stories are such
        and creative and such
      </h1>

      {/* {Post for the Feature} */}
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image src="/p1.jpeg" alt="" fill className={styles.image}></Image>
        </div>

        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>Lorem Ipsium</h1>
          <p className={styles.postDesc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
            molestias quidem quibusdam tempora, nam distinctio dolor velit
            adipisci animi recusandae, ad explicabo hic! Modi et laboriosam
            inventore minima placeat magni.
          </p>

          <button className={styles.button}>Read More</button>
        </div>
      </div>
    </div>
  );
}
