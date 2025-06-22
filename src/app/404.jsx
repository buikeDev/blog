import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "4rem", marginBottom: "1rem" }}>404</h1>
      <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Page Not Found</h2>
      <p style={{ marginBottom: "2rem" }}>
        Sorry, the page you are looking for does not exist.
        <br />
        You can return to the homepage below.
      </p>
      <Link
        href="/"
        style={{
          padding: "12px 32px",
          background: "#667eea",
          color: "white",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: 600,
          fontSize: "1.1rem",
        }}
      >
        Go to Homepage
      </Link>
    </div>
  );
}
