"use client";
import { useEffect } from "react";
import PropTypes from "prop-types";

export default function ViewTracker({ postId }) {
  useEffect(() => {
    if (!postId) return;
    fetch("/api/posts/view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId }),
    }).catch(() => {});
  }, [postId]);

  return null;
}

ViewTracker.propTypes = {
  postId: PropTypes.string.isRequired,
};
