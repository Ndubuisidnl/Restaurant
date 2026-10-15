import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import CartDrawer from "@/components/cart/CartDrawer";
import Toast from "@/components/ui/Toast";
import FloatingWhatsAppButton from "@/components/ui/FloatingWhatsAppButton";
import ScrollToTop from "@/components/ui/ScrollToTop";
import StoreHydration from "@/components/providers/StoreHydration";

// ============================================================
// FONTS — Google Fonts with safe local/system fallbacks
// ============================================================

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "arial", "sans-serif"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  fallback: ["Georgia", "serif"],
});

// ============================================================
// METADATA & SEO
// ============================================================

export const metadata: Metadata = {
  title: {
    default: "Wood House Cafe & Grill | Port Harcourt",
    template: "%s | Wood House Cafe",
  },
  description:
    "Where Every Meal Feels Like Home. Experience artisanal coffee, wood-fired grills, waffles, and warm social moments at Wood House Cafe in Port Harcourt.",
  keywords: [
    "Wood House Cafe",
    "Wood House Cafe Port Harcourt",
    "Cafe in Port Harcourt",
    "Breakfast Port Harcourt",
    "Restaurant Port Harcourt",
    "Cafe Sani Abacha Road",
    "GRA Phase 2 Restaurant Port Harcourt",
    "Coffee Port Harcourt",
    "Order Food Port Harcourt",
  ],
  authors: [{ name: "Wood House Cafe" }],
  openGraph: {
    title: "Wood House Cafe & Grill | Port Harcourt",
    description:
      "Artisanal coffee, gourmet bites & warm rustic luxury ambiance in Port Harcourt.",
    type: "website",
    locale: "en_NG",
    siteName: "Wood House Cafe",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wood House Cafe & Grill | Port Harcourt",
    description:
      "Artisanal coffee, gourmet bites & warm rustic luxury ambiance in Port Harcourt.",
  },
};

// ============================================================
// ROOT LAYOUT
// ============================================================

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#FDF6EE] text-[#1A0A00] flex flex-col font-sans antialiased">
        <StoreHydration />
        {/* Global Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1">{children}</main>

        {/* Global UI Components */}
        <CartDrawer />
        <Toast />
        <FloatingWhatsAppButton />
        <ScrollToTop />

      </body>
    </html>
  );
}
