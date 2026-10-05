"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { BUSINESS_INFO } from "@/lib/data/demo";

// ============================================================
// FLOATING WHATSAPP BUTTON
// Uses the confirmed Wood House Cafe business number.
// ============================================================

export default function FloatingWhatsAppButton() {
  const message = encodeURIComponent(
    "Hi Wood House Cafe! I'd like to make an enquiry."
  );
  const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${message}`;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 300, damping: 20 }}
      className="fixed bottom-6 right-4 sm:right-6 z-50"
    >
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white rounded-full shadow-lg shadow-black/30 transition-colors"
        aria-label="Chat with Wood House Cafe on WhatsApp"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Expanded label on hover */}
        <span className="overflow-hidden max-w-0 group-hover:max-w-[140px] transition-all duration-300 ease-in-out pl-0 group-hover:pl-4 text-sm font-medium whitespace-nowrap">
          Chat with us
        </span>

        <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">
          <MessageCircle className="w-7 h-7" aria-hidden="true" />
        </div>
      </motion.a>
    </motion.div>
  );
}
