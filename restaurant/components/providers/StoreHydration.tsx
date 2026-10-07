"use client";

import { useEffect } from "react";
import { useAuthUIStore } from "@/lib/store/authUIStore";
import { useCartStore } from "@/lib/store/cartStore";
import { useFavoritesStore } from "@/lib/store/favoritesStore";

export default function StoreHydration() {
  useEffect(() => {
    void Promise.all([
      useAuthUIStore.persist.rehydrate(),
      useCartStore.persist.rehydrate(),
      useFavoritesStore.persist.rehydrate(),
    ]);
  }, []);

  return null;
}
