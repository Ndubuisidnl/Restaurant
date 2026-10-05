"use client";

// ============================================================
// WOOD HOUSE CAFE — TOAST STORE (Zustand)
// Global toast notification state management.
// ============================================================

import { create } from "zustand";
import type { ToastMessage } from "@/types";

interface ToastStore {
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, "id">) => void;
  removeToast: (id: string) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
}

export const useToastStore = create<ToastStore>()((set, get) => ({
  toasts: [],

  addToast: (toast) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const newToast: ToastMessage = { ...toast, id };
    set((state) => ({ toasts: [...state.toasts, newToast] }));

    // Auto-remove after duration
    const duration = toast.duration ?? 4000;
    setTimeout(() => {
      get().removeToast(id);
    }, duration);
  },

  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },

  success: (message, duration) =>
    get().addToast({ type: "success", message, duration }),

  error: (message, duration) =>
    get().addToast({ type: "error", message, duration }),

  info: (message, duration) =>
    get().addToast({ type: "info", message, duration }),

  warning: (message, duration) =>
    get().addToast({ type: "warning", message, duration }),
}));
