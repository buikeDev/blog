import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <Image src="/logo.png" alt="neme blog" width={50} height={50} />
          <h1 className={styles.logoText}>Nemeblog</h1>
        </div>

        <p className={styles.desc}>
          Nemeblog is a platform for learning and growing. Relax while we
          journey together hand in hand on our journey of exploration and
          learning
        </p>
        <div className={styles.icons}>
          <Image src="/facebook.png" alt="facebook" width={18} height={18} />
          <Image src="/instagram.png" alt="instagram" width={18} height={18} />
          <Image src="/tiktok.png" alt="tiktok" width={18} height={18} />
          <Image src="/youtube.png" alt="youtube" width={18} height={18} />
        </div>
      </div>

      <div className={styles.links}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Links</span>
          <Link href="/">Homepage</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
          <Link href="/">Contact</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Tags</span>
          <Link href="/">Health</Link>
          <Link href="/">Relationship</Link>
          <Link href="/">Education</Link>
          <Link href="/">Fainance</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Links</span>
          <Link href="/">Facebook</Link>
          <Link href="/">Instagram</Link>
          <Link href="/">Tiktok</Link>
          <Link href="/">Youtube</Link>
        </div>
      </div>
    </div>
  );
}
