"use client";

import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, Plus, X, SlidersHorizontal } from "lucide-react";
import Footer from "@/components/footer/Footer";
import { MENU_CATEGORIES } from "@/lib/data/menu";
import { fetchMenuItems } from "@/lib/data/menu-api";
import { useCartStore } from "@/lib/store/cartStore";
import { useFavoritesStore } from "@/lib/store/favoritesStore";
import { useToastStore } from "@/lib/store/toastStore";
import { formatCurrency } from "@/lib/data/demo";
import type { MenuCategory, MenuItem } from "@/types";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [menuError, setMenuError] = useState("");

  useEffect(() => {
    let active = true;
    fetchMenuItems()
      .then((items) => { if (active) setMenuItems(items); })
      .catch((error) => {
        console.error("Unable to load menu", error);
        if (active) setMenuError("The menu is temporarily unavailable. Please try again later.");
      });
    return () => { active = false; };
  }, []);

  const { addItem, openCart } = useCartStore();
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const { success } = useToastStore();

  const filteredItems = useMemo(() => {
    let items: MenuItem[];
    items = menuItems.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery = !query || item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) || item.category.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
    if (filterTag) {
      items = items.filter((i) => i.tags?.includes(filterTag));
    }
    return items;
  }, [menuItems, activeCategory, searchQuery, filterTag]);

  const handleAdd = (item: MenuItem) => {
    addItem(item);
    success(`${item.name} added to cart`);
    openCart();
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDF6EE]">
      {/* Hero Banner */}
      <div className="bg-[#1C0D03] pt-28 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-[#C8873F] text-sm font-medium uppercase tracking-widest">Our Menu</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
            What Would You Like Today?
          </h1>
          <p className="text-white/60 max-w-xl mx-auto text-base">
            Browse our full menu from artisanal coffee to hearty mains and decadent desserts.
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto mt-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              id="menu-search"
              type="search"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setActiveCategory("all"); }}
              className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-white/40 focus:outline-none focus:border-[#C8873F]/60 transition-colors text-sm"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="sticky top-16 z-30 bg-[#FFFDFC] border-b border-[#E8D5BF] shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            <button
              onClick={() => { setActiveCategory("all"); setSearchQuery(""); }}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeCategory === "all" && !searchQuery ? "bg-[#3B1A08] text-white" : "text-[#7A5C44] hover:text-[#3B1A08]"}`}
            >
              All
            </button>
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setSearchQuery(""); }}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeCategory === cat.id && !searchQuery ? "bg-[#3B1A08] text-white" : "text-[#7A5C44] hover:text-[#3B1A08]"}`}
              >
                <span>{cat.emoji}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Tags */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-2 flex-wrap">
        <SlidersHorizontal className="w-4 h-4 text-[#7A5C44]" />
        <span className="text-[#7A5C44] text-xs">Filter:</span>
        {["popular", "vegetarian", "spicy"].map((tag) => (
          <button
            key={tag}
            onClick={() => setFilterTag(filterTag === tag ? null : tag)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors capitalize ${filterTag === tag ? "bg-[#C8873F] text-white" : "bg-white border border-[#E8D5BF] text-[#7A5C44] hover:border-[#C8873F]"}`}
          >
            {tag}
          </button>
        ))}
        {filterTag && (
          <button onClick={() => setFilterTag(null)} className="text-xs text-red-400 hover:text-red-600 transition-colors">
            Clear
          </button>
        )}
      </div>

      {/* Menu Grid */}
      <div className="flex-1 max-w-7xl mx-auto px-4 pb-16 w-full">
        {filteredItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-serif text-2xl text-[#3B1A08] mb-2">{menuError ? "Menu unavailable" : menuItems.length ? "No items found" : "Our menu is being updated"}</p>
            <p className="text-[#7A5C44]">{menuError || (menuItems.length ? "Try a different category or search term." : "Please check back soon.")}</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredItems.map((item, i) => (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.04 }}
                  className="bg-white rounded-2xl border border-[#E8D5BF] overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
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
                      aria-label={isFavorite(item.id) ? `Remove ${item.name} from favorites` : `Add ${item.name} to favorites`}
                    >
                      <Heart className={`w-4 h-4 ${isFavorite(item.id) ? "fill-red-500 text-red-500" : "text-[#7A5C44]"}`} />
                    </button>
                    {item.tags && item.tags.length > 0 && (
                      <div className="absolute bottom-3 left-3 flex gap-1 z-10">
                        {item.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="px-2 py-0.5 bg-white/90 text-[#3B1A08] text-xs font-medium rounded-full capitalize">{tag}</span>
                        ))}
                      </div>
                    )}
                    {!item.available && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
                        <span className="text-white font-medium text-sm">Unavailable</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif font-semibold text-[#1A0A00] text-sm leading-snug mb-1">{item.name}</h3>
                    <p className="text-[#7A5C44] text-xs leading-relaxed line-clamp-2 mb-3">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#C8873F]">{formatCurrency(item.price)}</span>
                      <button
                        onClick={() => handleAdd(item)}
                        disabled={!item.available}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#3B1A08] hover:bg-[#C8873F] text-white text-xs font-medium rounded-full transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        aria-label={`Add ${item.name} to cart`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>

      <Footer />
    </div>
  );
}
