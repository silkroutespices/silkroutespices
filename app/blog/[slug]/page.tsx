import { getPostBySlug, getAllPosts } from "@/lib/posts";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const paragraphs = post.content.trim().split("\n").filter(l => l.trim());

  return (
    <div style={{ background: "var(--cream)" }}>

      {/* Hero */}
      <div style={{
        background: `linear-gradient(135deg, var(--brown-deep), var(--brown-mid))`,
        padding: "5rem 1.5rem 4rem",
        textAlign: "center",
      }}>
        <div style={{ fontSize: 72, marginBottom: "1.5rem" }}>{post.emoji}</div>
        <div style={{
          display: "inline-block",
          background: post.categoryColor,
          color: "#FAF6F0",
          fontSize: 10, letterSpacing: "2px", textTransform: "uppercase",
          padding: "5px 14px", borderRadius: 2,
          fontFamily: "'Inter', sans-serif", fontWeight: 500,
          marginBottom: "1.25rem",
        }}>{post.category}</div>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(24px, 4vw, 44px)",
          fontWeight: 600,
          color: "var(--cream-light)",
          maxWidth: 760,
          margin: "0 auto 1rem",
          lineHeight: 1.25,
        }}>{post.title}</h1>
        <p style={{
          fontSize: 12, color: "var(--brown-light)",
          fontFamily: "'Inter', sans-serif", letterSpacing: 1,
        }}>
          {post.date} · {post.readTime}
        </p>
      </div>

      {/* Article content */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "3.5rem 2rem" }}>

        {/* Pull quote / excerpt */}
        <p style={{
          fontFamily: "'Lora', Georgia, serif",
          fontSize: 20,
          fontStyle: "italic",
          color: "var(--brown-mid)",
          lineHeight: 1.75,
          marginBottom: "2.5rem",
          paddingBottom: "2rem",
          borderBottom: "1px solid var(--cream-dark)",
        }}>{post.excerpt}</p>

        {/* Body content */}
        <div>
          {paragraphs.map((line, i) => {
            if (line.startsWith("## ")) {
              return (
                <h2 key={i} style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 28,
                  fontWeight: 600,
                  color: "var(--brown-deep)",
                  marginTop: "3rem",
                  marginBottom: "1.25rem",
                  paddingTop: "0.5rem",
                  borderTop: "1px solid var(--cream-dark)",
                  lineHeight: 1.3,
                }}>{line.replace("## ", "")}</h2>
              );
            }
            return (
              <p key={i} style={{
                fontFamily: "'Lora', Georgia, serif",
                fontSize: 18,
                color: "var(--brown-mid)",
                lineHeight: 1.9,
                marginBottom: "1.5rem",
                letterSpacing: "0.01em",
              }}>{line}</p>
            );
          })}
        </div>

        {/* Footer navigation */}
        <div style={{
          marginTop: "4rem",
          paddingTop: "2rem",
          borderTop: "1px solid var(--cream-dark)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}>
          <Link href="/blog" style={{
            fontSize: 14, color: "var(--green-dark)",
            textDecoration: "none", fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
          }}>
            ← All Stories
          </Link>
          <Link href="/" style={{
            fontSize: 13, color: "var(--brown-light)",
            textDecoration: "none",
            fontFamily: "'Inter', sans-serif",
            fontStyle: "italic",
          }}>
            silkroutespices.com
          </Link>
        </div>
      </div>

      {/* Load Lora font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');

        @media (max-width: 600px) {
          div[style*="padding: 3.5rem 2rem"] {
            padding: 2.5rem 1.25rem !important;
          }
        }
      `}</style>
    </div>
  );
}
