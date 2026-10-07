"use client";

// ============================================================
// Customer favorites are synchronized with Supabase and cached for UI state.
// ============================================================

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MenuItem } from "@/types";
import { createClient } from "@/lib/supabase/client";
import { mapMenuRow } from "@/lib/data/menu-api";
import { useToastStore } from "@/lib/store/toastStore";

interface FavoritesStore {
  favorites: MenuItem[];
  addFavorite: (item: MenuItem) => void;
  removeFavorite: (menuItemId: string) => void;
  toggleFavorite: (item: MenuItem) => void;
  syncFavorites: (userId: string | null) => Promise<void>;
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
        void (async () => {
          try {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
              useToastStore.getState().info("Log in to save items to your favorites.");
              return;
            }
            if (isFavorite(item.id)) {
              const { error } = await supabase.from("favorites").delete().eq("menu_item_id", item.id).eq("user_id", user.id);
              if (error) throw error;
              removeFavorite(item.id);
            } else {
              const { error } = await supabase.from("favorites").insert({ user_id: user.id, menu_item_id: item.id });
              if (error) throw error;
              addFavorite(item);
            }
          } catch (error) {
            console.error("Unable to update favorite", error);
            useToastStore.getState().error("We couldn't update your favorites. Please try again.");
          }
        })();
      },

      syncFavorites: async (userId) => {
        if (!userId) { set({ favorites: [] }); return; }
        try {
          const { data, error } = await createClient().from("favorites")
            .select("menu_items(id,name,description,price,category,image,image_label,available,featured,tags,preparation_time)")
            .eq("user_id", userId);
          if (error) throw error;
          const rows = (data || []) as unknown as { menu_items: Parameters<typeof mapMenuRow>[0] | null }[];
          set({ favorites: rows.flatMap((row) => row.menu_items ? [mapMenuRow(row.menu_items)] : []) });
        } catch (error) { console.error("Unable to load saved favorites", error); }
      },

      isFavorite: (menuItemId) => {
        return get().favorites.some((f) => f.id === menuItemId);
      },
    }),
    {
      name: "woodhouse-favorites",
      skipHydration: true,
    }
  )
);
