import Link from "next/link";

export default function Page() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "6rem 1.5rem", textAlign: "center" }}>
      <div style={{ fontSize: 64, marginBottom: "1.5rem" }}>🌿</div>
      <div style={{ fontSize: 10, letterSpacing: "3px", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.75rem", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>Coming Soon</div>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 44px)", color: "var(--brown-deep)", marginBottom: "1rem" }}>About</h1>
      <p style={{ fontSize: 16, color: "var(--brown-light)", maxWidth: 480, margin: "0 auto 2rem", lineHeight: 1.7 }}>
        We are building this section with care. Every story here will be deeply researched and beautifully told. Check back soon — or subscribe to be notified when it launches.
      </p>
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
        <Link href="/blog" style={{ display: "inline-block", background: "var(--green-dark)", color: "var(--cream-light)", padding: "12px 24px", borderRadius: 4, fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
          Read Our Blog
        </Link>
        <Link href="/" style={{ display: "inline-block", background: "transparent", color: "var(--brown-mid)", padding: "12px 24px", borderRadius: 4, fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500, textDecoration: "none", border: "1px solid var(--cream-dark)" }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
