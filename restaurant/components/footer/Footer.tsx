import Link from "next/link";
import {
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Coffee,
  ExternalLink,
} from "lucide-react";
import { BUSINESS_INFO } from "@/lib/data/demo";

// ============================================================
// FOOTER COMPONENT
// ============================================================

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/about", label: "About Us" },
    { href: "/reservations", label: "Reservations" },
    { href: "/order", label: "Order Online" },
    { href: "/contact", label: "Contact" },
  ];

  const accountLinks = [
    { href: "/auth/login", label: "Login" },
    { href: "/auth/signup", label: "Create Account" },
    { href: "/profile/orders", label: "My Orders" },
    { href: "/profile/reservations", label: "My Reservations" },
    { href: "/profile/favorites", label: "Favorites" },
    { href: "/profile/addresses", label: "Saved Addresses" },
  ];

  const legalLinks = [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/reservation-policy", label: "Reservation Policy" },
    { href: "/ordering-policy", label: "Ordering Policy" },
  ];

  return (
    <footer className="bg-[#1C0D03] text-white" role="contentinfo">
      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#C8873F] flex items-center justify-center">
                <Coffee className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <div>
                <p className="font-serif text-white font-semibold leading-none">
                  Wood House Cafe
                </p>
                <p className="text-[#C8873F] text-xs tracking-wider mt-0.5">
                  & Grill
                </p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              {BUSINESS_INFO.tagline}. A cozy corner for great food, artisanal coffee, and warm memories in Port Harcourt.
            </p>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href={BUSINESS_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/70 hover:text-white text-sm transition-colors"
                aria-label="Follow Wood House Cafe on Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span className="text-xs">{BUSINESS_INFO.instagram}</span>
              </a>
              {/* TikTok placeholder — account not publicly confirmed */}
              <div className="px-3 py-2 bg-white/5 rounded-lg text-white/30 text-xs cursor-not-allowed" title="TikTok — coming soon">
                TikTok
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-base font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5" role="list">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[#C8873F] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h3 className="font-serif text-base font-semibold text-white mb-4">
              My Account
            </h3>
            <ul className="space-y-2.5" role="list">
              {accountLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[#C8873F] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h3 className="font-serif text-base font-semibold text-white mb-4">
              Visit Us
            </h3>
            <ul className="space-y-3" role="list">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-[#C8873F] mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {BUSINESS_INFO.address.street}
                  </p>
                  <p className="text-white/70 text-sm">
                    {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state}
                  </p>
                  <a
                    href={BUSINESS_INFO.getDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C8873F] hover:text-[#E8C99A] text-xs mt-1 flex items-center gap-1 transition-colors"
                  >
                    Get Directions
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C8873F] flex-shrink-0" aria-hidden="true" />
                <a
                  href={`tel:${BUSINESS_INFO.phone.replace(/\s/g, "")}`}
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  {BUSINESS_INFO.phone}
                </a>
              </li>

              <li className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-[#C8873F] flex-shrink-0" aria-hidden="true" />
                <a
                  href={`https://wa.me/${BUSINESS_INFO.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-[#25D366] text-sm transition-colors"
                >
                  WhatsApp Us
                </a>
              </li>

              <li className="flex gap-3">
                <Clock className="w-4 h-4 text-[#C8873F] mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-white/70 text-sm">
                    {BUSINESS_INFO.openingHours.display}
                  </p>
                  <p className="text-white/40 text-xs mt-0.5">
                    {BUSINESS_INFO.openingHours.schedule}
                  </p>
                </div>
              </li>

              {/* Email placeholder — not publicly confirmed */}
              <li className="text-white/30 text-xs italic pl-7">
                Email: contact us via phone or WhatsApp
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/40 text-xs text-center sm:text-left">
              © {currentYear} Wood House Cafe, Port Harcourt. All rights reserved.
            </p>
            <nav aria-label="Legal links">
              <ul className="flex flex-wrap items-center gap-3 justify-center" role="list">
                {legalLinks.map((link, i) => (
                  <li key={link.href} className="flex items-center gap-3">
                    {i > 0 && <span className="text-white/20 text-xs">·</span>}
                    <Link
                      href={link.href}
                      className="text-white/40 hover:text-white/70 text-xs transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
