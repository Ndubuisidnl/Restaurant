"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowLeft, ChevronRight } from "lucide-react";
import Footer from "@/components/footer/Footer";
import { useAuthUIStore } from "@/lib/store/authUIStore";
import { DEMO_ORDERS, formatCurrency, formatOrderDate } from "@/lib/data/demo";

// SUPABASE: FUTURE BACKEND INTEGRATION - LOAD CUSTOMER ORDERS
// Replace DEMO_ORDERS with real data:
// const { data: orders } = await supabase.from('orders').select('*').eq('user_id', user.id).order('created_at', { ascending: false })

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  preparing: "bg-purple-100 text-purple-700",
  ready: "bg-green-100 text-green-700",
  collected: "bg-gray-100 text-gray-600",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-600",
};

export default function OrdersPage() {
  const { isDemoLoggedIn } = useAuthUIStore();

  if (!isDemoLoggedIn) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FDF6EE]">
        <div className="flex-1 flex items-center justify-center px-4 pt-20 text-center">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#3B1A08] mb-3">Login to view your orders</h2>
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
          <h1 className="font-serif text-4xl font-bold text-white">My Orders</h1>
          <p className="text-white/60 mt-1">{DEMO_ORDERS.length} order(s)</p>
        </div>
      </div>

      <div className="flex-1 max-w-3xl mx-auto px-4 py-8 w-full">
        {/* <p className="text-amber-600 text-xs bg-amber-50 border border-amber-200 px-4 py-2 rounded-lg mb-6">
          ⚠️ Demo data — real orders will appear here when backend is connected.
        </p> */}

        {DEMO_ORDERS.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-12 h-12 text-[#C8873F]/40 mx-auto mb-3" />
            <h2 className="font-serif text-xl text-[#3B1A08] mb-2">No orders yet</h2>
            <Link href="/menu" className="text-[#C8873F] hover:underline text-sm">Browse Menu →</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {DEMO_ORDERS.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white border border-[#E8D5BF] rounded-xl overflow-hidden"
              >
                <div className="p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <p className="font-semibold text-[#1A0A00] text-sm">{order.orderNumber}</p>
                      <p className="text-[#7A5C44] text-xs mt-0.5">{formatOrderDate(order.createdAt)}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${STATUS_STYLES[order.status] || "bg-gray-100 text-gray-600"}`}>
                      {order.status}
                    </span>
                  </div>

                  <div className="space-y-1 mb-3">
                    {order.items.map((item) => (
                      <div key={item.menuItem.id} className="flex justify-between text-sm">
                        <span className="text-[#7A5C44]">{item.menuItem.name} ×{item.quantity}</span>
                        <span className="text-[#1A0A00] font-medium">{formatCurrency(item.menuItem.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-[#E8D5BF] pt-3 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#7A5C44] capitalize">{order.orderType} · {order.paymentMethod.replace(/-/g, " ")}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#C8873F]">{formatCurrency(order.total)}</p>
                    </div>
                  </div>
                </div>
                <Link
                  href={`/profile/orders/${order.id}`}
                  className="flex items-center justify-center gap-1 py-2.5 bg-[#FDF6EE] border-t border-[#E8D5BF] text-[#3B1A08] text-xs font-medium hover:bg-[#F5EBE0] transition-colors"
                >
                  View Details <ChevronRight className="w-3 h-3" />
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
