"use client";
import Link from "next/link";
import styles from "./authLinks.module.css";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import React from "react";

export default function AuthLinks() {
  const [open, setOpen] = useState(false);
  // temporary
  const { status } = useSession();

  // Close menu when clicking outside
  const handleOverlayClick = () => {
    setOpen(false);
  };

  return (
    <>
      {status === "unauthenticated" ? (
        <Link href="/login" className={styles.link}>
          Login
        </Link>
      ) : (
        <>
          <Link href="/write" className={styles.link}>
            Write
          </Link>
          <span
            className={styles.link}
            onClick={signOut}
            onKeyDown={(e) => e.key === "Enter" && signOut()}
            role="button"
            tabIndex={0}
          >
            Logout
          </span>
        </>
      )}
      <div
        className={styles.burger}
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => e.key === "Enter" && setOpen(!open)}
        role="button"
        tabIndex={0}
      >
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>

      {/* Blur Overlay */}
      {open && (
        <div className={styles.overlay} onClick={handleOverlayClick}>
          <div
            className={styles.responsiveMenu}
            onClick={(e) => e.stopPropagation()}
          >
            <Link href="/" onClick={() => setOpen(false)}>
              Homepage
            </Link>
            <Link href="/about" onClick={() => setOpen(false)}>
              About
            </Link>
            <Link href="/" onClick={() => setOpen(false)}>
              Contact
            </Link>
            {/* {status === "notauthenticated" ? (
              <Link href="/login">Login</Link>
            ) : (
              <>
                <Link href="/write">Write</Link>
                <span className="link">Logout</span>
              </>
            )} */}
          </div>
        </div>
      )}
    </>
  );
}
