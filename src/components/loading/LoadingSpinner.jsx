"use client";
import React, { useState, useEffect } from "react";
import styles from "./loading.module.css";

export default function LoadingSpinner({
  children,
  loading = false,
  delay = 300,
}) {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setShowLoading(true);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setShowLoading(false);
    }
  }, [loading, delay]);

  if (showLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <div className={styles.spinner}></div>
          <h2 className={styles.loadingText}>Loading...</h2>
        </div>
      </div>
    );
  }

  return children;
}
