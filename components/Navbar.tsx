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
    <header style={{
      position: "sticky", top: 0, zIndex: 100,
      background: scrolled ? "rgba(245,237,216,0.97)" : "var(--cream)",
      borderBottom: "1px solid var(--cream-dark)",
      backdropFilter: scrolled ? "blur(8px)" : "none",
      transition: "all 0.3s ease",
      boxShadow: scrolled ? "0 2px 20px rgba(44,26,10,0.08)" : "none",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        padding: "0.4rem 1.5rem",
        display: "flex", alignItems: "center",
        justifyContent: "space-between", gap: "1rem",
      }}>
        {/* Real logo image */}
        <Link href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          <Image
            src="/logo-horizontal.png"
            alt="Silk Route Spices"
            width={220}
            height={70}
            style={{ height: 52, width: "auto", objectFit: "contain" }}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: "flex", gap: "1.5rem", alignItems: "center" }} className="nav-desktop">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="nav-mobile-btn"
          style={{
            background: "none", border: "1px solid var(--cream-dark)",
            borderRadius: 6, padding: "6px 12px", cursor: "pointer",
            color: "var(--brown-deep)", fontSize: 20, lineHeight: 1,
          }}
        >{menuOpen ? "✕" : "☰"}</button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{
          background: "var(--cream-light)",
          borderTop: "1px solid var(--cream-dark)",
          padding: "0.75rem 1.5rem 1rem",
          display: "flex", flexDirection: "column", gap: "0",
        }}>
          {navLinks.map(link => (
            <Link key={link.href} href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'Inter', sans-serif", fontSize: 15,
                fontWeight: 500, color: "var(--brown-mid)",
                textDecoration: "none", padding: "0.75rem 0",
                borderBottom: "1px solid var(--cream-dark)",
              }}>
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        .nav-desktop { display: flex; }
        .nav-mobile-btn { display: none; }
        .nav-link {
          font-family: 'Inter', sans-serif;
          font-size: 13px; font-weight: 500;
          color: var(--brown-mid); text-decoration: none;
          letter-spacing: 0.02em; transition: color 0.2s;
          white-space: nowrap;
        }
        .nav-link:hover { color: var(--green-dark); }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}
