import React from "react";
import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingContent}>
        <div className={styles.spinner}></div>
        <h2 className={styles.loadingText}>Loading...</h2>
        <p className={styles.loadingSubtext}>
          Please wait while we fetch your content
        </p>
      </div>
    </div>
  );
}
