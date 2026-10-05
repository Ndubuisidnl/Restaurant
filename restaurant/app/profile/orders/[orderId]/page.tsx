"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, CreditCard, Truck, Store } from "lucide-react";
import Footer from "@/components/footer/Footer";
import { DEMO_ORDERS, formatCurrency, formatOrderDate } from "@/lib/data/demo";

// SUPABASE: FUTURE BACKEND INTEGRATION - LOAD SINGLE ORDER
// const { data: order } = await supabase.from('orders').select('*').eq('id', orderId).single()

interface Props {
  params: Promise<{ orderId: string }>;
}

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  preparing: "bg-purple-100 text-purple-700",
  ready: "bg-green-100 text-green-700",
  collected: "bg-gray-100 text-gray-600",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-600",
};

export default function OrderDetailPage({ params }: Props) {
  const { orderId } = use(params);
  const order = DEMO_ORDERS.find((o) => o.id === orderId);

  if (!order) notFound();

  return (
    <div className="flex flex-col min-h-screen bg-[#FDF6EE]">
      <div className="bg-[#1C0D03] pt-28 pb-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Link href="/profile/orders" className="flex items-center gap-2 text-[#C8873F] text-sm mb-4 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Orders
          </Link>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h1 className="font-serif text-3xl font-bold text-white">{order.orderNumber}</h1>
              <p className="text-white/50 text-sm mt-1">{formatOrderDate(order.createdAt)}</p>
            </div>
            <span className={`px-3 py-1.5 rounded-full text-sm font-medium capitalize ${STATUS_STYLES[order.status] || "bg-gray-100 text-gray-600"}`}>
              {order.status}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-2xl mx-auto px-4 py-8 w-full space-y-5">
        {/* <p className="text-amber-600 text-xs bg-amber-50 border border-amber-200 px-4 py-2 rounded-lg">
          ⚠️ Demo data — this order exists only in demo mode.
        </p> */}

        {/* Items */}
        <div className="bg-white border border-[#E8D5BF] rounded-xl p-5">
          <h2 className="font-serif text-lg font-semibold text-[#1A0A00] mb-4">Order Items</h2>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.menuItem.id} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#E8C99A] to-[#C8873F] flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">🍽️</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-[#1A0A00] text-sm">{item.menuItem.name}</p>
                  {item.specialInstructions && (
                    <p className="text-[#7A5C44] text-xs italic">&ldquo;{item.specialInstructions}&rdquo;</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-[#1A0A00]">×{item.quantity}</p>
                  <p className="text-[#C8873F] text-sm font-bold">{formatCurrency(item.menuItem.price * item.quantity)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-[#E8D5BF] mt-4 pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#7A5C44]">Subtotal</span>
              <span>{formatCurrency(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#7A5C44]">Delivery Fee</span>
              <span>{order.deliveryFee === 0 ? "Free" : formatCurrency(order.deliveryFee)}</span>
            </div>
            <div className="flex justify-between font-bold text-base pt-1">
              <span>Total</span>
              <span className="text-[#C8873F]">{formatCurrency(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Order Info */}
        <div className="bg-white border border-[#E8D5BF] rounded-xl p-5">
          <h2 className="font-serif text-lg font-semibold text-[#1A0A00] mb-4">Order Details</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              {order.orderType === "delivery" ? <Truck className="w-4 h-4 text-[#C8873F]" /> : <Store className="w-4 h-4 text-[#C8873F]" />}
              <span className="text-[#7A5C44] capitalize">{order.orderType}</span>
            </div>
            {order.deliveryAddress && (
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C8873F] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[#7A5C44]">{order.deliveryAddress.address}</p>
                  {order.deliveryAddress.landmark && <p className="text-[#7A5C44] text-xs">{order.deliveryAddress.landmark}</p>}
                </div>
              </div>
            )}
            <div className="flex items-center gap-3">
              <CreditCard className="w-4 h-4 text-[#C8873F]" />
              <span className="text-[#7A5C44] capitalize">{order.paymentMethod.replace(/-/g, " ")}</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
