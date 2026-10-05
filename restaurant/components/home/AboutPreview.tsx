"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// ============================================================
// ABOUT PREVIEW SECTION
// ============================================================

export default function AboutPreview() {
  return (
    <section className="py-20 lg:py-28 bg-[#FDF6EE]" aria-labelledby="about-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* IMAGE: WOOD HOUSE CAFE INTERIOR */}
            <div
              className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-[#E8C99A] to-[#C8873F] flex items-end p-6 overflow-hidden relative"
            >
              <Image
                src="/images/WOOD HOUSE CAFE INTERIOR.jpg"
                alt="Wood House Cafe interior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C0D03]/70 via-transparent to-transparent" />
              <div className="relative z-10 text-white">
                <p className="font-serif text-lg font-semibold">Wood House Cafe</p>
                <p className="text-white/70 text-sm">3 Louis Drive, Port Harcourt</p>
              </div>
            </div>

            {/* Floating accent card */}
            <div className="absolute -bottom-6 -right-6 hidden sm:block bg-[#3B1A08] text-white px-6 py-4 rounded-xl shadow-xl">
              <p className="text-[#C8873F] text-xs uppercase tracking-wider mb-1">Open Daily</p>
              <p className="font-serif text-base font-semibold">8:00 AM – 10:00 PM</p>
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="text-[#C8873F] text-sm font-medium uppercase tracking-widest">
              Our Story
            </span>
            <h2
              id="about-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A0A00] mt-3 mb-6 leading-tight"
            >
              A Cozy Corner in the Heart of Port Harcourt
            </h2>
            <p className="text-[#7A5C44] text-base leading-relaxed mb-5">
              Wood House Cafe is more than just a place to eat, it&apos;s a warm refuge where great coffee, hearty meals, and good company come together. Located in the GRA area of Port Harcourt, we&apos;re your everyday destination for breakfast, lunch, dinner, and everything in between.
            </p>
            <p className="text-[#7A5C44] text-base leading-relaxed mb-8">
              From artisanal coffee and wood-fired grills to decadent waffles and refreshing drinks, every dish is prepared with care. Whether you&apos;re catching up with friends, working remotely, or celebrating a special moment. You&apos;re always welcome here.
            </p>

            {/* Services grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                "Breakfast & Brunch",
                "Artisanal Coffee",
                "Wood-Fired Grills",
                "Delivery & Takeaway",
                "Outdoor Seating",
                "Wi-Fi & Games",
              ].map((service) => (
                <div key={service} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C8873F] flex-shrink-0" aria-hidden="true" />
                  <span className="text-[#6B4226] text-sm">{service}</span>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="group inline-flex items-center gap-2 text-[#3B1A08] font-semibold hover:text-[#C8873F] transition-colors"
            >
              Learn More About Us
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
