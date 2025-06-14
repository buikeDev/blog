"use client";
import React from "react";
import Image from "next/image";
import styles from "./writePage.module.css";
import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.bubble.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false, // This ensures ReactQuill is only loaded on the client
});

export default function WritePage() {
  const { status } = useSession();

  const router = useRouter();

  const [open, setOpen] = useState();
  const [value, setValue] = useState(false);

  if (status === "loading") {
    return <div className={styles.loading}>Loading..</div>;
  }

  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <div className={styles.container}>
      <input type="text" placeholder="Title" className={styles.input} />
      <div className={styles.editor}>
        <button className={styles.button} onClick={() => setOpen(!open)}>
          <Image src="/plus.png" alt="" width={16} height={16} />
        </button>
        {open && (
          <div className={styles.add}>
            <button className={styles.addButton}>
              <Image src="/image.png" alt="" width={16} height={16} />
            </button>
            <button className={styles.addButton}>
              <Image src="/external.png" alt="" width={16} height={16} />
            </button>
            <button className={styles.addButton}>
              <Image src="/video.png" alt="" width={16} height={16} />
            </button>
          </div>
        )}
        <ReactQuill
          className={styles.textArear}
          theme="bubble"
          value={value}
          onChange={setValue}
          placeholder="Tell your story..."
        />
      </div>
      <button className={styles.publish}>Publish</button>
    </div>
  );
}
