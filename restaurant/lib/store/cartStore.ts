"use client";

// ============================================================
// WOOD HOUSE CAFE — CART STORE (Zustand)
// Frontend-only cart state management using Zustand.
//
// SUPABASE: FUTURE BACKEND INTEGRATION - CART & ORDERS
// When the backend phase begins, cart state will be persisted
// to Supabase and orders will be created via Supabase RPC/API.
// ============================================================

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, MenuItem, DemoOrder, OrderType, PaymentMethod, CustomerDetails, DeliveryAddress } from "@/types";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;

  // Cart actions
  addItem: (menuItem: MenuItem, quantity?: number, specialInstructions?: string) => void;
  removeItem: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  updateSpecialInstructions: (menuItemId: string, instructions: string) => void;
  clearCart: () => void;

  // Drawer
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Computed
  getItemCount: () => number;
  getSubtotal: () => number;

  // Demo order state
  lastOrder: DemoOrder | null;
  setLastOrder: (order: DemoOrder) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      lastOrder: null,

      addItem: (menuItem, quantity = 1, specialInstructions = "") => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.menuItem.id === menuItem.id
          );

          if (existingIndex >= 0) {
            const updated = [...state.items];
            updated[existingIndex] = {
              ...updated[existingIndex],
              quantity: updated[existingIndex].quantity + quantity,
              specialInstructions:
                specialInstructions || updated[existingIndex].specialInstructions,
            };
            return { items: updated };
          }

          return {
            items: [
              ...state.items,
              {
                menuItem,
                quantity,
                specialInstructions: specialInstructions || undefined,
              },
            ],
          };
        });
      },

      removeItem: (menuItemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.menuItem.id !== menuItemId),
        }));
      },

      updateQuantity: (menuItemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(menuItemId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.menuItem.id === menuItemId ? { ...item, quantity } : item
          ),
        }));
      },

      updateSpecialInstructions: (menuItemId, instructions) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.menuItem.id === menuItemId
              ? { ...item, specialInstructions: instructions || undefined }
              : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      getItemCount: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),

      getSubtotal: () =>
        get().items.reduce(
          (total, item) => total + item.menuItem.price * item.quantity,
          0
        ),

      setLastOrder: (order) => set({ lastOrder: order }),
    }),
    {
      name: "woodhouse-cart",
      // Only persist items and lastOrder, not UI state
      partialize: (state) => ({
        items: state.items,
        lastOrder: state.lastOrder,
      }),
    }
  )
);
