"use client";
import { useEffect, useState } from "react";
import AdUnit from "./AdUnit";
import styles from "./sideAds.module.css";

export default function SideAds({ leftSlot, rightSlot }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => setVisible(window.innerWidth >= 1700);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!visible) return null;

  return (
    <>
      <div className={`${styles.side} ${styles.left}`}>
        <AdUnit slot={leftSlot} format="vertical" style={{ width: 160, height: 600 }} />
      </div>
      <div className={`${styles.side} ${styles.right}`}>
        <AdUnit slot={rightSlot} format="vertical" style={{ width: 160, height: 600 }} />
      </div>
    </>
  );
}
