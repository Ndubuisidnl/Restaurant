"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, ShoppingBag } from "lucide-react";

// ============================================================
// HERO SECTION
// ============================================================

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1C0D03]"
      aria-label="Hero"
    >
      {/* IMAGE: WOOD HOUSE CAFE INTERIOR WARM AMBIENT LIGHTING FULL WIDTH */}
      {/* Background Image Placeholder */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#1C0D03] via-[#3B1A08] to-[#1C0D03]"
        aria-hidden="true"
      />

      {/* Warm texture overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(ellipse at 30% 40%, rgba(200,135,63,0.3) 0%, transparent 60%),
                           radial-gradient(ellipse at 70% 70%, rgba(107,66,38,0.4) 0%, transparent 50%)`,
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C8873F]/20 border border-[#C8873F]/30 mb-6"
        >
          <span className="text-[#C8873F] text-sm font-medium tracking-wide">
            Port Harcourt&apos;s Warmest Cafe
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.15] mb-6"
        >
          Where Every Meal{" "}
          <span className="text-[#C8873F] italic">Feels Like</span>{" "}
          Home
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-white/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Artisanal coffee, wood-fired grills, and a cozy atmosphere where great food meets warm conversation. Open daily, come as you are.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/order"
            className="group flex items-center gap-2 px-8 py-3.5 bg-[#C8873F] hover:bg-[#B27532] text-white font-semibold rounded-full transition-colors w-full sm:w-auto justify-center"
          >
            <ShoppingBag className="w-5 h-5" aria-hidden="true" />
            Order Online
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
          <Link
            href="/reservations"
            className="group flex items-center gap-2 px-8 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full border border-white/20 transition-colors w-full sm:w-auto justify-center"
          >
            <Calendar className="w-5 h-5" aria-hidden="true" />
            Reserve a Table
          </Link>
        </motion.div>

        {/* Opening hours badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 inline-flex items-center gap-2 text-white/50 text-sm"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
          Open Daily · 8:00 AM – 10:00 PM
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FDF6EE] to-transparent"
        aria-hidden="true"
      />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-white/30 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
