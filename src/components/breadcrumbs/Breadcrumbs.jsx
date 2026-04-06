import Link from "next/link";
import styles from "./breadcrumbs.module.css";

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="breadcrumb" className={styles.nav}>
      <ol className={styles.list}>
        {items.map((item, idx) => (
          <li key={item.href || item.name} style={{ display: "flex", alignItems: "center" }}>
            {item.href ? (
              <Link href={item.href} className={styles.link}>
                {item.name}
              </Link>
            ) : (
              <span className={styles.current}>{item.name}</span>
            )}
            {idx < items.length - 1 && (
              <span className={styles.separator}>/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
