"use client";

// ============================================================
// WOOD HOUSE CAFE — FAVORITES STORE (Zustand)
// Frontend-only favorites state management.
//
// SUPABASE: FUTURE BACKEND INTEGRATION - CUSTOMER FAVORITES
// When the backend phase begins, favorites will be persisted
// to the Supabase favorites table linked to the customer profile.
// ============================================================

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MenuItem } from "@/types";

interface FavoritesStore {
  favorites: MenuItem[];
  addFavorite: (item: MenuItem) => void;
  removeFavorite: (menuItemId: string) => void;
  toggleFavorite: (item: MenuItem) => void;
  isFavorite: (menuItemId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (item) => {
        set((state) => {
          if (state.favorites.some((f) => f.id === item.id)) return state;
          return { favorites: [...state.favorites, item] };
        });
      },

      removeFavorite: (menuItemId) => {
        set((state) => ({
          favorites: state.favorites.filter((f) => f.id !== menuItemId),
        }));
      },

      toggleFavorite: (item) => {
        const { isFavorite, addFavorite, removeFavorite } = get();
        if (isFavorite(item.id)) {
          removeFavorite(item.id);
        } else {
          addFavorite(item);
        }
      },

      isFavorite: (menuItemId) => {
        return get().favorites.some((f) => f.id === menuItemId);
      },
    }),
    {
      name: "woodhouse-favorites",
    }
  )
);
