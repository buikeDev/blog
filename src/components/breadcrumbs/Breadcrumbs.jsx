import Link from "next/link";

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="breadcrumb" style={{ marginBottom: 24 }}>
      <ol
        style={{
          display: "flex",
          flexWrap: "wrap",
          listStyle: "none",
          padding: 0,
          margin: 0,
        }}
      >
        {items.map((item, idx) => (
          <li
            key={item.href || item.name}
            style={{ display: "flex", alignItems: "center" }}
          >
            {item.href ? (
              <Link
                href={item.href}
                style={{
                  color: "#667eea",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                {item.name}
              </Link>
            ) : (
              <span style={{ color: "var(--textColor)", fontWeight: 600 }}>
                {item.name}
              </span>
            )}
            {idx < items.length - 1 && (
              <span style={{ margin: "0 8px", color: "#aaa" }}>/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
