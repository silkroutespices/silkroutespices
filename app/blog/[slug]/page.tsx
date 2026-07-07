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
  const headings = paragraphs.filter(l => l.startsWith("## ")).map(l => l.replace("## ", ""));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500;600;700;850&display=swap');

        .hb-page {
          background: #fff8ec;
          color: #21140d;
          font-family: Inter, ui-sans-serif, system-ui, sans-serif;
        }

        /* ── COVER ── */
        .hb-cover {
          padding: 34px;
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(330px, .8fr);
          gap: 28px;
          align-items: stretch;
          max-width: 1440px;
          margin: 0 auto;
        }

        /* Poster — dark gradient, content anchored to bottom */
        .hb-poster {
          min-height: 600px;
          padding: 34px;
          display: grid;
          align-content: end;
          gap: 18px;
          border-radius: 8px;
          color: #fffaf1;
          background: linear-gradient(170deg, #1C0A02 0%, #3D1500 50%, #5C2800 100%);
          position: relative;
          overflow: hidden;
        }
        .hb-poster-bg-emoji {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          font-size: 160px;
          opacity: 0.07;
          line-height: 1;
          pointer-events: none;
        }
        .hb-badge {
          width: fit-content;
          display: inline-flex;
          align-items: center;
          padding: 6px 14px;
          border-radius: 999px;
          color: #fffaf1;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
        }
        .hb-poster-title {
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(36px, 5vw, 72px);
          line-height: .95;
          letter-spacing: 0;
          color: #fffaf1;
        }
        .hb-poster-lead {
          margin: 0;
          color: #f1ddc3;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(16px, 1.8vw, 20px);
          line-height: 1.5;
        }
        .hb-poster-meta {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: rgba(255,250,241,0.4);
        }

        /* Issue card — dark green */
        .hb-issue-card {
          padding: 30px;
          border-radius: 8px;
          background: #233f33;
          color: #fffaf1;
          display: grid;
          align-content: space-between;
          gap: 24px;
        }
        .hb-issue-kicker {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: #d9ad63;
          margin-bottom: 12px;
        }
        .hb-issue-heading {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(34px, 4vw, 54px);
          line-height: .98;
          letter-spacing: 0;
          margin: 0;
          color: #fffaf1;
        }
        .hb-issue-desc {
          margin: 0;
          font-size: 15px;
          color: rgba(255,250,241,0.65);
          line-height: 1.7;
          font-family: Georgia, "Times New Roman", serif;
          font-style: italic;
        }
        .hb-issue-meta {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: rgba(255,250,241,0.35);
        }
        .hb-divider {
          height: 1px;
          background: rgba(255,250,241,0.12);
          border: none;
          margin: 0;
        }
        .hb-read-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #b68119;
          color: #24160f;
          padding: 11px 22px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 700;
          font-family: Inter, sans-serif;
          text-decoration: none;
          width: fit-content;
          letter-spacing: .04em;
          transition: opacity 0.2s;
        }
        .hb-read-btn:hover { opacity: 0.85; }

        /* ── BODY ── */
        .hb-body {
          display: grid;
          grid-template-columns: 230px minmax(0, 690px);
          gap: 52px;
          justify-content: center;
          padding: 54px 42px 72px;
          max-width: 1440px;
          margin: 0 auto;
        }

        /* TOC */
        .hb-toc {
          position: sticky;
          top: 98px;
          align-self: start;
          display: grid;
          gap: 4px;
          padding: 18px;
          border-radius: 8px;
          border: 1px solid rgba(33,20,13,.12);
          background: rgba(255,253,248,.76);
          font-size: 13px;
          font-weight: 800;
          color: #75604f;
        }
        .hb-toc-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: #b68119;
          margin-bottom: 8px;
        }
        .hb-toc-item {
          display: block;
          padding: 9px 0;
          border-bottom: 1px solid rgba(33,20,13,.08);
          font-size: 13px;
          font-weight: 700;
          color: #75604f;
          text-decoration: none;
          line-height: 1.4;
          transition: color 0.2s;
        }
        .hb-toc-item:last-child { border-bottom: none; }
        .hb-toc-item:hover { color: #21140d; }

        /* Article */
        .hb-article {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 18px;
          line-height: 1.86;
          color: #3c2a1d;
        }
        .hb-article p { margin-top: 0; margin-bottom: 1.35rem; }

        .hb-lead {
          margin-top: 0;
          margin-bottom: 1.35rem;
          color: #75604f;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(21px, 3vw, 30px);
          line-height: 1.44;
        }

        .hb-article h2 {
          margin: 3.2rem 0 1rem;
          color: #21140d;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(28px, 4vw, 42px);
          line-height: 1.05;
          letter-spacing: 0;
          font-weight: 700;
        }

        .hb-pull {
          margin: 2.4rem 0;
          padding: 26px;
          border-left: 5px solid #a93629;
          background: #fff4df;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(24px, 4vw, 38px);
          line-height: 1.13;
          letter-spacing: 0;
          color: #21140d;
          border-radius: 0 6px 6px 0;
        }

        /* Footer */
        .hb-footer {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid #e0cfb8;
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
          font-family: Inter, sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #225b42;
          text-decoration: none;
          padding: 10px 18px;
          border: 1.5px solid #225b42;
          border-radius: 6px;
          transition: all 0.2s;
          letter-spacing: .02em;
        }
        .hb-footer-back:hover { background: #225b42; color: #fff; }
        .hb-footer-brand {
          font-family: Georgia, serif;
          font-size: 13px;
          font-style: italic;
          color: #75604f;
        }

        /* MOBILE */
        @media (max-width: 980px) {
          .hb-cover {
            grid-template-columns: 1fr;
            padding: 24px;
          }
          .hb-body {
            grid-template-columns: 1fr;
            padding: 34px 20px 52px;
            gap: 2rem;
          }
          .hb-toc { position: static; }
        }
        @media (max-width: 560px) {
          .hb-cover { padding: 16px; }
          .hb-poster { min-height: 480px; padding: 24px; }
          .hb-issue-card { padding: 24px; }
          .hb-poster-title { font-size: 32px; }
        }
      `}</style>

      <div className="hb-page">

        {/* COVER */}
        <div className="hb-cover">

          {/* Poster */}
          <div className="hb-poster">
            <div className="hb-poster-bg-emoji">{post.emoji}</div>
            <span className="hb-badge" style={{ background: post.categoryColor }}>
              {post.category}
            </span>
            <h1 className="hb-poster-title">{post.title}</h1>
            <p className="hb-poster-lead">{post.excerpt}</p>
            <div className="hb-poster-meta">{post.date} · {post.readTime}</div>
          </div>

          {/* Issue card */}
          <aside className="hb-issue-card">
            <div>
              <div className="hb-issue-kicker">Issue Feature</div>
              <h2 className="hb-issue-heading">{post.title}</h2>
            </div>
            <hr className="hb-divider" />
            <p className="hb-issue-desc">{post.excerpt}</p>
            <hr className="hb-divider" />
            <div>
              <div className="hb-issue-meta" style={{ marginBottom: 16 }}>
                {post.date} · {post.readTime} · Silk Route Spices
              </div>
              <a href="#hb-article" className="hb-read-btn">Read Article ↓</a>
            </div>
          </aside>

        </div>

        {/* BODY */}
        <div className="hb-body" id="hb-article">

          {/* TOC */}
          <aside className="hb-toc">
            <div className="hb-toc-label">In this article</div>
            {headings.map((h, i) => (
              <span key={i} className="hb-toc-item">{h}</span>
            ))}
          </aside>

          {/* Article */}
          <article className="hb-article">
            <p className="hb-lead">{post.excerpt}</p>

            {paragraphs.map((line, i) => {
              if (line.startsWith("## ")) {
                return <h2 key={i}>{line.replace("## ", "")}</h2>;
              }

              // Pull quote after paragraph index 4
              const nonHeadingsBefore = paragraphs.slice(0, i).filter(l => !l.startsWith("## ")).length;
              if (nonHeadingsBefore === 4) {
                return (
                  <div key={i}>
                    <p>{line}</p>
                    <div className="hb-pull">
                      &ldquo;Indian food is complex, not simply spicy. The heat is one tool in a very large toolkit.&rdquo;
                    </div>
                  </div>
                );
              }

              return <p key={i}>{line}</p>;
            })}

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
