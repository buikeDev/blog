import Image from "next/image";
import styles from "./comment.module.css";
import Link from "next/link";

const Status = "authenticated";
export default function Comments() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>
      {Status === "authenticated" ? (
        <div className={styles.write}>
          <textarea
            placeholder="Write a comment..."
            className={styles.input}
          ></textarea>
          <button className={styles.button}>send</button>
        </div>
      ) : (
        <Link href="/login">Login to Write Comment</Link>
      )}
      <div className={styles.comments}>
        <div className={styles.comment}>
          <div className={styles.user}>
            <Image
              src="/p1.jpeg"
              alt=""
              width={50}
              height={50}
              className={styles.image}
            />
            <div className={styles.userInfo}>
              <span className={styles.username}>john Doe</span>
              <span className={styles.date}>01.01.2023</span>
            </div>
          </div>
          <p className={styles.desc}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure
            adipisci obcaecati dolorum eum id, corrupti minus magni veniam quae
            est animi repellendus unde dolor? Ipsa eligendi illum facere quidem
            nesciunt.
          </p>
        </div>
      </div>
    </div>
  );
}
