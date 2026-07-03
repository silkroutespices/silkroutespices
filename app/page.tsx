"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
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
      { threshold: 0.1 }
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
      <section style={{
        background: "linear-gradient(135deg, #1C0A02 0%, #3D1500 50%, #5C2800 100%)",
        minHeight: "88vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Texture overlay */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle at 20% 50%, rgba(184,134,11,0.15) 0%, transparent 60%), radial-gradient(circle at 80% 30%, rgba(139,37,0,0.2) 0%, transparent 50%)",
        }} />
        {/* Spice dots decoration */}
        {[...Array(12)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            width: i % 3 === 0 ? 6 : i % 3 === 1 ? 4 : 8,
            height: i % 3 === 0 ? 6 : i % 3 === 1 ? 4 : 8,
            borderRadius: "50%",
            background: `rgba(184,134,11,${0.1 + (i % 4) * 0.08})`,
            top: `${10 + (i * 7) % 80}%`,
            left: `${5 + (i * 11) % 90}%`,
            animation: `float ${3 + (i % 3)}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }} />
        ))}

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "4rem 1.5rem", position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }}>
          <div className="animate-fade-up">
            <div style={{
              display: "inline-block",
              fontSize: 10,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "1.25rem",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
            }}>
              ✦ Tracing India's ancient spice heritage ✦
            </div>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(36px, 5vw, 58px)",
              fontWeight: 600,
              color: "var(--cream-light)",
              lineHeight: 1.15,
              marginBottom: "1.5rem",
            }}>
              Where every spice<br />
              <span style={{ color: "var(--gold-light)", fontStyle: "italic" }}>tells a story</span>
            </h1>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 17,
              color: "rgba(245,237,216,0.75)",
              lineHeight: 1.75,
              maxWidth: 440,
              marginBottom: "2.5rem",
            }}>
              From the ancient Silk Route to the heart of every Indian kitchen — discover the history, science, culture, and flavour of India's extraordinary spice world.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/blog" style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "var(--gold)",
                color: "var(--brown-deep)",
                padding: "14px 28px",
                borderRadius: 4,
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
                letterSpacing: "0.03em",
                transition: "all 0.2s",
              }}>
                Start Exploring →
              </Link>
              <Link href="/spice-stories" style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "transparent",
                color: "var(--cream)",
                padding: "14px 28px",
                borderRadius: 4,
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
                border: "1px solid rgba(245,237,216,0.3)",
                letterSpacing: "0.03em",
              }}>
                Spice Stories
              </Link>
            </div>
          </div>

          {/* Hero visual - decorative spice mandala */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} className="animate-fade-in delay-300">
            <div className="animate-float" style={{
              width: 320,
              height: 320,
              borderRadius: "50%",
              background: "radial-gradient(circle at 40% 40%, rgba(184,134,11,0.2), rgba(92,40,0,0.4))",
              border: "1px solid rgba(184,134,11,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              boxShadow: "0 0 80px rgba(184,134,11,0.15)",
            }}>
              <div style={{ fontSize: 100, filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.5))" }}>🌿</div>
              {["🌶️","🫚","✨","🍃","⭐"].map((emoji, i) => (
                <div key={i} style={{
                  position: "absolute",
                  fontSize: 28,
                  top: `${50 + 42 * Math.sin(i * Math.PI * 2 / 5)}%`,
                  left: `${50 + 42 * Math.cos(i * Math.PI * 2 / 5)}%`,
                  transform: "translate(-50%,-50%)",
                  filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.4))",
                  animation: `float ${2.5 + i * 0.3}s ease-in-out infinite`,
                  animationDelay: `${i * 0.4}s`,
                }}>{emoji}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
          color: "rgba(245,237,216,0.4)", fontSize: 12, letterSpacing: 2,
          fontFamily: "'Inter', sans-serif", textAlign: "center",
          animation: "fadeIn 1s ease 1s forwards", opacity: 0,
        }}>
          <div>SCROLL</div>
          <div style={{ marginTop: 6, fontSize: 16 }}>↓</div>
        </div>
      </section>

      {/* ── PILLARS ── */}
      <section style={{ padding: "5rem 1.5rem", background: "var(--cream)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div ref={addReveal} className="reveal" style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ fontSize: 10, letterSpacing: "3px", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.75rem", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
              What we explore
            </div>
            <h2 style={{ fontSize: "clamp(28px, 3vw, 38px)", color: "var(--brown-deep)", marginBottom: "0.75rem" }}>
              Five worlds of Indian spice
            </h2>
            <p style={{ fontSize: 16, color: "var(--brown-light)", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
              From the ancient Silk Route to your kitchen shelf — every dimension of India's extraordinary spice heritage.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1rem" }}>
            {pillars.map((p, i) => (
              <div ref={addReveal} key={p.title} className={`reveal card-hover delay-${(i+1)*100}`}>
                <Link href={p.href} style={{ textDecoration: "none", display: "block" }}>
                  <div style={{
                    background: p.bg,
                    border: "1px solid var(--cream-dark)",
                    borderRadius: 10,
                    padding: "1.75rem 1.25rem",
                    textAlign: "center",
                    height: "100%",
                    transition: "border-color 0.2s",
                  }}>
                    <div style={{ fontSize: 36, marginBottom: "0.75rem" }}>{p.emoji}</div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 600, color: "var(--brown-deep)", marginBottom: "0.5rem", lineHeight: 1.3 }}>{p.title}</div>
                    <div style={{ fontSize: 12, color: "var(--brown-light)", lineHeight: 1.6 }}>{p.desc}</div>
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
          <div ref={addReveal} className="reveal" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: "3px", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.5rem", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>Latest stories</div>
              <h2 style={{ fontSize: "clamp(24px, 3vw, 34px)", color: "var(--brown-deep)" }}>From the spice route</h2>
            </div>
            <Link href="/blog" style={{ fontSize: 13, color: "var(--green-dark)", fontWeight: 600, textDecoration: "none", fontFamily: "'Inter', sans-serif", letterSpacing: "0.05em" }}>
              View all stories →
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr", gap: "1.5rem" }}>
            {posts.map((post, i) => (
              <div ref={addReveal} key={post.slug} className={`reveal card-hover delay-${(i+1)*100}`}>
                <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
                  <article style={{
                    background: "var(--cream)",
                    border: "1px solid var(--cream-dark)",
                    borderRadius: 10,
                    overflow: "hidden",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}>
                    <div style={{
                      height: i === 0 ? 220 : 160,
                      background: `linear-gradient(135deg, ${i === 0 ? "#3D1500, #8B2500" : i === 1 ? "#1A3A0A, #2D5A1A" : "#2C1A0A, #5C3317"})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      fontSize: i === 0 ? 64 : 48,
                    }}>
                      {post.emoji}
                      <div style={{
                        position: "absolute", top: 12, left: 12,
                        background: post.categoryColor,
                        color: "#FAF6F0",
                        fontSize: 10, letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        padding: "4px 10px",
                        borderRadius: 2,
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                      }}>{post.category}</div>
                    </div>
                    <div style={{ padding: "1.25rem", flex: 1 }}>
                      <h3 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: i === 0 ? 20 : 16,
                        fontWeight: 600,
                        color: "var(--brown-deep)",
                        lineHeight: 1.4,
                        marginBottom: "0.5rem",
                      }}>{post.title}</h3>
                      {i === 0 && (
                        <p style={{ fontSize: 13, color: "var(--brown-light)", lineHeight: 1.6, marginBottom: "0.75rem" }}>{post.excerpt}</p>
                      )}
                      <div style={{ fontSize: 11, color: "var(--gold)", fontFamily: "'Inter', sans-serif", letterSpacing: "0.5px" }}>
                        {post.date} · {post.readTime}
                      </div>
                    </div>
                  </article>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CULINARY MAP ── */}
      <section style={{ padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div ref={addReveal} className="reveal" style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <div style={{ fontSize: 10, letterSpacing: "3px", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.75rem", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>Culinary map of India</div>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 34px)", color: "var(--brown-deep)", marginBottom: "0.75rem" }}>Every region, a different flavour world</h2>
            <p style={{ fontSize: 15, color: "var(--brown-light)", maxWidth: 480, margin: "0 auto" }}>India is not one cuisine. It is hundreds. Each region has its own spice language.</p>
          </div>
          <div ref={addReveal} className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 0, borderRadius: 10, overflow: "hidden", border: "1px solid var(--cream-dark)" }}>
            {regions.map((r, i) => (
              <Link key={r.name} href="/culinary-map" style={{ textDecoration: "none" }}>
                <div style={{
                  background: r.color,
                  padding: "2rem 1rem",
                  textAlign: "center",
                  borderRight: i < 4 ? "1px solid var(--cream-dark)" : "none",
                  transition: "background 0.2s",
                  cursor: "pointer",
                }}>
                  <div style={{ fontSize: 32, marginBottom: "0.75rem" }}>{r.emoji}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 600, color: "var(--brown-deep)", marginBottom: "0.4rem" }}>{r.name}</div>
                  <div style={{ fontSize: 11, color: "var(--brown-light)", lineHeight: 1.5 }}>{r.spices}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── YOUTUBE SECTION ── */}
      <section style={{ padding: "4rem 1.5rem", background: "var(--brown-deep)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div ref={addReveal} className="reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: "3px", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.75rem", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>Watch & Learn</div>
              <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", color: "var(--cream-light)", marginBottom: "1rem" }}>Spice stories come alive on YouTube</h2>
              <p style={{ fontSize: 15, color: "var(--brown-light)", lineHeight: 1.75, marginBottom: "2rem" }}>
                Short films, deep dives, recipe guides, and cultural explorations — our YouTube channel brings India's spice world to life in ways a page cannot.
              </p>
              <a href="https://youtube.com/@silkroutespices" target="_blank" rel="noopener noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "#FF0000", color: "#fff",
                padding: "12px 24px", borderRadius: 4,
                fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600,
                textDecoration: "none",
              }}>
                <span>▶</span> Subscribe on YouTube
              </a>
            </div>
            <div style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 10,
              padding: "3rem",
              textAlign: "center",
              aspectRatio: "16/9",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}>
              <div style={{ fontSize: 56 }}>▶</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: "var(--cream-light)" }}>Coming Soon</div>
              <div style={{ fontSize: 13, color: "var(--brown-light)" }}>Our first videos are in production. Subscribe to be notified.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section style={{ padding: "5rem 1.5rem", background: "var(--cream)" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <div ref={addReveal} className="reveal">
            <div style={{ fontSize: 48, marginBottom: "1rem" }}>✉️</div>
            <div style={{ fontSize: 10, letterSpacing: "3px", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.75rem", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>Join the journey</div>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 34px)", color: "var(--brown-deep)", marginBottom: "0.75rem" }}>Stories in your inbox</h2>
            <p style={{ fontSize: 15, color: "var(--brown-light)", lineHeight: 1.7, marginBottom: "2rem" }}>
              One story a week. A spice, a route, a recipe, a myth, a kitchen. No spam. No selling. Just the world of Indian spice, distilled.
            </p>
            <div style={{ display: "flex", gap: 8, maxWidth: 420, margin: "0 auto" }}>
              <input type="email" placeholder="your@email.com" style={{
                flex: 1, padding: "12px 16px",
                background: "var(--cream-light)",
                border: "1px solid var(--cream-dark)",
                borderRadius: 4, fontSize: 14, outline: "none",
                color: "var(--brown-deep)",
                fontFamily: "'Inter', sans-serif",
              }} />
              <button style={{
                padding: "12px 20px",
                background: "var(--green-dark)", color: "var(--cream-light)",
                border: "none", borderRadius: 4,
                fontSize: 14, fontWeight: 600, cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                whiteSpace: "nowrap",
              }}>Subscribe</button>
            </div>
            <p style={{ fontSize: 11, color: "var(--brown-light)", marginTop: "0.75rem" }}>Join readers from across India and beyond. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          section > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          section > div[style*="grid-template-columns: repeat(5"] { grid-template-columns: repeat(3, 1fr) !important; }
          section > div[style*="grid-template-columns: 1.6fr"] { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          section > div[style*="grid-template-columns: repeat(5"] { grid-template-columns: repeat(2, 1fr) !important; }
          section > div[style*="grid-template-columns: repeat(3"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
