"use client";
import React from "react";
import { signIn, useSession } from "next-auth/react";
import styles from "./loginPage.module.css";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const { data, status } = useSession();
  console.log(data, status);

  const router = useRouter();

  if (status === "loading") {
    return <div className={styles.loading}>Loading..</div>;
  }

  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div
          className={styles.socialButton}
          onClick={() => signIn("google")}
          onKeyDown={(e) => e.key === "Enter" && signIn("google")}
          role="button"
          tabIndex={0}
        >
          Sign in with Google
        </div>
        <div className={styles.socialButton}>Sign in with Facebook</div>
      </div>
    </div>
  );
}
