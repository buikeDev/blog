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
      {open && (
        <div className={styles.responsiveMenu}>
          <Link href="/">Homepage</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
          {status === "notauthenticated" ? (
            <Link href="/login">Login</Link>
          ) : (
            <>
              <Link href="/write">Write</Link>
              <span className="link">Logout</span>
            </>
          )}
        </div>
      )}
    </>
  );
}
