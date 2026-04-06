"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./searchModal.module.css";

export default function SearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const router = useRouter();

  const closeModal = () => {
    setOpen(false);
    setQuery("");
    setResults([]);
  };

  // Focus input when modal opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  // Escape key + body scroll lock
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") closeModal(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // Debounced search
  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(Array.isArray(data) ? data : []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!query.trim()) return;
    closeModal();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <>
      {/* Search icon trigger */}
      <button
        onClick={() => setOpen(true)}
        className={styles.trigger}
        aria-label="Search"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>

      {/* Modal */}
      {open && (
        <div className={styles.overlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

            {/* Input */}
            <form onSubmit={handleSubmit} className={styles.form}>
              <svg className={styles.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search posts..."
                className={styles.input}
                autoComplete="off"
              />
              {query && (
                <button
                  type="button"
                  className={styles.clearBtn}
                  onClick={() => { setQuery(""); setResults([]); inputRef.current?.focus(); }}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </form>

            {/* Results */}
            <div className={styles.results}>
              {loading && (
                <div className={styles.loading}>
                  <span className={styles.spinner} />
                  Searching...
                </div>
              )}

              {!loading && results.length > 0 && (
                <>
                  {results.map((post) => (
                    <Link
                      key={post._id}
                      href={`/posts/${post.slug.current}`}
                      className={styles.result}
                      onClick={closeModal}
                    >
                      {post.mainImage?.asset?.url && (
                        <div className={styles.thumb}>
                          <Image
                            src={post.mainImage.asset.url}
                            alt={post.mainImage.alt || post.title}
                            fill
                            className={styles.thumbImg}
                          />
                        </div>
                      )}
                      <div className={styles.resultText}>
                        <div className={styles.resultTitle}>{post.title}</div>
                        <div className={styles.resultMeta}>
                          {post.categories?.[0] && (
                            <>
                              <span className={styles.resultCategory}>
                                {post.categories[0].title}
                              </span>
                              <span>·</span>
                            </>
                          )}
                          <span>
                            {new Date(post._createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                  <button className={styles.viewAll} onClick={handleSubmit}>
                    View all results for &ldquo;{query}&rdquo; →
                  </button>
                </>
              )}

              {!loading && query.length >= 2 && results.length === 0 && (
                <div className={styles.empty}>
                  <div>No results for &ldquo;{query}&rdquo;</div>
                  <div className={styles.emptyHint}>Try different keywords</div>
                </div>
              )}

              {!query && (
                <div className={styles.hint}>
                  Type to search posts, topics, and more
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
