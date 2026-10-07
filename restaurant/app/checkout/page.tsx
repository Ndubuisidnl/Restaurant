"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle2, Truck, Store } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/footer/Footer";
import { checkoutSchema, type CheckoutSchema } from "@/lib/validations";
import { useCartStore } from "@/lib/store/cartStore";
import { formatCurrency } from "@/lib/data/demo";
import { createClient } from "@/lib/supabase/client";

export default function CheckoutPage() {
  const { items, getSubtotal, clearCart } = useCartStore();
  const [submitting, setSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [deliveryFee, setDeliveryFee] = useState<number | null>(null);
  const subtotal = getSubtotal();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CheckoutSchema>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { orderType: "delivery", paymentMethod: "pay-on-delivery" },
  });
  const orderType = useWatch({ control, name: "orderType" });
  const total = subtotal + (orderType === "delivery" ? deliveryFee || 0 : 0);

  useEffect(() => {
    let active = true;
    createClient().from("restaurant_settings").select("delivery_fee").eq("id", true).maybeSingle()
      .then(({ data, error }) => {
        if (error) { console.error("Unable to load delivery fee", error); return; }
        if (active) setDeliveryFee(data?.delivery_fee ?? null);
      });
    return () => { active = false; };
  }, []);

  const onSubmit = async (data: CheckoutSchema) => {
    setSubmitting(true);
    setSubmitError("");
    try {
      const supabase = createClient();
      const { data: orderResult, error } = await supabase.rpc("place_order", {
        p_full_name: data.fullName,
        p_email: data.email,
        p_phone: data.phone,
        p_order_type: data.orderType,
        p_delivery_address: data.deliveryAddress?.address || null,
        p_delivery_landmark: data.deliveryAddress?.landmark || null,
        p_payment_method: data.paymentMethod,
        p_general_note: data.generalNote || "",
        p_items: items.map((item) => ({
          menu_item_id: item.menuItem.id,
          quantity: item.quantity,
          special_instructions: item.specialInstructions || "",
        })),
      });
      if (error) throw error;
      const created = Array.isArray(orderResult) ? orderResult[0] : orderResult;
      if (!created?.order_id) throw new Error("The order was submitted but no confirmation number was returned.");
      setOrderNumber(created.order_number);
      clearCart();
      setOrderPlaced(true);
    } catch (error) {
      console.error("Order submission failed", error);
      setSubmitError(error instanceof Error ? error.message : "We couldn't place your order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FDF6EE]">
        <div className="flex-1 flex items-center justify-center px-4 pt-20 text-center">
          <div>
            <h2 className="font-serif text-3xl font-bold text-[#3B1A08] mb-3">Your cart is empty</h2>
            <p className="text-[#7A5C44] mb-6">Add some items before checking out.</p>
            <Link href="/menu" className="px-6 py-3 bg-[#3B1A08] text-white rounded-full hover:bg-[#C8873F] transition-colors font-medium">
              Browse Menu
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FDF6EE]">
        <div className="flex-1 flex items-center justify-center px-4 pt-20">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#1A0A00] mb-3">Order Placed!</h2>
            <p className="text-[#7A5C44] mb-2">Your order <strong>{orderNumber}</strong> has been saved. We will confirm it via WhatsApp shortly.</p>
            <Link href="/" className="mt-6 inline-block px-6 py-2.5 bg-[#3B1A08] text-white rounded-full hover:bg-[#C8873F] transition-colors font-medium">
              Back to Home
            </Link>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FDF6EE]">
      <div className="bg-[#1C0D03] pt-28 pb-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-serif text-4xl font-bold text-white mb-2">Checkout</h1>
          <p className="text-white/60">Review your order and complete your details.</p>
        </div>
      </div>

      <div className="flex-1 max-w-5xl mx-auto px-4 py-10 w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {submitError && <p role="alert" className="lg:col-span-3 text-red-600 text-sm bg-red-50 border border-red-200 px-4 py-3 rounded-lg">{submitError}</p>}
          {/* Left: Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Details */}
            <div className="bg-white border border-[#E8D5BF] rounded-2xl p-6">
              <h2 className="font-serif text-lg font-semibold text-[#1A0A00] mb-4">Contact Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-[#3B1A08] mb-1">Full Name *</label>
                  <input id="fullName" {...register("fullName")} className="w-full px-4 py-2.5 border border-[#E8D5BF] rounded-lg text-sm focus:outline-none focus:border-[#C8873F]" />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#3B1A08] mb-1">Phone *</label>
                  <input id="phone" type="tel" {...register("phone")} className="w-full px-4 py-2.5 border border-[#E8D5BF] rounded-lg text-sm focus:outline-none focus:border-[#C8873F]" />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-[#3B1A08] mb-1">Email *</label>
                  <input id="email" type="email" {...register("email")} className="w-full px-4 py-2.5 border border-[#E8D5BF] rounded-lg text-sm focus:outline-none focus:border-[#C8873F]" />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>
            </div>

            {/* Order Type */}
            <div className="bg-white border border-[#E8D5BF] rounded-2xl p-6">
              <h2 className="font-serif text-lg font-semibold text-[#1A0A00] mb-4">Order Type</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "delivery", label: "Delivery", icon: Truck, desc: "Delivered to your address" },
                  { value: "pickup", label: "Pickup", icon: Store, desc: "Pick up at the cafe" },
                ].map(({ value, label, icon: Icon, desc }) => {
                  const checked = orderType === value;
                  return (
                    <label key={value} className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${checked ? "border-[#C8873F] bg-[#C8873F]/5" : "border-[#E8D5BF] hover:border-[#C8873F]/40"}`}>
                      <input type="radio" {...register("orderType")} value={value} className="sr-only" />
                      <Icon className={`w-5 h-5 ${checked ? "text-[#C8873F]" : "text-[#7A5C44]"}`} />
                      <div>
                        <p className="font-medium text-sm text-[#1A0A00]">{label}</p>
                        <p className="text-xs text-[#7A5C44]">{desc}</p>
                      </div>
                    </label>
                  );
                })}
              </div>

              {orderType === "delivery" && (
                <div className="mt-4 space-y-3">
                  <div>
                    <label htmlFor="deliveryAddress.address" className="block text-sm font-medium text-[#3B1A08] mb-1">Delivery Address *</label>
                    <input id="deliveryAddress.address" {...register("deliveryAddress.address")} placeholder="Enter your full delivery address" className="w-full px-4 py-2.5 border border-[#E8D5BF] rounded-lg text-sm focus:outline-none focus:border-[#C8873F]" />
                    {errors.deliveryAddress?.address && <p className="text-red-500 text-xs mt-1">{errors.deliveryAddress.address.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="deliveryAddress.landmark" className="block text-sm font-medium text-[#3B1A08] mb-1">Landmark (optional)</label>
                    <input id="deliveryAddress.landmark" {...register("deliveryAddress.landmark")} placeholder="e.g. Near Total Filling Station" className="w-full px-4 py-2.5 border border-[#E8D5BF] rounded-lg text-sm focus:outline-none focus:border-[#C8873F]" />
                  </div>
                </div>
              )}
            </div>

            {/* Payment */}
            <div className="bg-white border border-[#E8D5BF] rounded-2xl p-6">
              <h2 className="font-serif text-lg font-semibold text-[#1A0A00] mb-4">Payment Method</h2>
              <div className="space-y-2">
                {[
                  { value: "pay-on-delivery", label: "Pay on Delivery" },
                  { value: "pay-on-pickup", label: "Pay on Pickup" },
                  { value: "pay-at-restaurant", label: "Pay at Restaurant" },
                ].map(({ value, label }) => (
                  <label key={value} className="flex items-center gap-3 p-3 border border-[#E8D5BF] rounded-lg cursor-pointer hover:border-[#C8873F]/40 transition-colors">
                    <input type="radio" {...register("paymentMethod")} value={value} className="accent-[#C8873F]" />
                    <span className="text-sm font-medium text-[#1A0A00]">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Note */}
            <div className="bg-white border border-[#E8D5BF] rounded-2xl p-6">
              <label htmlFor="generalNote" className="block text-sm font-medium text-[#3B1A08] mb-2">Order Note (optional)</label>
              <textarea id="generalNote" {...register("generalNote")} rows={3} placeholder="Any notes for your order..." className="w-full px-4 py-2.5 border border-[#E8D5BF] rounded-lg text-sm focus:outline-none focus:border-[#C8873F] resize-none" />
            </div>
          </div>

          {/* Right: Summary */}
          <div className="bg-white border border-[#E8D5BF] rounded-2xl p-5 h-fit sticky top-24">
            <h2 className="font-serif text-lg font-semibold text-[#1A0A00] mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
              {items.map((item) => (
                <div key={item.menuItem.id} className="flex justify-between text-sm">
                  <span className="text-[#7A5C44] truncate flex-1 pr-2">{item.menuItem.name} ×{item.quantity}</span>
                  <span className="font-medium text-[#1A0A00] flex-shrink-0">{formatCurrency(item.menuItem.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#E8D5BF] pt-3 space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-[#7A5C44]">Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#7A5C44]">Delivery</span>
                <span className="text-[#7A5C44] text-xs">{orderType === "pickup" ? "Free (pickup)" : deliveryFee === null ? "To be confirmed" : deliveryFee === 0 ? "Free" : formatCurrency(deliveryFee)}</span>
              </div>
              <div className="flex justify-between font-bold text-base pt-1">
                <span>Total</span>
                <span className="text-[#C8873F]">{formatCurrency(total)}</span>
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-4 py-3.5 bg-[#3B1A08] hover:bg-[#C8873F] text-white font-semibold rounded-xl transition-colors disabled:opacity-60"
            >
              {submitting ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}
