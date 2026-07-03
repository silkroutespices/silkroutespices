import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Silk Route Spices — India's Heritage, Nature's Finest",
  description: "Journey through India's extraordinary spice heritage. History, science, culture, and flavour — from ancient trade routes to your kitchen.",
  keywords: "Indian spices, spice history, silk route, Indian recipes, spice benefits, culinary culture India",
  openGraph: {
    title: "Silk Route Spices",
    description: "Tracing India's ancient spice heritage",
    url: "https://silkroutespices.com",
    siteName: "Silk Route Spices",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
