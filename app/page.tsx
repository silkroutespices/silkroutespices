"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";

const pillars = [
  { emoji: "🏺", title: "Spice Stories", desc: "History, trade routes & civilisational journeys from the ancient Silk Route", href: "/spice-stories", bg: "#FFF3E0" },
  { emoji: "🌿", title: "Benefits & Science", desc: "Ayurveda meets modern research — the healing power of Indian spices", href: "/benefits", bg: "#F0F7EC" },
  { emoji: "🍛", title: "Recipes", desc: "Regional Indian diversity beyond the mainstream — home cooking as it really is", href: "/recipes", bg: "#FFF8F0" },
  { emoji: "🗺️", title: "Culinary Map", desc: "India's hyperlocal food geography — every region a different flavour world", href: "/culinary-map", bg: "#F5F0FF" },
  { emoji: "🎭", title: "Food Culture", desc: "Myths, traditions, and the real stories behind what India eats", href: "/food-culture", bg: "#FFF0F5" },
];

const regions = [
  { name: "North India", emoji: "🌾", spices: "Garam masala · Hing · Jeera", color: "#FFF3E0" },
  { name: "South India", emoji: "🥥", spices: "Curry leaf · Mustard · Kokum", color: "#F0F7EC" },
  { name: "East India", emoji: "🐟", spices: "Panch Phoron · Radhuni", color: "#F5F0FF" },
  { name: "West India", emoji: "🥜", spices: "Dhana jeera · Kala masala", color: "#FFF8F0" },
  { name: "Northeast", emoji: "🌶️", spices: "Bhut jolokia · Tezpat", color: "#FFF0F0" },
];

