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

  // Build table of contents from ## headings
  const headings = paragraphs.filter(l => l.startsWith("## ")).map(l => l.replace("## ", ""));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap');

        :root {
          --hb-cream: #fff8ec;
          --hb-paper: #fffaf1;
          --hb-ink: #21140d;
          --hb-muted: #75604f;
          --hb-line: #e0cfb8;
          --hb-saffron: #d58a22;
          --hb-chili: #a93629;
          --hb-leaf: #225b42;
          --hb-gold: #b68119;
          --hb-char: #24160f;
        }

        .hb-wrap {
          background: var(--hb-cream);
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
          color: var(--hb-ink);
        }

        /* ── TOP NAV ── */
        .hb-nav {
          min-height: 60px;
          padding: 0 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          border-bottom: 1px solid rgba(33,20,13,.1);
          background: var(--hb-paper);
        }
        .hb-nav-logo {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          color: var(--hb-ink);
          text-decoration: none;
          font-weight: 600;
          white-space: nowrap;
        }
        .hb-nav-links {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .hb-nav-links a {
          font-size: 13px;
          color: var(--hb-muted);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }
        .hb-nav-links a:hover { color: var(--hb-ink); }

        /* ── COVER ── */
        .hb-cover {
          padding: 2rem 2rem;
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(300px, .8fr);
          gap: 1.5rem;
          align-items: stretch;
          max-width: 1280px;
          margin: 0 auto;
        }

        /* Poster — dark gradient with emoji as hero visual */
        .hb-poster {
          min-height: 560px;
          padding: 2.5rem;
          display: grid;
          align-content: end;
          gap: 1.25rem;
          border-radius: 10px;
          color: #fffaf1;
          background: linear-gradient(170deg, #1C0A02 0%, #3D1500 45%, #5C2000 100%);
          position: relative;
          overflow: hidden;
        }
        .hb-poster::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 70% 30%, rgba(184,134,11,0.15) 0%, transparent 60%);
        }
        .hb-poster-emoji {
          position: absolute;
          top: 2rem;
          right: 2rem;
          font-size: 100px;
          opacity: 0.18;
          filter: blur(1px);
          line-height: 1;
        }
        .hb-poster-emoji-main {
          font-size: 72px;
          margin-bottom: 0.5rem;
          position: relative;
          z-index: 1;
          display: block;
        }
        .hb-badge {
          width: fit-content;
          display: inline-flex;
          align-items: center;
          padding: 5px 14px;
          border-radius: 999px;
          color: #fffaf1;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-family: 'Inter', sans-serif;
          position: relative;
          z-index: 1;
        }
        .hb-poster-title {
          margin: 0;
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 3.5vw, 52px);
          line-height: 1.1;
          letter-spacing: -0.01em;
          color: #fffaf1;
          position: relative;
          z-index: 1;
          font-weight: 700;
        }
        .hb-poster-meta {
          font-size: 12px;
          color: rgba(255,250,241,0.45);
          letter-spacing: 1.5px;
          text-transform: uppercase;
          font-family: 'Inter', sans-serif;
          position: relative;
          z-index: 1;
        }

        /* Issue card */
        .hb-issue-card {
          padding: 2rem;
          border-radius: 10px;
          background: #1a3328;
          color: #fffaf1;
          display: grid;
          align-content: space-between;
          gap: 1.5rem;
        }
        .hb-issue-kicker {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #d9ad63;
          font-family: 'Inter', sans-serif;
          margin-bottom: 0.5rem;
        }
        .hb-issue-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(26px, 3vw, 42px);
          line-height: 1.05;
          letter-spacing: -0.01em;
          margin: 0;
          color: #fffaf1;
          font-weight: 700;
        }
        .hb-issue-desc {
          font-size: 15px;
          color: rgba(255,250,241,0.65);
          line-height: 1.7;
          font-family: 'Lora', serif;
          font-style: italic;
          margin: 0;
        }
        .hb-issue-meta {
          font-size: 11px;
          color: rgba(255,250,241,0.35);
          letter-spacing: 1.5px;
          text-transform: uppercase;
          font-family: 'Inter', sans-serif;
        }
        .hb-issue-divider {
          height: 1px;
          background: rgba(255,250,241,0.1);
          margin: 0;
        }
        .hb-issue-read-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--hb-gold);
          color: var(--hb-char);
          padding: 11px 20px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 700;
          font-family: 'Inter', sans-serif;
          text-decoration: none;
          width: fit-content;
          transition: opacity 0.2s;
        }
        .hb-issue-read-btn:hover { opacity: 0.88; }

        /* ── BODY ── */
        .hb-body {
          display: grid;
          grid-template-columns: 220px minmax(0, 680px);
          gap: 3.5rem;
          justify-content: center;
          padding: 3.5rem 2rem 5rem;
          max-width: 1100px;
          margin: 0 auto;
        }

        /* TOC sidebar */
        .hb-toc {
          position: sticky;
          top: 80px;
          align-self: start;
          padding: 1.25rem;
          border-radius: 8px;
          border: 1px solid rgba(33,20,13,.1);
          background: rgba(255,253,248,.9);
        }
        .hb-toc-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--hb-gold);
          margin-bottom: 0.75rem;
          font-family: 'Inter', sans-serif;
        }
        .hb-toc-item {
          display: block;
          padding: 8px 0;
          border-bottom: 1px solid rgba(33,20,13,.07);
          font-size: 13px;
          font-weight: 600;
          color: var(--hb-muted);
          text-decoration: none;
          font-family: 'Inter', sans-serif;
          line-height: 1.4;
          transition: color 0.2s;
        }
        .hb-toc-item:last-child { border-bottom: none; }
        .hb-toc-item:hover { color: var(--hb-ink); }

        /* Article body */
        .hb-article {
          font-family: 'Lora', Georgia, serif;
          font-size: 18px;
          line-height: 1.88;
          color: #3c2a1d;
        }
        .hb-article-lead {
          font-family: 'Lora', Georgia, serif;
          font-size: clamp(18px, 2vw, 22px);
          line-height: 1.65;
          color: var(--hb-muted);
          font-style: italic;
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--hb-line);
        }
        .hb-article p {
          margin-bottom: 1.5rem;
        }
        .hb-article-first::first-letter {
          font-family: 'Playfair Display', serif;
          font-size: 78px;
          font-weight: 700;
          float: left;
          line-height: 0.72;
          padding-right: 10px;
          padding-top: 10px;
          color: var(--hb-chili);
        }
        .hb-article h2 {
          margin: 3rem 0 1.25rem;
          font-family: 'Playfair Display', serif;
          font-size: clamp(24px, 2.5vw, 36px);
          line-height: 1.1;
          color: var(--hb-ink);
          font-weight: 700;
          letter-spacing: -0.01em;
        }
        .hb-pull {
          margin: 2.5rem 0;
          padding: 1.5rem 1.75rem;
          border-left: 4px solid var(--hb-chili);
          background: #fff4df;
          font-family: 'Playfair Display', serif;
          font-size: clamp(20px, 2.5vw, 28px);
          line-height: 1.3;
          color: var(--hb-ink);
          font-style: italic;
          border-radius: 0 6px 6px 0;
        }

        /* Footer */
        .hb-footer {
          margin-top: 3.5rem;
          padding-top: 2rem;
          border-top: 1px solid var(--hb-line);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .hb-footer-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: var(--hb-leaf);
          text-decoration: none;
          padding: 10px 18px;
          border: 1.5px solid var(--hb-leaf);
          border-radius: 6px;
          transition: all 0.2s;
        }
        .hb-footer-back:hover {
          background: var(--hb-leaf);
          color: #fff;
        }
        .hb-footer-brand {
          font-family: 'Playfair Display', serif;
          font-size: 13px;
          font-style: italic;
          color: var(--hb-muted);
        }

        /* MOBILE */
        @media (max-width: 900px) {
          .hb-cover {
            grid-template-columns: 1fr;
            padding: 1.25rem;
          }
          .hb-poster { min-height: 400px; }
          .hb-body {
            grid-template-columns: 1fr;
            padding: 2rem 1.25rem 3rem;
            gap: 2rem;
          }
          .hb-toc { position: relative; top: 0; }
          .hb-nav { padding: 0 1.25rem; }
          .hb-nav-links { display: none; }
        }
        @media (max-width: 600px) {
          .hb-poster-title { font-size: 26px; }
          .hb-article { font-size: 17px; }
          .hb-poster-emoji-main { font-size: 52px; }
        }
      `}</style>

      <div className="hb-wrap">

        {/* Nav */}
        <nav className="hb-nav">
          <Link href="/" className="hb-nav-logo">Silk Route Spices</Link>
          <div className="hb-nav-links">
            <Link href="/spice-stories">Spice Stories</Link>
            <Link href="/recipes">Recipes</Link>
            <Link href="/food-culture">Food Culture</Link>
            <Link href="/blog">Blog</Link>
          </div>
        </nav>

        {/* Cover — Heritage B layout */}
        <div className="hb-cover">

          {/* Left — dark poster */}
          <div className="hb-poster">
            <div className="hb-poster-emoji">{post.emoji}</div>
            <span className="hb-poster-emoji-main">{post.emoji}</span>
            <span className="hb-badge" style={{ background: post.categoryColor }}>
              {post.category}
            </span>
            <h1 className="hb-poster-title">{post.title}</h1>
            <div className="hb-poster-meta">{post.date} · {post.readTime}</div>
          </div>

          {/* Right — issue card */}
          <div className="hb-issue-card">
            <div>
              <div className="hb-issue-kicker">Feature Article</div>
              <h2 className="hb-issue-heading">{post.title}</h2>
            </div>
            <hr className="hb-issue-divider" />
            <p className="hb-issue-desc">{post.excerpt}</p>
            <hr className="hb-issue-divider" />
            <div>
              <div className="hb-issue-meta" style={{ marginBottom: "1.25rem" }}>
                {post.date} · {post.readTime} · Silk Route Spices
              </div>
              <a href="#article-body" className="hb-issue-read-btn">
                Read Article ↓
              </a>
            </div>
          </div>

        </div>

        {/* Body — TOC + Article */}
        <div className="hb-body" id="article-body">

          {/* Sticky TOC */}
          <aside className="hb-toc">
            <div className="hb-toc-label">In this article</div>
            {headings.map((h, i) => (
              <span key={i} className="hb-toc-item">{h}</span>
            ))}
          </aside>

          {/* Article */}
          <article className="hb-article">
            <p className="hb-article-lead">{post.excerpt}</p>

            {paragraphs.map((line, i) => {
              if (line.startsWith("## ")) {
                return (
                  <h2 key={i} id={line.replace("## ", "").toLowerCase().replace(/\s+/g, "-")}>
                    {line.replace("## ", "")}
                  </h2>
                );
              }
              // Add pull quote after 3rd paragraph
              if (i === 5) {
                return (
                  <>
                    <p key={i} className={i === 5 ? "" : ""}>{line}</p>
                    <div className="hb-pull" key={`pull-${i}`}>
                      "Indian food is complex, not simply spicy. The heat is one tool in a very large toolkit."
                    </div>
                  </>
                );
              }
              return (
                <p key={i} className={i === 5 ? "" : ""}>{line}</p>
              );
            })}

            {/* Footer */}
            <div className="hb-footer">
              <Link href="/blog" className="hb-footer-back">← Back to all stories</Link>
              <span className="hb-footer-brand">silkroutespices.com</span>
            </div>
          </article>

        </div>
      </div>
    </>
  );
}
