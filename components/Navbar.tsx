"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Spice Stories", href: "/spice-stories" },
  { label: "Benefits", href: "/benefits" },
  { label: "Recipes", href: "/recipes" },
  { label: "Culinary Map", href: "/culinary-map" },
  { label: "Food Culture", href: "/food-culture" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: scrolled ? "rgba(245,237,216,0.97)" : "var(--cream)",
        borderBottom: "1px solid var(--cream-dark)",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        transition: "all 0.3s ease",
        boxShadow: scrolled ? "0 2px 20px rgba(44,26,10,0.08)" : "none",
      }}
    >
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0.6rem 1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          <div style={{
            height: 56,
            width: 220,
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}>
            {/* Fallback text logo if image not available */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "var(--brown-deep)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                <span style={{ fontSize: 20 }}>🌿</span>
              </div>
              <div>
                <div style={{
                  fontFamily: "'IM Fell English', serif",
                  fontSize: 16,
                  fontWeight: 400,
                  color: "var(--brown-deep)",
                  letterSpacing: "0.05em",
                  lineHeight: 1.1,
                }}>SILK ROUTE</div>
                <div style={{
                  fontFamily: "'IM Fell English', serif",
                  fontSize: 13,
                  color: "var(--green-dark)",
                  letterSpacing: "0.15em",
                  lineHeight: 1,
                }}>SPICES</div>
              </div>
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: "flex", gap: "1.5rem", alignItems: "center" }} className="hidden-mobile">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 500,
                color: "var(--brown-mid)",
                textDecoration: "none",
                letterSpacing: "0.02em",
                transition: "color 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--green-dark)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--brown-mid)")}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "1px solid var(--cream-dark)",
            borderRadius: 6,
            padding: "6px 10px",
            cursor: "pointer",
            display: "none",
            color: "var(--brown-deep)",
            fontSize: 18,
          }}
          className="show-mobile"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: "var(--cream-light)",
          borderTop: "1px solid var(--cream-dark)",
          padding: "1rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}>
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 500,
                color: "var(--brown-mid)",
                textDecoration: "none",
                padding: "0.5rem 0",
                borderBottom: "1px solid var(--cream-dark)",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
      `}</style>
    </header>
  );
}
