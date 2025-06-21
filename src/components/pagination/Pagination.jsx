"use client";
import React from "react";
import styles from "./pagination.module.css";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";

export default function Pagination({ page, hasNext, hasPrev }) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <button
        disabled={!hasPrev}
        className={styles.button}
        onClick={() => router.push(`?page=${page - 1}`)}
      >
        Previous
      </button>
      <button
        disabled={!hasNext}
        className={styles.button}
        onClick={() => router.push(`?page=${page + 1}`)}
      >
        Next
      </button>
    </div>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
};
