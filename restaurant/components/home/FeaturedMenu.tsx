"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Plus, ShoppingBag, ArrowRight, Check } from "lucide-react";
import { fetchMenuItems } from "@/lib/data/menu-api";
import { useCartStore } from "@/lib/store/cartStore";
import { useFavoritesStore } from "@/lib/store/favoritesStore";
import { useToastStore } from "@/lib/store/toastStore";
import { formatCurrency } from "@/lib/data/demo";
import type { MenuItem } from "@/types";

// ============================================================
// FEATURED MENU SECTION
// ============================================================

export default function FeaturedMenu() {
  const [featuredItems, setFeaturedItems] = useState<MenuItem[]>([]);
  const { addItem, openCart } = useCartStore();
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const { success } = useToastStore();
  // Track which two-price item is showing the size picker: itemId -> selected price
  const [sizePicker, setSizePicker] = useState<Record<string, number | null>>({});

  useEffect(() => {
    let active = true;
    fetchMenuItems()
      .then((items) => { if (active) setFeaturedItems(items.filter((item) => item.featured).slice(0, 6)); })
      .catch((error) => console.error("Unable to load featured menu items", error));
    return () => { active = false; };
  }, []);

  const handleAddToCart = (item: MenuItem) => {
    if (item.priceSecondary) {
      // If no size selected yet, open the size picker
      if (sizePicker[item.id] === undefined || sizePicker[item.id] === null) {
        setSizePicker((prev) => ({ ...prev, [item.id]: null }));
        return;
      }
      // Size is selected — build a copy of the item with the chosen price
      const chosenPrice = sizePicker[item.id] as number;
      const itemWithPrice: MenuItem = { ...item, price: chosenPrice, priceSecondary: undefined, priceDisplay: undefined };
      addItem(itemWithPrice);
      success(`${item.name} (${formatCurrency(chosenPrice)}) added to cart`);
      setSizePicker((prev) => { const next = { ...prev }; delete next[item.id]; return next; });
    } else {
      addItem(item);
      success(`${item.name} added to cart`);
    }
    openCart();
  };

  const handleSizeSelect = (item: MenuItem, price: number) => {
    setSizePicker((prev) => ({ ...prev, [item.id]: price }));
  };

  return (
    <section className="py-20 lg:py-28 bg-[#FFFDFC]" aria-labelledby="featured-menu-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[#C8873F] text-sm font-medium uppercase tracking-widest">
            Our Menu
          </span>
          <h2
            id="featured-menu-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A0A00] mt-3 mb-4"
          >
            Customer Favourites
          </h2>
          <p className="text-[#7A5C44] max-w-xl mx-auto">
            A selection from our menu. explore more on the full menu page.
          </p>
          {/* <p className="text-[#7A5C44] text-xs mt-2 bg-[#FDF6EE] inline-block px-3 py-1 rounded-full">
            ⚠️ Demo data — prices and items will be updated with official information
          </p> */}
        </motion.div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredItems.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="bg-white rounded-2xl border border-[#E8D5BF] overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] bg-gradient-to-br from-[#E8C99A] to-[#C8873F] flex items-center justify-center overflow-hidden">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <span className="text-4xl" aria-hidden="true">🍽️</span>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                {/* Favorite button */}
                <button
                  onClick={() => toggleFavorite(item)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow hover:scale-110 transition-transform"
                  aria-label={
                    isFavorite(item.id)
                      ? `Remove ${item.name} from favorites`
                      : `Add ${item.name} to favorites`
                  }
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isFavorite(item.id)
                        ? "fill-red-500 text-red-500"
                        : "text-[#7A5C44]"
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {/* Tags */}
                <div className="absolute bottom-3 left-3 flex gap-1 flex-wrap">
                  {item.tags?.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-white/90 text-[#3B1A08] text-xs font-medium rounded-full capitalize"
                    >
                      {tag}
                    </span>
                  ))}
                  {!item.available && (
                    <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-medium rounded-full">
                      Unavailable
                    </span>
                  )}
                </div>

                {/* Image placeholder label (only if no image provided) */}
                {!item.image && (
                  <div className="absolute top-3 left-3 bg-[#1C0D03]/60 text-white/60 text-[9px] px-2 py-0.5 rounded">
                    IMAGE: {item.imageLabel}
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-4">
                <h3 className="font-serif font-semibold text-[#1A0A00] text-base leading-snug mb-1">
                  {item.name}
                </h3>
                <p className="text-[#7A5C44] text-xs leading-relaxed line-clamp-2 mb-3">
                  {item.description}
                </p>

                {/* Two-price size picker */}
                <AnimatePresence>
                  {item.priceSecondary && sizePicker[item.id] !== undefined && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-3 flex gap-2"
                    >
                      <button
                        onClick={() => handleSizeSelect(item, item.price)}
                        className={`flex-1 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                          sizePicker[item.id] === item.price
                            ? "bg-[#3B1A08] border-[#3B1A08] text-white"
                            : "border-[#E8D5BF] text-[#7A5C44] hover:border-[#3B1A08]"
                        }`}
                        aria-label={`Small size: ${formatCurrency(item.price)}`}
                      >
                        {formatCurrency(item.price)}
                      </button>
                      <button
                        onClick={() => handleSizeSelect(item, item.priceSecondary!)}
                        className={`flex-1 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                          sizePicker[item.id] === item.priceSecondary
                            ? "bg-[#3B1A08] border-[#3B1A08] text-white"
                            : "border-[#E8D5BF] text-[#7A5C44] hover:border-[#3B1A08]"
                        }`}
                        aria-label={`Large size: ${formatCurrency(item.priceSecondary!)}`}
                      >
                        {formatCurrency(item.priceSecondary!)}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#C8873F] text-base">
                      {item.priceDisplay ?? formatCurrency(item.price)}
                    </span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={!item.available}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-white text-xs font-medium rounded-full transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                      sizePicker[item.id] != null
                        ? "bg-[#C8873F] hover:bg-[#3B1A08]"
                        : "bg-[#3B1A08] hover:bg-[#C8873F]"
                    }`}
                    aria-label={`Add ${item.name} to cart`}
                  >
                    {sizePicker[item.id] != null ? (
                      <><Check className="w-3.5 h-3.5" aria-hidden="true" /> Add</>
                    ) : (
                      <><Plus className="w-3.5 h-3.5" aria-hidden="true" /> {item.priceSecondary ? "Select" : "Add"}</>
                    )}
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View Full Menu CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/menu"
            className="group inline-flex items-center gap-2 px-8 py-3.5 bg-[#3B1A08] hover:bg-[#C8873F] text-white font-semibold rounded-full transition-colors"
          >
            <ShoppingBag className="w-5 h-5" aria-hidden="true" />
            View Full Menu
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
