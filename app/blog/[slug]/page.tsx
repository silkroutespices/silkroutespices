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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');

        .post-wrap { background: #FAFAF8; min-height: 100vh; }

        /* ── TOP META BAR ── */
        .post-topbar {
          background: var(--brown-deep);
          padding: 0.6rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
        .post-topbar-left {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .post-category-pill {
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 20px;
          color: #fff;
        }
        .post-meta-text {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          color: rgba(245,237,216,0.55);
          letter-spacing: 0.3px;
        }
        .post-back-link {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          color: var(--gold);
          text-decoration: none;
          font-weight: 500;
          white-space: nowrap;
          transition: opacity 0.2s;
        }
        .post-back-link:hover { opacity: 0.7; }

        /* ── HERO ── */
        .post-hero {
          background: linear-gradient(160deg, #1C0A02 0%, #3D1500 60%, #5C2000 100%);
          padding: 5rem 2rem 4rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .post-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 80%, rgba(184,134,11,0.12) 0%, transparent 70%);
        }
        .post-hero-emoji {
          font-size: 80px;
          display: block;
          margin-bottom: 2rem;
          position: relative;
          z-index: 1;
          filter: drop-shadow(0 4px 24px rgba(0,0,0,0.5));
        }
        .post-hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 4.5vw, 52px);
          font-weight: 700;
          color: #FAF6F0;
          max-width: 820px;
          margin: 0 auto 1.5rem;
          line-height: 1.2;
          position: relative;
          z-index: 1;
          letter-spacing: -0.01em;
        }
        .post-hero-excerpt {
          font-family: 'Lora', serif;
          font-size: clamp(16px, 2vw, 20px);
          font-style: italic;
          color: rgba(245,237,216,0.7);
          max-width: 640px;
          margin: 0 auto 2rem;
          line-height: 1.7;
          position: relative;
          z-index: 1;
        }
        .post-hero-meta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }
        .post-hero-meta-item {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          color: rgba(245,237,216,0.45);
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .post-hero-meta-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: var(--gold);
          opacity: 0.5;
        }

        /* ── CONTENT ── */
        .post-content-wrap {
          max-width: 100%;
          background: #FAFAF8;
        }
        .post-content-inner {
          max-width: 720px;
          margin: 0 auto;
          padding: 4rem 1.5rem 5rem;
        }
        .post-first-para::first-letter {
          font-family: 'Playfair Display', serif;
          font-size: 72px;
          font-weight: 700;
          float: left;
          line-height: 0.75;
          padding-right: 12px;
          padding-top: 8px;
          color: var(--brown-deep);
        }
        .post-para {
          font-family: 'Lora', serif;
          font-size: 18px;
          color: #3D2810;
          line-height: 1.95;
          margin-bottom: 1.75rem;
          letter-spacing: 0.01em;
        }
        .post-h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(22px, 2.5vw, 30px);
          font-weight: 600;
          color: var(--brown-deep);
          margin-top: 3.5rem;
          margin-bottom: 1.5rem;
          line-height: 1.25;
          position: relative;
          padding-left: 1.25rem;
        }
        .post-h2::before {
          content: '';
          position: absolute;
          left: 0;
          top: 4px;
          bottom: 4px;
          width: 3px;
          background: var(--gold);
          border-radius: 2px;
        }

        /* ── SHARE / FOOTER ── */
        .post-footer {
          border-top: 1px solid #E8DEC8;
          margin-top: 3rem;
          padding-top: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .post-footer-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: var(--green-dark);
          text-decoration: none;
          padding: 10px 18px;
          border: 1px solid var(--green-dark);
          border-radius: 4px;
          transition: all 0.2s;
        }
        .post-footer-back:hover {
          background: var(--green-dark);
          color: #fff;
        }
        .post-footer-brand {
          font-family: 'Playfair Display', serif;
          font-size: 13px;
          font-style: italic;
          color: #A07850;
        }

        /* MOBILE */
        @media (max-width: 600px) {
          .post-hero { padding: 3rem 1.25rem 2.5rem; }
          .post-hero-emoji { font-size: 60px; }
          .post-content-inner { padding: 2.5rem 1.25rem 3rem; }
          .post-para { font-size: 17px; }
          .post-topbar { padding: 0.6rem 1.25rem; }
        }
      `}</style>

      <div className="post-wrap">

        {/* Top meta bar */}
        <div className="post-topbar">
          <div className="post-topbar-left">
            <span className="post-category-pill" style={{ background: post.categoryColor }}>
              {post.category}
            </span>
            <span className="post-meta-text">{post.date} · {post.readTime}</span>
          </div>
          <Link href="/blog" className="post-back-link">← All Stories</Link>
        </div>

        {/* Hero */}
        <div className="post-hero">
          <span className="post-hero-emoji">{post.emoji}</span>
          <h1 className="post-hero-title">{post.title}</h1>
          <p className="post-hero-excerpt">{post.excerpt}</p>
          <div className="post-hero-meta">
            <span className="post-hero-meta-item">{post.date}</span>
            <div className="post-hero-meta-dot" />
            <span className="post-hero-meta-item">{post.readTime}</span>
            <div className="post-hero-meta-dot" />
            <span className="post-hero-meta-item">Silk Route Spices</span>
          </div>
        </div>

        {/* Content */}
        <div className="post-content-wrap">
          <div className="post-content-inner">
            {paragraphs.map((line, i) => {
              if (line.startsWith("## ")) {
                return (
                  <h2 key={i} className="post-h2">
                    {line.replace("## ", "")}
                  </h2>
                );
              }
              return (
                <p key={i} className={`post-para${i === 0 ? " post-first-para" : ""}`}>
                  {line}
                </p>
              );
            })}

            {/* Footer */}
            <div className="post-footer">
              <Link href="/blog" className="post-footer-back">
                ← Back to all stories
              </Link>
              <span className="post-footer-brand">silkroutespices.com</span>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
