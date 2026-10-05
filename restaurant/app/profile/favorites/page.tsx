"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Plus, ArrowLeft } from "lucide-react";
import Footer from "@/components/footer/Footer";
import { useAuthUIStore } from "@/lib/store/authUIStore";
import { useFavoritesStore } from "@/lib/store/favoritesStore";
import { useCartStore } from "@/lib/store/cartStore";
import { useToastStore } from "@/lib/store/toastStore";
import { formatCurrency } from "@/lib/data/demo";
import type { MenuItem } from "@/types";

// SUPABASE: FUTURE BACKEND INTEGRATION - LOAD SAVED FAVORITES
// In backend phase, favorites will be stored in Supabase and synced to user account.

export default function FavoritesPage() {
  const { isDemoLoggedIn } = useAuthUIStore();
  const { favorites, toggleFavorite } = useFavoritesStore();
  const { addItem, openCart } = useCartStore();
  const { success } = useToastStore();

  const handleAdd = (item: MenuItem) => {
    addItem(item);
    success(`${item.name} added to cart`);
    openCart();
  };

  if (!isDemoLoggedIn) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FDF6EE]">
        <div className="flex-1 flex items-center justify-center px-4 pt-20 text-center">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#3B1A08] mb-3">Login to view your favorites</h2>
            <Link href="/auth/login" className="px-6 py-3 bg-[#3B1A08] text-white rounded-full hover:bg-[#C8873F] transition-colors font-medium inline-block">Login</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FDF6EE]">
      <div className="bg-[#1C0D03] pt-28 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/profile" className="flex items-center gap-2 text-[#C8873F] text-sm mb-4 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Profile
          </Link>
          <h1 className="font-serif text-4xl font-bold text-white">My Favorites</h1>
          <p className="text-white/60 mt-1">{favorites.length} item{favorites.length !== 1 ? "s" : ""} saved</p>
        </div>
      </div>

      <div className="flex-1 max-w-3xl mx-auto px-4 py-8 w-full">
        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-[#FDF6EE] border-2 border-dashed border-[#E8D5BF] rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-[#C8873F]/40" />
            </div>
            <h2 className="font-serif text-xl text-[#3B1A08] mb-2">No favorites yet</h2>
            <p className="text-[#7A5C44] text-sm mb-5">Browse the menu and tap the heart icon to save items.</p>
            <Link href="/menu" className="inline-flex items-center gap-2 px-6 py-3 bg-[#3B1A08] hover:bg-[#C8873F] text-white rounded-full font-medium transition-colors">
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {favorites.map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="bg-white border border-[#E8D5BF] rounded-xl overflow-hidden"
              >
                {/* IMAGE: {item.imageLabel} */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-[#E8C99A] to-[#C8873F] flex items-center justify-center">
                  <span className="text-3xl">🍽️</span>
                  <button
                    onClick={() => toggleFavorite(item)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow"
                    aria-label={`Remove ${item.name} from favorites`}
                  >
                    <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-[#1A0A00] text-sm mb-1">{item.name}</h3>
                  <p className="text-[#7A5C44] text-xs line-clamp-2 mb-3">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#C8873F]">{formatCurrency(item.price)}</span>
                    <button
                      onClick={() => handleAdd(item)}
                      disabled={!item.available}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#3B1A08] hover:bg-[#C8873F] text-white text-xs font-medium rounded-full transition-colors disabled:opacity-40"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
