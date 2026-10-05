"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
} from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";
import { formatCurrency } from "@/lib/data/demo";

// ============================================================
// CART DRAWER COMPONENT
// ============================================================

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getSubtotal,
    clearCart,
  } = useCartStore();

  const overlayRef = useRef<HTMLDivElement>(null);
  const subtotal = getSubtotal();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cart-backdrop"
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            key="cart-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-[110] w-full max-w-md bg-[#FFFDFC] flex flex-col shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8D5BF] bg-[#FDF6EE]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#C8873F]" aria-hidden="true" />
                <h2 className="font-serif text-lg font-semibold text-[#1A0A00]">
                  Your Cart
                </h2>
                {items.length > 0 && (
                  <span className="w-5 h-5 bg-[#C8873F] text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {items.reduce((sum, i) => sum + i.quantity, 0)}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-1.5 text-[#7A5C44] hover:text-[#1A0A00] transition-colors rounded-lg"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                /* EMPTY STATE */
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full px-8 text-center"
                >
                  <div className="w-20 h-20 bg-[#F5EBE0] rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="w-9 h-9 text-[#C8873F]/60" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-[#3B1A08] mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-[#7A5C44] text-sm mb-6">
                    Browse our menu and add something delicious!
                  </p>
                  <Link
                    href="/menu"
                    onClick={closeCart}
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#3B1A08] hover:bg-[#1C0D03] text-white rounded-full text-sm font-medium transition-colors"
                  >
                    Browse Menu
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </motion.div>
              ) : (
                <div className="py-3">
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <motion.div
                        key={item.menuItem.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, height: 0 }}
                        className="px-5 py-4 border-b border-[#E8D5BF]/50 last:border-0"
                      >
                        <div className="flex gap-3">
                          {/* Image Placeholder */}
                          {/* IMAGE: {item.menuItem.imageLabel} */}
                          <div
                            className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#E8C99A] to-[#C8873F] flex-shrink-0 flex items-center justify-center text-xl"
                            aria-hidden="true"
                          >
                            🍽️
                          </div>

                          {/* Item Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-medium text-[#1A0A00] text-sm leading-snug truncate pr-2">
                                {item.menuItem.name}
                              </h4>
                              <button
                                onClick={() => removeItem(item.menuItem.id)}
                                className="text-[#7A5C44] hover:text-red-500 transition-colors flex-shrink-0"
                                aria-label={`Remove ${item.menuItem.name} from cart`}
                              >
                                <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                              </button>
                            </div>

                            {item.specialInstructions && (
                              <p className="text-[#7A5C44] text-xs mt-0.5 italic">
                                &ldquo;{item.specialInstructions}&rdquo;
                              </p>
                            )}

                            <div className="flex items-center justify-between mt-2">
                              {/* Quantity Controls */}
                              <div className="flex items-center gap-2 bg-[#FDF6EE] rounded-full px-2 py-1">
                                <button
                                  onClick={() =>
                                    updateQuantity(item.menuItem.id, item.quantity - 1)
                                  }
                                  className="w-5 h-5 flex items-center justify-center text-[#7A5C44] hover:text-[#3B1A08] transition-colors"
                                  aria-label={`Decrease quantity of ${item.menuItem.name}`}
                                >
                                  <Minus className="w-3 h-3" aria-hidden="true" />
                                </button>
                                <span
                                  className="text-sm font-semibold text-[#1A0A00] w-4 text-center"
                                  aria-label={`Quantity: ${item.quantity}`}
                                >
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(item.menuItem.id, item.quantity + 1)
                                  }
                                  className="w-5 h-5 flex items-center justify-center text-[#7A5C44] hover:text-[#3B1A08] transition-colors"
                                  aria-label={`Increase quantity of ${item.menuItem.name}`}
                                >
                                  <Plus className="w-3 h-3" aria-hidden="true" />
                                </button>
                              </div>

                              {/* Price */}
                              <span className="text-sm font-semibold text-[#C8873F]">
                                {formatCurrency(item.menuItem.price * item.quantity)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer — Summary & Actions */}
            {items.length > 0 && (
              <div className="border-t border-[#E8D5BF] bg-[#FDF6EE] px-5 py-4 space-y-3">
                {/* Subtotal */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#7A5C44]">Subtotal</span>
                  <span className="font-semibold text-[#1A0A00]">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#7A5C44]">
                  <span>Delivery fee</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex items-center justify-between font-semibold text-base">
                  <span className="text-[#1A0A00]">Estimated Total</span>
                  <span className="text-[#C8873F]">{formatCurrency(subtotal)}</span>
                </div>

                {/* Actions */}
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full py-3 bg-[#3B1A08] hover:bg-[#1C0D03] text-white text-center font-semibold rounded-xl transition-colors"
                >
                  Proceed to Checkout
                </Link>
                <div className="flex gap-2">
                  <Link
                    href="/menu"
                    onClick={closeCart}
                    className="flex-1 py-2.5 text-center text-[#3B1A08] border border-[#3B1A08] rounded-xl text-sm font-medium hover:bg-[#3B1A08]/5 transition-colors"
                  >
                    Continue Shopping
                  </Link>
                  <button
                    onClick={clearCart}
                    className="px-3 py-2.5 text-[#7A5C44] hover:text-red-500 border border-[#E8D5BF] rounded-xl text-sm transition-colors"
                    aria-label="Clear all items from cart"
                  >
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
