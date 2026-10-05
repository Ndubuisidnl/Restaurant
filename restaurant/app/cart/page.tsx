"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import Footer from "@/components/footer/Footer";
import { useCartStore } from "@/lib/store/cartStore";
import { formatCurrency } from "@/lib/data/demo";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, clearCart } = useCartStore();
  const subtotal = getSubtotal();

  return (
    <div className="flex flex-col min-h-screen bg-[#FDF6EE]">
      <div className="bg-[#1C0D03] pt-28 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl font-bold text-white mb-2">Your Cart</h1>
          <p className="text-white/60">
            {items.length === 0 ? "Your cart is empty." : `${items.reduce((s, i) => s + i.quantity, 0)} item(s) in your cart`}
          </p>
        </div>
      </div>

      <div className="flex-1 max-w-3xl mx-auto px-4 py-10 w-full">
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 bg-[#F5EBE0] rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-9 h-9 text-[#C8873F]/60" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-[#3B1A08] mb-3">Nothing here yet</h2>
            <p className="text-[#7A5C44] mb-6">Browse our menu and add something delicious!</p>
            <Link href="/menu" className="inline-flex items-center gap-2 px-6 py-3 bg-[#3B1A08] hover:bg-[#C8873F] text-white rounded-full font-medium transition-colors">
              Browse Menu <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.menuItem.id} className="bg-white border border-[#E8D5BF] rounded-xl p-4 flex gap-4">
                  {/* IMAGE: {item.menuItem.imageLabel} */}
                  <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-[#E8C99A] to-[#C8873F] flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🍽️</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-medium text-[#1A0A00] text-sm leading-snug">{item.menuItem.name}</h3>
                      <button onClick={() => removeItem(item.menuItem.id)} className="text-[#7A5C44] hover:text-red-500 transition-colors flex-shrink-0">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    {item.specialInstructions && (
                      <p className="text-[#7A5C44] text-xs italic mt-0.5">&ldquo;{item.specialInstructions}&rdquo;</p>
                    )}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 bg-[#FDF6EE] rounded-full px-2 py-1">
                        <button onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center text-[#7A5C44] hover:text-[#3B1A08]">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-semibold text-[#1A0A00] w-5 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center text-[#7A5C44] hover:text-[#3B1A08]">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-bold text-[#C8873F]">{formatCurrency(item.menuItem.price * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={clearCart} className="text-sm text-red-400 hover:text-red-600 transition-colors">
                Clear cart
              </button>
            </div>

            {/* Summary */}
            <div className="bg-white border border-[#E8D5BF] rounded-xl p-5 h-fit">
              <h2 className="font-serif text-lg font-semibold text-[#1A0A00] mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-[#7A5C44]">Subtotal</span>
                  <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#7A5C44]">Delivery fee</span>
                  <span className="text-[#7A5C44] text-xs">At checkout</span>
                </div>
                <div className="border-t border-[#E8D5BF] pt-2 flex justify-between font-semibold">
                  <span>Estimated Total</span>
                  <span className="text-[#C8873F]">{formatCurrency(subtotal)}</span>
                </div>
              </div>
              <Link
                href="/checkout"
                className="block w-full py-3 bg-[#3B1A08] hover:bg-[#C8873F] text-white text-center font-semibold rounded-xl transition-colors"
              >
                Proceed to Checkout
              </Link>
              <Link href="/menu" className="block w-full py-2.5 text-center text-[#3B1A08] text-sm mt-2 hover:text-[#C8873F] transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
