"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ShoppingBag,
  ChevronDown,
  User,
  Heart,
  BookOpen,
  MapPin,
  Settings,
  LogOut,
  LogIn,
  UserPlus,
  Coffee,
  UtensilsCrossed,
} from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";
import { useAuthUIStore } from "@/lib/store/authUIStore";
import { createClient } from "@/lib/supabase/client";
import { useFavoritesStore } from "@/lib/store/favoritesStore";

// ============================================================
// NAVIGATION LINKS
// ============================================================

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/reservations", label: "Reservations" },
  { href: "/order", label: "Order Online" },
  { href: "/contact", label: "Contact" },
];

// ============================================================
// NAVBAR COMPONENT
// ============================================================

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const { getItemCount, openCart } = useCartStore();
  const { isLoggedIn, userName, setAuthenticatedUser, clearAuthenticatedUser } = useAuthUIStore();

  const cartCount = getItemCount();

  // Scroll detection for navbar style change
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let alive = true;
    let unsubscribe = () => {};

    try {
      const supabase = createClient();
      const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        if (!alive) return;
        if (session?.user) {
          const user = session.user;
          setAuthenticatedUser(
            user.user_metadata?.full_name || user.email?.split("@")[0] || "Customer",
            user.email || ""
          );
          void useFavoritesStore.getState().syncFavorites(user.id);
        } else {
          clearAuthenticatedUser();
          void useFavoritesStore.getState().syncFavorites(null);
        }
      });
      unsubscribe = () => data.subscription.unsubscribe();
      void supabase.auth.getUser().then(({ data: { user } }) => {
        if (!alive) return;
        if (user) {
          setAuthenticatedUser(
            user.user_metadata?.full_name || user.email?.split("@")[0] || "Customer",
            user.email || ""
          );
          void useFavoritesStore.getState().syncFavorites(user.id);
        } else {
          clearAuthenticatedUser();
          void useFavoritesStore.getState().syncFavorites(null);
        }
      });
    } catch {
      // Keep public pages usable until Supabase credentials are configured.
    }

    return () => {
      alive = false;
      unsubscribe();
    };
  }, [clearAuthenticatedUser, setAuthenticatedUser]);

  const handleLogout = async () => {
    try {
      await createClient().auth.signOut();
    } finally {
      clearAuthenticatedUser();
    }
  };

  // Close menus on route change
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setMobileOpen(false);
      setUserMenuOpen(false);
    }, 0);
    return () => window.clearTimeout(timeout);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isHeroPage =
    pathname === "/" ||
    pathname === "/about" ||
    pathname === "/menu";

  const navBg = scrolled || !isHeroPage
    ? "bg-[#1C0D03] shadow-lg shadow-black/20"
    : "bg-transparent";

  return (
    <>
      {/* -------------------------------------------------- */}
      {/* DESKTOP & TABLET NAVBAR */}
      {/* -------------------------------------------------- */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group"
              aria-label="Wood House Cafe — Go to homepage"
            >
              <div className="w-9 h-9 rounded-full bg-[#C8873F] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Coffee className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <div className="hidden sm:block">
                <span className="font-serif text-white text-lg font-semibold leading-none block">
                  Wood House
                </span>
                <span className="text-[#C8873F] text-xs tracking-widest uppercase">
                  Cafe & Grill
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav
              className="hidden lg:flex items-center gap-1"
              aria-label="Primary navigation"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors relative group ${
                    pathname === link.href
                      ? "text-[#C8873F]"
                      : "text-white/80 hover:text-white"
                  }`}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#C8873F] rounded-full"
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop Right Actions */}
            <div className="hidden lg:flex items-center gap-2">

              {/* Cart */}
              <button
                id="cart-button"
                onClick={openCart}
                className="relative p-2 text-white/80 hover:text-white transition-colors group"
                aria-label={`Open cart. ${cartCount} item${cartCount !== 1 ? "s" : ""}`}
              >
                <ShoppingBag className="w-5 h-5" aria-hidden="true" />
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-[#C8873F] text-white text-xs font-bold rounded-full flex items-center justify-center"
                    aria-hidden="true"
                  >
                    {cartCount > 99 ? "99+" : cartCount}
                  </motion.span>
                )}
              </button>

              {/* Auth / User */}
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    id="user-menu-button"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm transition-colors"
                    aria-expanded={userMenuOpen}
                    aria-haspopup="true"
                    aria-label="User account menu"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#C8873F] flex items-center justify-center text-xs font-bold">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <span className="max-w-[100px] truncate">{userName.split(" ")[0]}</span>
                    <ChevronDown
                      className={`w-3 h-3 transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-52 bg-[#1C0D03] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                        role="menu"
                        aria-labelledby="user-menu-button"
                      >
                        <div className="px-4 py-3 border-b border-white/10">
                          <p className="text-white text-sm font-medium">{userName}</p>
                          <p className="text-white/50 text-xs mt-0.5">Demo Account</p>
                        </div>
                        {[
                          { href: "/profile", icon: User, label: "My Profile" },
                          { href: "/profile/orders", icon: BookOpen, label: "My Orders" },
                          { href: "/profile/reservations", icon: UtensilsCrossed, label: "My Reservations" },
                          { href: "/profile/favorites", icon: Heart, label: "Favorites" },
                          { href: "/profile/addresses", icon: MapPin, label: "Saved Addresses" },
                          { href: "/profile/settings", icon: Settings, label: "Settings" },
                        ].map(({ href, icon: Icon, label }) => (
                          <Link
                            key={href}
                            href={href}
                            role="menuitem"
                            className="flex items-center gap-3 px-4 py-2.5 text-white/80 hover:text-white hover:bg-white/5 text-sm transition-colors"
                          >
                            <Icon className="w-4 h-4" aria-hidden="true" />
                            {label}
                          </Link>
                        ))}
                        <div className="border-t border-white/10">
                          <button
                            role="menuitem"
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400 hover:text-red-300 hover:bg-white/5 text-sm transition-colors"
                          >
                            <LogOut className="w-4 h-4" aria-hidden="true" />
                            Log Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/auth/login"
                    className="flex items-center gap-1.5 px-3 py-1.5 text-white/80 hover:text-white text-sm transition-colors"
                  >
                    <LogIn className="w-4 h-4" aria-hidden="true" />
                    Login
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="flex items-center gap-1.5 px-4 py-1.5 bg-[#C8873F] hover:bg-[#B27532] text-white text-sm font-medium rounded-full transition-colors"
                  >
                    <UserPlus className="w-4 h-4" aria-hidden="true" />
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile: Cart + Hamburger */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={openCart}
                className="relative p-2 text-white/80 hover:text-white transition-colors"
                aria-label={`Open cart. ${cartCount} items`}
              >
                <ShoppingBag className="w-5 h-5" aria-hidden="true" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C8873F] text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                id="mobile-menu-button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 text-white/80 hover:text-white transition-colors"
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {mobileOpen ? (
                  <X className="w-6 h-6" aria-hidden="true" />
                ) : (
                  <Menu className="w-6 h-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* -------------------------------------------------- */}
      {/* MOBILE SLIDE-IN MENU */}
      {/* -------------------------------------------------- */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.nav
              key="mobile-drawer"
              id="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-[#1C0D03] flex flex-col lg:hidden shadow-2xl"
              aria-label="Mobile navigation"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#C8873F] flex items-center justify-center">
                    <Coffee className="w-4 h-4 text-white" aria-hidden="true" />
                  </div>
                  <span className="font-serif text-white font-semibold">
                    Wood House Cafe
                  </span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 text-white/60 hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              {/* Nav Links */}
              <div className="flex-1 overflow-y-auto py-4">
                <div className="space-y-1 px-4">
                  {NAV_LINKS.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                          pathname === link.href
                            ? "bg-[#C8873F]/20 text-[#C8873F]"
                            : "text-white/80 hover:text-white hover:bg-white/5"
                        }`}
                        aria-current={pathname === link.href ? "page" : undefined}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Divider */}
                <div className="mx-4 my-4 border-t border-white/10" />

                {/* Auth Links */}
                <div className="space-y-1 px-4">
                  {isLoggedIn ? (
                    <>
                      <div className="px-4 py-2">
                        <p className="text-[#C8873F] text-xs font-medium uppercase tracking-wider">
                          My Account
                        </p>
                      </div>
                      {[
                        { href: "/profile", icon: User, label: "My Profile" },
                        { href: "/profile/orders", icon: BookOpen, label: "My Orders" },
                        { href: "/profile/reservations", icon: UtensilsCrossed, label: "My Reservations" },
                        { href: "/profile/favorites", icon: Heart, label: "Favorites" },
                        { href: "/profile/addresses", icon: MapPin, label: "Saved Addresses" },
                        { href: "/profile/settings", icon: Settings, label: "Settings" },
                      ].map(({ href, icon: Icon, label }) => (
                        <Link
                          key={href}
                          href={href}
                          className="flex items-center gap-3 px-4 py-2.5 text-white/70 hover:text-white hover:bg-white/5 rounded-lg text-sm transition-colors"
                        >
                          <Icon className="w-4 h-4" aria-hidden="true" />
                          {label}
                        </Link>
                      ))}
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400 hover:text-red-300 hover:bg-white/5 rounded-lg text-sm transition-colors"
                      >
                        <LogOut className="w-4 h-4" aria-hidden="true" />
                        Log Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/auth/login"
                        className="flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-lg text-base font-medium transition-colors"
                      >
                        <LogIn className="w-4 h-4" aria-hidden="true" />
                        Login
                      </Link>
                      <Link
                        href="/auth/signup"
                        className="flex items-center gap-3 px-4 py-3 bg-[#C8873F] hover:bg-[#B27532] text-white rounded-lg text-base font-medium transition-colors"
                      >
                        <UserPlus className="w-4 h-4" aria-hidden="true" />
                        Create Account
                      </Link>
                    </>
                  )}
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="px-5 py-4 border-t border-white/10">
                <p className="text-white/30 text-xs text-center">
                  3 Louis Drive, Port Harcourt
                </p>
                <p className="text-[#C8873F] text-xs text-center mt-1">
                  8:00 AM – 10:00 PM Daily
                </p>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
