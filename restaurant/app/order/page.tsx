"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Heart, Plus, ArrowRight } from "lucide-react";
import Footer from "@/components/footer/Footer";
import { MENU_CATEGORIES, DEMO_MENU_ITEMS } from "@/lib/data/menu";
import { useCartStore } from "@/lib/store/cartStore";
import { useFavoritesStore } from "@/lib/store/favoritesStore";
import { useToastStore } from "@/lib/store/toastStore";
import { formatCurrency } from "@/lib/data/demo";
import type { MenuItem } from "@/types";

export default function OrderPage() {
  const { addItem, openCart } = useCartStore();
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const { success } = useToastStore();

  const handleAdd = (item: MenuItem) => {
    addItem(item);
    success(`${item.name} added to cart`);
    openCart();
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDF6EE]">
      {/* Header */}
      <div className="bg-[#1C0D03] pt-28 pb-12 px-4 text-center">
        <span className="text-[#C8873F] text-sm font-medium uppercase tracking-widest">Order Online</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
          Order from Wood House Cafe
        </h1>
        <p className="text-white/60 max-w-xl mx-auto">
          Browse the menu, add items to your cart, and checkout for delivery or pickup.
        </p>
        {/* <p className="text-amber-400/70 text-xs mt-3 bg-amber-400/10 inline-block px-4 py-1.5 rounded-full">
          ⚠️ Demo prices — actual pricing will be confirmed when backend is live
        </p> */}

        {/* Cart CTA */}
        <div className="mt-6">
          <button
            onClick={openCart}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#C8873F] hover:bg-[#B27532] text-white rounded-full font-medium text-sm transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            View Cart
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 py-10 w-full">
        {MENU_CATEGORIES.map((category) => {
          const items = DEMO_MENU_ITEMS.filter((i) => i.category === category.id);
          if (items.length === 0) return null;
          return (
            <section key={category.id} className="mb-14" aria-labelledby={`cat-${category.id}`}>
              <div className="flex items-center justify-between mb-5">
                <h2 id={`cat-${category.id}`} className="font-serif text-2xl font-bold text-[#1A0A00]">
                  {category.emoji} {category.label}
                </h2>
                <Link
                  href={`/menu/${category.id}`}
                  className="text-[#C8873F] text-sm hover:underline flex items-center gap-1"
                >
                  See all <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {items.slice(0, 4).map((item, i) => (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="bg-white rounded-xl border border-[#E8D5BF] overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all"
                  >
                    {/* IMAGE: {item.imageLabel} */}
                    <div className="relative aspect-[4/3] bg-gradient-to-br from-[#E8C99A] to-[#C8873F] flex items-center justify-center">
                      <span className="text-3xl" aria-hidden="true">🍽️</span>
                      <button
                        onClick={() => toggleFavorite(item)}
                        className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center shadow"
                        aria-label={`${isFavorite(item.id) ? "Remove from" : "Add to"} favorites`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isFavorite(item.id) ? "fill-red-500 text-red-500" : "text-[#7A5C44]"}`} />
                      </button>
                      {!item.available && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <span className="text-white text-xs font-medium">Unavailable</span>
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-[#1A0A00] text-sm truncate mb-1">{item.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#C8873F] text-sm">{formatCurrency(item.price)}</span>
                        <button
                          onClick={() => handleAdd(item)}
                          disabled={!item.available}
                          className="flex items-center gap-1 px-2.5 py-1 bg-[#3B1A08] hover:bg-[#C8873F] text-white text-xs font-medium rounded-full transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <Plus className="w-3 h-3" />
                          Add
                        </button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <Footer />
    </div>
  );
}
