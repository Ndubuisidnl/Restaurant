"use client";

// ============================================================
// Supabase user details mirrored here for the existing customer profile UI.
// ============================================================

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthUIStore {
  isLoggedIn: boolean;
  userName: string;
  userEmail: string;

  setAuthenticatedUser: (name: string, email: string) => void;
  clearAuthenticatedUser: () => void;
}

export const useAuthUIStore = create<AuthUIStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      userName: "",
      userEmail: "",

      setAuthenticatedUser: (name, email) =>
        set({ isLoggedIn: true, userName: name, userEmail: email }),

      clearAuthenticatedUser: () =>
        set({
          isLoggedIn: false,
          userName: "",
          userEmail: "",
        }),
    }),
    {
      name: "woodhouse-auth-ui",
      skipHydration: true,
    }
  )
);
