"use client";
import React, { useState, useEffect } from "react";
import styles from "./comment.module.css";
import Link from "next/link";
import { useSession } from "next-auth/react";
import PropTypes from "prop-types";

export default function Comments({ postId }) {
  const { status } = useSession();
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!postId) return;
    fetch(`/api/comments?postId=${postId}`)
      .then((res) => res.json())
      .then((data) => setComments(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, [postId]);

  const handleSubmit = async () => {
    if (!text.trim() || submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, comment: text }),
      });
      if (res.ok) {
        const newComment = await res.json();
        setComments((prev) => [...prev, newComment]);
        setText("");
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>
      {status === "authenticated" ? (
        <div className={styles.write}>
          <textarea
            placeholder="Write a comment..."
            className={styles.input}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className={styles.button}
            onClick={handleSubmit}
            disabled={submitting || !text.trim()}
          >
            {submitting ? "Sending..." : submitted ? "Sent!" : "Send"}
          </button>
        </div>
      ) : (
        <Link href="/login">Login to write a comment</Link>
      )}
      <div className={styles.comments}>
        {comments.map((c) => (
          <div key={c._id} className={styles.comment}>
            <div className={styles.user}>
              <div className={styles.userInfo}>
                <span className={styles.username}>{c.name}</span>
                <span className={styles.date}>
                  {new Date(c._createdAt).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
            <p className={styles.desc}>{c.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

Comments.propTypes = {
  postId: PropTypes.string.isRequired,
};
