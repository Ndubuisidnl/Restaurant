"use client";

// ============================================================
// WOOD HOUSE CAFE — AUTH UI STORE (Zustand)
// Frontend-only auth UI state (no real authentication).
//
// SUPABASE: FUTURE BACKEND INTEGRATION - CUSTOMER AUTHENTICATION
// This store manages only frontend UI state (e.g. showing logged-in nav).
// In the backend phase, this will be replaced by Supabase Auth session state.
// ============================================================

import { create } from "zustand";
import { persist } from "zustand/middleware";

// Demo auth UI state — frontend only
interface AuthUIStore {
  // Whether to show logged-in UI (demo toggle — not real auth)
  isDemoLoggedIn: boolean;
  demoUserName: string;
  demoUserEmail: string;

  // UI actions
  demoLogin: (name: string, email: string) => void;
  demoLogout: () => void;
}

export const useAuthUIStore = create<AuthUIStore>()(
  persist(
    (set) => ({
      isDemoLoggedIn: false,
      demoUserName: "",
      demoUserEmail: "",

      demoLogin: (name, email) =>
        set({ isDemoLoggedIn: true, demoUserName: name, demoUserEmail: email }),

      demoLogout: () =>
        set({
          isDemoLoggedIn: false,
          demoUserName: "",
          demoUserEmail: "",
        }),
    }),
    {
      name: "woodhouse-auth-ui",
    }
  )
);
