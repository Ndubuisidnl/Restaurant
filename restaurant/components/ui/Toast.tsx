"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";
import { useToastStore } from "@/lib/store/toastStore";
import type { ToastMessage } from "@/types";

// ============================================================
// TOAST COMPONENT — Global notification overlay
// ============================================================

function ToastItem({ toast }: { toast: ToastMessage }) {
  const removeToast = useToastStore((s) => s.removeToast);

  const config = {
    success: {
      icon: CheckCircle2,
      bg: "bg-[#1C0D03]",
      border: "border-emerald-500/40",
      icon_color: "text-emerald-400",
    },
    error: {
      icon: AlertCircle,
      bg: "bg-[#1C0D03]",
      border: "border-red-500/40",
      icon_color: "text-red-400",
    },
    info: {
      icon: Info,
      bg: "bg-[#1C0D03]",
      border: "border-[#C8873F]/40",
      icon_color: "text-[#C8873F]",
    },
    warning: {
      icon: AlertTriangle,
      bg: "bg-[#1C0D03]",
      border: "border-amber-500/40",
      icon_color: "text-amber-400",
    },
  }[toast.type];

  const Icon = config.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.96 }}
      className={`flex items-start gap-3 px-4 py-3 rounded-xl shadow-2xl border ${config.bg} ${config.border} max-w-sm w-full pointer-events-auto`}
      role="alert"
      aria-live="polite"
    >
      <Icon
        className={`w-5 h-5 mt-0.5 flex-shrink-0 ${config.icon_color}`}
        aria-hidden="true"
      />
      <p className="text-white/90 text-sm flex-1 leading-snug">{toast.message}</p>
      <button
        onClick={() => removeToast(toast.id)}
        className="text-white/40 hover:text-white/80 transition-colors flex-shrink-0"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" aria-hidden="true" />
      </button>
    </motion.div>
  );
}

export default function Toast() {
  const toasts = useToastStore((s) => s.toasts);

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="fixed top-20 right-4 z-[200] flex flex-col gap-2 pointer-events-none"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </div>
  );
}
