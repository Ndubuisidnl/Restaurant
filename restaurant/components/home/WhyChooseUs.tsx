"use client";

import { motion } from "framer-motion";
import {
  Coffee,
  Utensils,
  Wifi,
  Trees,
  BookOpen,
  Truck,
  CalendarCheck,
  Sun,
} from "lucide-react";

// ============================================================
// WHY CHOOSE US / EXPERIENCE ATTRIBUTES
// Based on publicly documented services only.
// ============================================================

const ATTRIBUTES = [
  {
    icon: Coffee,
    title: "Artisanal Coffee",
    description:
      "From rich espresso shots to creamy lattes and cold brews, our coffee is brewed with care for every cup.",
  },
  {
    icon: Utensils,
    title: "Hearty Meals",
    description:
      "Breakfast, lunch, and dinner crafted with quality ingredients. A full menu for every appetite and occasion.",
  },
  {
    icon: Trees,
    title: "Outdoor Seating",
    description:
      "Enjoy your meal under the open sky in our comfortable outdoor seating area. Perfect for relaxed dining.",
  },
  {
    icon: Wifi,
    title: "Free Wi-Fi",
    description:
      "Stay connected while you dine. Our fast, free Wi-Fi makes Wood House Cafe the ideal remote work spot.",
  },
  {
    icon: BookOpen,
    title: "Games & Books",
    description:
      "Unwind with our in-house game collection and reading corner. A cozy corner for every kind of hangout.",
  },
  {
    icon: Truck,
    title: "Delivery & Takeaway",
    description:
      "Can't make it in? We bring Wood House Cafe to you. Order online for delivery or pickup.",
  },
  {
    icon: CalendarCheck,
    title: "Reservations",
    description:
      "Planning a gathering or special occasion? Reserve your table ahead of time for a seamless experience.",
  },
  {
    icon: Sun,
    title: "Open Every Day",
    description:
      "We open our doors every single day From 8:00 AM to 10:00 PM. Your comfort is always our priority.",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      className="py-20 lg:py-28 bg-[#3B1A08]"
      aria-labelledby="why-us-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-[#C8873F] text-sm font-medium uppercase tracking-widest">
            The Experience
          </span>
          <h2
            id="why-us-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 mb-4"
          >
            More Than Just a Meal
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Wood House Cafe is a full experience from your first sip of coffee to your last bite, every visit is designed to feel like home.
          </p>
        </motion.div>

        {/* Attributes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ATTRIBUTES.map((attr, index) => {
            const Icon = attr.icon;
            return (
              <motion.div
                key={attr.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="group p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#C8873F]/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#C8873F]/20 flex items-center justify-center mb-4 group-hover:bg-[#C8873F]/30 transition-colors">
                  <Icon className="w-6 h-6 text-[#C8873F]" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-white font-semibold text-base mb-2">
                  {attr.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {attr.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
