"use client";

import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export default function NotFound() {
  return (
    <PageShell
      eyebrow="Lost in the Desert"
      title="404"
      accent="PAGE NOT FOUND"
    >
      <p style={{ textAlign: "center", color: "#6b4423", marginBottom: 24 }}>
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <div style={{ textAlign: "center" }}>
        <Link
          href="/"
          style={{
            display: "inline-block",
            fontFamily: "var(--font-bach-bebas), sans-serif",
            fontSize: 20,
            letterSpacing: 4,
            color: "#faf3e7",
            background: "#c1440e",
            padding: "14px 40px",
            textDecoration: "none",
            borderRadius: 2,
          }}
        >
          Go Home
        </Link>
      </div>
    </PageShell>
  );
}
