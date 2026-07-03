"use client";
import Link from "next/link";

const footerLinks = {
  "Explore": [
    { label: "Spice Stories", href: "/spice-stories" },
    { label: "Benefits & Science", href: "/benefits" },
    { label: "Indian Recipes", href: "/recipes" },
    { label: "Culinary Map", href: "/culinary-map" },
    { label: "Food Culture", href: "/food-culture" },
  ],
  "About": [
    { label: "Our Story", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  "Follow Us": [
    { label: "Instagram", href: "https://instagram.com/silkroutespices" },
    { label: "YouTube", href: "https://youtube.com/@silkroutespices" },
    { label: "Pinterest", href: "https://pinterest.com/silkroutespices" },
    { label: "Facebook", href: "https://facebook.com/silkroutespices" },
  ],
};

export default function Footer() {
  return (
    <footer style={{
      background: "var(--brown-deep)",
      color: "var(--cream)",
      marginTop: "auto",
    }}>
      {/* Main footer */}
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "3rem 1.5rem 2rem",
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr 1fr",
        gap: "2.5rem",
      }}>
        {/* Brand column */}
        <div>
          <div style={{
            fontFamily: "'IM Fell English', serif",
            fontSize: 22,
            color: "var(--gold-light)",
            letterSpacing: "0.08em",
            marginBottom: 4,
          }}>SILK ROUTE SPICES</div>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 12,
            fontStyle: "italic",
            color: "var(--gold)",
            marginBottom: "1.25rem",
            letterSpacing: "0.05em",
          }}>India's Heritage · Nature's Finest</div>
          <p style={{
            fontSize: 13,
            color: "var(--brown-light)",
            lineHeight: 1.7,
            maxWidth: 280,
          }}>
            Tracing the extraordinary story of Indian spices — from ancient trade routes to the heart of every Indian kitchen.
          </p>
          <div style={{ marginTop: "1.5rem" }}>
            <p style={{ fontSize: 12, color: "var(--brown-light)", marginBottom: 8 }}>
              Get stories in your inbox
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="email"
                placeholder="your@email.com"
                style={{
                  flex: 1,
                  padding: "8px 12px",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 4,
                  color: "var(--cream)",
                  fontSize: 13,
                  outline: "none",
                }}
              />
              <button style={{
                padding: "8px 16px",
                background: "var(--gold)",
                color: "var(--brown-deep)",
                border: "none",
                borderRadius: 4,
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "1rem",
            }}>{title}</div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {links.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontSize: 13,
                      color: "var(--brown-light)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--cream)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--brown-light)")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "1rem 1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: 1200,
        margin: "0 auto",
      }}>
        <p style={{ fontSize: 12, color: "var(--brown-light)" }}>
          © 2026 Silk Route Spices · silkroutespices.com
        </p>
        <p style={{ fontSize: 12, color: "var(--brown-light)" }}>
          Made with ♥ for India's spice heritage
        </p>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer > div:first-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          footer > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
