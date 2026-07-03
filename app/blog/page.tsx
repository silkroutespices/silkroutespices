import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "4rem 1.5rem" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div style={{ fontSize: 10, letterSpacing: "3px", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.75rem", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>All Stories</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 44px)", color: "var(--brown-deep)", marginBottom: "0.75rem" }}>From the Spice Route</h1>
        <p style={{ fontSize: 16, color: "var(--brown-light)", maxWidth: 480, margin: "0 auto" }}>History, culture, science, and recipes — every story from Silk Route Spices.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
        {posts.map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
            <article className="card-hover" style={{
              background: "var(--cream-light)",
              border: "1px solid var(--cream-dark)",
              borderRadius: 10, overflow: "hidden",
            }}>
              <div style={{
                height: 180,
                background: `linear-gradient(135deg, var(--brown-deep), var(--brown-mid))`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 56, position: "relative",
              }}>
                {post.emoji}
                <div style={{
                  position: "absolute", top: 12, left: 12,
                  background: post.categoryColor, color: "#FAF6F0",
                  fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase",
                  padding: "4px 10px", borderRadius: 2, fontFamily: "'Inter', sans-serif", fontWeight: 500,
                }}>{post.category}</div>
              </div>
              <div style={{ padding: "1.25rem" }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: "var(--brown-deep)", lineHeight: 1.4, marginBottom: "0.5rem" }}>{post.title}</h2>
                <p style={{ fontSize: 13, color: "var(--brown-light)", lineHeight: 1.6, marginBottom: "0.75rem" }}>{post.excerpt}</p>
                <div style={{ fontSize: 11, color: "var(--gold)", fontFamily: "'Inter', sans-serif" }}>{post.date} · {post.readTime}</div>
              </div>
            </article>
          </Link>
        ))}
      </div>
      <style>{`@media(max-width:768px){div[style*="repeat(3"]{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}
