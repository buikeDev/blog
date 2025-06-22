import React from "react";
import styles from "./cardList.module.css";
import Pagination from "../pagination/Pagination";
import Card from "../card/Card";
import PropTypes from "prop-types";

const getData = async (page, cat) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const url = `${baseUrl}/api/posts?page=${page}&cat=${cat || ""}`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
};

export default async function CardList({ page, cat }) {
  const data = await getData(page, cat);
  const POST_PER_PAGE = 2;

  // Calculate total count from totalPages
  const totalCount = data.totalPages * POST_PER_PAGE;

  // Pagination logic
  const hasPrev = page > 1;
  const hasNext = page < data.totalPages;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.posts}>
        {data?.posts?.map((item) => (
          <Card item={item} key={item._id} />
        ))}
      </div>
      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  );
}

CardList.propTypes = {
  page: PropTypes.number.isRequired,
};
