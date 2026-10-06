"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Plus, Check } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/footer/Footer";
import { MENU_CATEGORIES, getMenuItemsByCategory } from "@/lib/data/menu";
import { useCartStore } from "@/lib/store/cartStore";
import { useFavoritesStore } from "@/lib/store/favoritesStore";
import { useToastStore } from "@/lib/store/toastStore";
import { formatCurrency } from "@/lib/data/demo";
import type { MenuCategory, MenuItem } from "@/types";

interface Props {
  params: Promise<{ category: string }>;
}

export default function MenuCategoryPage({ params }: Props) {
  const { category } = use(params);

  const categoryData = MENU_CATEGORIES.find((c) => c.id === category);
  if (!categoryData) notFound();

  const items = getMenuItemsByCategory(category as MenuCategory);
  const { addItem, openCart } = useCartStore();
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const { success } = useToastStore();
  const [sizePicker, setSizePicker] = useState<Record<string, number | null>>({});

  const handleAdd = (item: MenuItem) => {
    if (item.priceSecondary) {
      if (sizePicker[item.id] === undefined || sizePicker[item.id] === null) {
        setSizePicker((prev) => ({ ...prev, [item.id]: null }));
        return;
      }
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
    <div className="flex flex-col min-h-screen bg-[#FDF6EE]">
      <div className="bg-[#1C0D03] pt-28 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/menu" className="text-[#C8873F] text-sm hover:text-white transition-colors mb-4 inline-block">
            ← Back to Menu
          </Link>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mt-2">
            {categoryData.emoji} {categoryData.label}
          </h1>
          <p className="text-white/50 mt-2">{items.length} items</p>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto px-4 py-10 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-white rounded-2xl border border-[#E8D5BF] overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] bg-gradient-to-br from-[#E8C99A] to-[#C8873F] flex items-center justify-center overflow-hidden">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <span className="text-4xl" aria-hidden="true">🍽️</span>
                )}
                <button
                  onClick={() => toggleFavorite(item)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow z-10"
                  aria-label={`${isFavorite(item.id) ? "Remove from" : "Add to"} favorites`}
                >
                  <Heart className={`w-4 h-4 ${isFavorite(item.id) ? "fill-red-500 text-red-500" : "text-[#7A5C44]"}`} />
                </button>
                {!item.available && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
                    <span className="text-white font-medium text-sm">Unavailable</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h2 className="font-serif font-semibold text-[#1A0A00] text-sm mb-1">{item.name}</h2>
                <p className="text-[#7A5C44] text-xs line-clamp-2 mb-3">{item.description}</p>

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
                      >
                        {formatCurrency(item.priceSecondary!)}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#C8873F]">
                    {item.priceDisplay ?? formatCurrency(item.price)}
                  </span>
                  <button
                    onClick={() => handleAdd(item)}
                    disabled={!item.available}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-white text-xs font-medium rounded-full transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                      sizePicker[item.id] != null
                        ? "bg-[#C8873F] hover:bg-[#3B1A08]"
                        : "bg-[#3B1A08] hover:bg-[#C8873F]"
                    }`}
                  >
                    {sizePicker[item.id] != null ? (
                      <><Check className="w-3.5 h-3.5" /> Add</>
                    ) : (
                      <><Plus className="w-3.5 h-3.5" /> {item.priceSecondary ? "Select" : "Add"}</>
                    )}
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