export default function HomePage() {
  const posts = getAllPosts();
  const revealRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    revealRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addReveal = (el: HTMLDivElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  return (
    <div style={{ background: "var(--cream)" }}>

      {/* ── HERO ── */}
      <section className="hero-section">
        <div className="hero-inner">
          {/* Text side */}
          <div className="hero-text animate-fade-up">
            <div className="hero-eyebrow">
              ✦ India's Heritage · Nature's Finest ✦
            </div>
            <h1 className="hero-title">
              Where every spice<br />
              <span style={{ color: "var(--gold-light)", fontStyle: "italic" }}>tells a story</span>
            </h1>
            <p className="hero-desc">
              From the heart of Indian heritage to the ancient Silk Route — discover the history, science, culture, and flavour of India's extraordinary spice world.
            </p>
            <div className="hero-buttons">
              <Link href="/blog" className="btn-primary">Start Exploring →</Link>
              <Link href="/spice-stories" className="btn-secondary">Spice Stories</Link>
            </div>
          </div>

          {/* Logo / visual side */}
          <div className="hero-visual animate-fade-in">
            <Image
              src="/logo-circle.png"
              alt="Silk Route Spices"
              width={380}
              height={380}
              className="hero-logo-img"
              priority
            />
          </div>
        </div>
      </section>

      {/* ── PILLARS ── */}
      <section style={{ padding: "4rem 1.5rem", background: "var(--cream)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div ref={addReveal} className="reveal section-header">
            <div className="eyebrow">What we explore</div>
            <h2 className="section-title">Five worlds of Indian spice</h2>
            <p className="section-desc">From the ancient Silk Route to your kitchen shelf — every dimension of India's extraordinary spice heritage.</p>
          </div>
          <div className="pillars-grid">
            {pillars.map((p, i) => (
              <div ref={addReveal} key={p.title} className="reveal card-hover">
                <Link href={p.href} style={{ textDecoration: "none", display: "block" }}>
                  <div className="pillar-card" style={{ background: p.bg }}>
                    <div style={{ fontSize: 36, marginBottom: "0.75rem" }}>{p.emoji}</div>
                    <div className="pillar-title">{p.title}</div>
                    <div className="pillar-desc">{p.desc}</div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED ARTICLES ── */}
      <section style={{ padding: "4rem 1.5rem", background: "var(--cream-light)", borderTop: "1px solid var(--cream-dark)", borderBottom: "1px solid var(--cream-dark)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div ref={addReveal} className="reveal" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <div className="eyebrow">Latest stories</div>
              <h2 className="section-title" style={{ marginBottom: 0 }}>From the spice route</h2>
            </div>
            <Link href="/blog" className="view-all">View all stories →</Link>
          </div>
          <div className="articles-grid">
            {posts.map((post, i) => (
              <div ref={addReveal} key={post.slug} className="reveal card-hover">
                <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
                  <article className="article-card">
                    <div className="article-thumb" style={{
                      height: i === 0 ? 220 : 160,
                      background: `linear-gradient(135deg, ${i === 0 ? "#3D1500, #8B2500" : i === 1 ? "#1A3A0A, #2D5A1A" : "#2C1A0A, #5C3317"})`,
                    }}>
                      <span style={{ fontSize: i === 0 ? 64 : 48 }}>{post.emoji}</span>
                      <div className="article-tag" style={{ background: post.categoryColor }}>{post.category}</div>
                    </div>
                    <div style={{ padding: "1.25rem" }}>
                      <h3 className="article-title" style={{ fontSize: i === 0 ? 20 : 16 }}>{post.title}</h3>
                      {i === 0 && <p className="article-excerpt">{post.excerpt}</p>}
                      <div className="article-meta">{post.date} · {post.readTime}</div>
                    </div>
                  </article>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CULINARY MAP ── */}
      <section style={{ padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div ref={addReveal} className="reveal section-header">
            <div className="eyebrow">Culinary map of India</div>
            <h2 className="section-title">Every region, a different flavour world</h2>
            <p className="section-desc">India is not one cuisine. It is hundreds. Each region has its own spice language.</p>
          </div>
          <div ref={addReveal} className="reveal regions-grid">
            {regions.map((r, i) => (
              <Link key={r.name} href="/culinary-map" style={{ textDecoration: "none" }}>
                <div className="region-card" style={{ background: r.color, borderRight: i < 4 ? "1px solid var(--cream-dark)" : "none" }}>
                  <div style={{ fontSize: 32, marginBottom: "0.5rem" }}>{r.emoji}</div>
                  <div className="region-name">{r.name}</div>
                  <div className="region-spice">{r.spices}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── YOUTUBE ── */}
      <section style={{ padding: "4rem 1.5rem", background: "var(--brown-deep)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div ref={addReveal} className="reveal youtube-grid">
            <div>
              <div className="eyebrow" style={{ color: "var(--gold)" }}>Watch & Learn</div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(22px,3vw,34px)", color: "var(--cream-light)", marginBottom: "1rem" }}>
                Spice stories come alive on YouTube
              </h2>
              <p style={{ fontSize: 15, color: "var(--brown-light)", lineHeight: 1.75, marginBottom: "2rem" }}>
                Short films, deep dives, recipe guides, and cultural explorations — our YouTube channel brings India's spice world to life.
              </p>
              <a href="https://youtube.com/@silkroutespices" target="_blank" rel="noopener noreferrer" className="btn-youtube">
                ▶ Subscribe on YouTube
              </a>
            </div>
            <div className="youtube-placeholder">
              <div style={{ fontSize: 48, marginBottom: "0.75rem" }}>▶</div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, color: "var(--cream-light)", marginBottom: "0.5rem" }}>Coming Soon</div>
              <div style={{ fontSize: 13, color: "var(--brown-light)" }}>Our first videos are in production. Subscribe to be notified.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section style={{ padding: "4rem 1.5rem", background: "var(--cream)" }}>
        <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
          <div ref={addReveal} className="reveal">
            <div style={{ fontSize: 44, marginBottom: "1rem" }}>✉️</div>
            <div className="eyebrow">Join the journey</div>
            <h2 className="section-title">Stories in your inbox</h2>
            <p className="section-desc" style={{ marginBottom: "2rem" }}>
              One story a week. A spice, a route, a recipe, a myth. No spam. Just the world of Indian spice, distilled.
            </p>
            <div className="newsletter-form">
              <input type="email" placeholder="your@email.com" className="newsletter-input" />
              <button className="newsletter-btn">Subscribe</button>
            </div>
            <p style={{ fontSize: 11, color: "var(--brown-light)", marginTop: "0.75rem" }}>Join readers from across India and beyond. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      <style>{`
        /* HERO */
        .hero-section {
          background: linear-gradient(135deg, #1C0A02 0%, #3D1500 50%, #5C2800 100%);
          min-height: 90vh;
          display: flex;
          align-items: center;
          padding: 3rem 1.5rem;
        }
        .hero-inner {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
        }
        .hero-eyebrow {
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 1.25rem;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
        }
        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(32px, 4.5vw, 54px);
          font-weight: 600;
          color: var(--cream-light);
          line-height: 1.15;
          margin-bottom: 1.25rem;
        }
        .hero-desc {
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          color: rgba(245,237,216,0.75);
          line-height: 1.75;
          max-width: 440px;
          margin-bottom: 2rem;
        }
        .hero-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          background: var(--gold);
          color: var(--brown-deep);
          padding: 13px 26px;
          border-radius: 4px;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          letter-spacing: 0.03em;
          transition: opacity 0.2s;
        }
        .btn-primary:hover { opacity: 0.9; }
        .btn-secondary {
          display: inline-flex;
          align-items: center;
          background: transparent;
          color: var(--cream);
          padding: 13px 26px;
          border-radius: 4px;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          border: 1px solid rgba(245,237,216,0.3);
          transition: border-color 0.2s;
        }
        .btn-secondary:hover { border-color: rgba(245,237,216,0.6); }
        .hero-visual {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .hero-logo-img {
          width: 100%;
          max-width: 360px;
          height: auto;
          filter: drop-shadow(0 8px 40px rgba(0,0,0,0.4));
          animation: float 5s ease-in-out infinite;
        }

        /* SECTIONS */
        .section-header { text-align: center; margin-bottom: 2.5rem; }
        .eyebrow {
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 0.75rem;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
        }
        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(24px, 3vw, 36px);
          color: var(--brown-deep);
          margin-bottom: 0.75rem;
        }
        .section-desc {
          font-size: 15px;
          color: var(--brown-light);
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.7;
        }
        .view-all {
          font-size: 13px;
          color: var(--green-dark);
          font-weight: 600;
          text-decoration: none;
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.05em;
        }

        /* PILLARS */
        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1rem;
        }
        .pillar-card {
          border: 1px solid var(--cream-dark);
          border-radius: 10px;
          padding: 1.5rem 1rem;
          text-align: center;
          height: 100%;
          transition: border-color 0.2s;
        }
        .pillar-card:hover { border-color: var(--gold); }
        .pillar-title {
          font-family: 'Playfair Display', serif;
          font-size: 14px;
          font-weight: 600;
          color: var(--brown-deep);
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }
        .pillar-desc { font-size: 12px; color: var(--brown-light); line-height: 1.6; }

        /* ARTICLES */
        .articles-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr;
          gap: 1.5rem;
        }
        .article-card {
          background: var(--cream);
          border: 1px solid var(--cream-dark);
          border-radius: 10px;
          overflow: hidden;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .article-thumb {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .article-tag {
          position: absolute;
          top: 12px; left: 12px;
          color: #FAF6F0;
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 2px;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
        }
        .article-title {
          font-family: 'Playfair Display', serif;
          font-weight: 600;
          color: var(--brown-deep);
          line-height: 1.4;
          margin-bottom: 0.5rem;
        }
        .article-excerpt {
          font-size: 13px;
          color: var(--brown-light);
          line-height: 1.6;
          margin-bottom: 0.75rem;
        }
        .article-meta { font-size: 11px; color: var(--gold); font-family: 'Inter', sans-serif; }

        /* REGIONS */
        .regions-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid var(--cream-dark);
        }
        .region-card {
          padding: 2rem 1rem;
          text-align: center;
          transition: opacity 0.2s;
          cursor: pointer;
        }
        .region-card:hover { opacity: 0.85; }
        .region-name {
          font-family: 'Playfair Display', serif;
          font-size: 14px;
          font-weight: 600;
          color: var(--brown-deep);
          margin-bottom: 0.4rem;
        }
        .region-spice { font-size: 11px; color: var(--brown-light); line-height: 1.5; }

        /* YOUTUBE */
        .youtube-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
        }
        .btn-youtube {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #FF0000;
          color: #fff;
          padding: 12px 24px;
          border-radius: 4px;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
        }
        .youtube-placeholder {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 3rem;
          text-align: center;
          aspect-ratio: 16/9;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        /* NEWSLETTER */
        .newsletter-form {
          display: flex;
          gap: 8px;
          max-width: 420px;
          margin: 0 auto;
        }
        .newsletter-input {
          flex: 1;
          padding: 12px 16px;
          background: var(--cream-light);
          border: 1px solid var(--cream-dark);
          border-radius: 4px;
          font-size: 14px;
          outline: none;
          color: var(--brown-deep);
          font-family: 'Inter', sans-serif;
        }
        .newsletter-btn {
          padding: 12px 20px;
          background: var(--green-dark);
          color: var(--cream-light);
          border: none;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          white-space: nowrap;
        }

        /* MOBILE */
        @media (max-width: 900px) {
          .hero-inner { grid-template-columns: 1fr; gap: 2rem; min-height: auto; }
          .hero-section { min-height: auto; padding: 3rem 1.25rem; }
          .hero-visual { order: -1; }
          .hero-logo-img { max-width: 240px; }
          .hero-desc { font-size: 15px; }
          .pillars-grid { grid-template-columns: repeat(3, 1fr); }
          .articles-grid { grid-template-columns: 1fr; }
          .regions-grid { grid-template-columns: repeat(3, 1fr); }
          .youtube-grid { grid-template-columns: 1fr; }
          .youtube-placeholder { aspect-ratio: auto; padding: 2rem; }
        }
        @media (max-width: 600px) {
          .hero-title { font-size: 32px; }
          .hero-desc { font-size: 14px; }
          .pillars-grid { grid-template-columns: repeat(2, 1fr); }
          .regions-grid { grid-template-columns: repeat(2, 1fr); }
          .newsletter-form { flex-direction: column; }
          .newsletter-btn { width: 100%; }
        }
      `}</style>
    </div>
  );
}
