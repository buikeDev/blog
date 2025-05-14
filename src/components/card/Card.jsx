import styles from "./card.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Card() {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image src="/p1.jpeg" alt="" fill className={styles.image} />
      </div>
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>11.02.2023 - </span>
          <span className={styles.category}>CULTURE</span>
        </div>
        <Link href="">
          <h1 className={styles.title}>
            Lorem Ipsum Dolor sit amet consectetur such and so
          </h1>
        </Link>
        <p className={styles.desc}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum enim
          eum earum iusto error, quam reprehenderit modi ex est minima inventore
          quos quas id optio, quo velit saepe! Enim, sunt.
        </p>
        <Link href="/" className={styles.link}>
          Read More
        </Link>
      </div>
    </div>
  );
}
