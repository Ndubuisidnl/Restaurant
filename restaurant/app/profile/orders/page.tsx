"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowLeft, ChevronRight } from "lucide-react";
import Footer from "@/components/footer/Footer";
import { useAuthUIStore } from "@/lib/store/authUIStore";
import { formatCurrency, formatOrderDate } from "@/lib/data/demo";
import { createClient } from "@/lib/supabase/client";

type Order = {
  id: string;
  order_number: string;
  order_type: string;
  payment_method: string;
  status: string;
  total: number;
  created_at: string;
  order_items: { id: string; item_name: string; unit_price: number; quantity: number }[];
};

const STATUS_STYLES: Record<string, string> = {
  received: "bg-amber-100 text-amber-700", pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700", preparing: "bg-purple-100 text-purple-700",
  ready: "bg-green-100 text-green-700", collected: "bg-gray-100 text-gray-600",
  delivered: "bg-emerald-100 text-emerald-700", cancelled: "bg-red-100 text-red-600",
};

export default function OrdersPage() {
  const { isLoggedIn } = useAuthUIStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        const { data, error: queryError } = await supabase
          .from("orders")
          .select("id,order_number,order_type,payment_method,status,total,created_at,order_items(id,item_name,unit_price,quantity)")
          .order("created_at", { ascending: false });
        if (queryError) throw queryError;
        if (active) setOrders((data || []) as Order[]);
      } catch (loadError) {
        console.error("Unable to load orders", loadError);
        if (active) setError("We couldn't load your orders. Please try again.");
      } finally {
        if (active) setLoading(false);
      }
    };
    void load();
    return () => { active = false; };
  }, []);

  if (!isLoggedIn) return (
    <div className="flex flex-col min-h-screen bg-[#FDF6EE]"><div className="flex-1 flex items-center justify-center px-4 pt-20 text-center"><div><h2 className="font-serif text-2xl font-bold text-[#3B1A08] mb-3">Login to view your orders</h2><Link href="/auth/login" className="px-6 py-3 bg-[#3B1A08] text-white rounded-full hover:bg-[#C8873F] transition-colors font-medium inline-block">Login</Link></div></div><Footer /></div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#FDF6EE]">
      <div className="bg-[#1C0D03] pt-28 pb-12 px-4"><div className="max-w-3xl mx-auto"><Link href="/profile" className="flex items-center gap-2 text-[#C8873F] text-sm mb-4 hover:text-white transition-colors"><ArrowLeft className="w-4 h-4" /> Back to Profile</Link><h1 className="font-serif text-4xl font-bold text-white">My Orders</h1><p className="text-white/60 mt-1">{orders.length} order(s)</p></div></div>
      <div className="flex-1 max-w-3xl mx-auto px-4 py-8 w-full">
        {error && <p role="alert" className="text-red-600 text-sm bg-red-50 border border-red-200 px-4 py-3 rounded-lg">{error}</p>}
        {loading ? <p className="text-center py-16 text-[#7A5C44]">Loading your orders…</p> : !error && orders.length === 0 ? <div className="text-center py-16"><ShoppingBag className="w-12 h-12 text-[#C8873F]/40 mx-auto mb-3" /><h2 className="font-serif text-xl text-[#3B1A08] mb-2">No orders yet</h2><Link href="/menu" className="text-[#C8873F] hover:underline text-sm">Browse Menu →</Link></div> : (
          <div className="space-y-4">{orders.map((order, i) => <motion.div key={order.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white border border-[#E8D5BF] rounded-xl overflow-hidden"><div className="p-4 sm:p-5"><div className="flex items-start justify-between gap-2 mb-3"><div><p className="font-semibold text-[#1A0A00] text-sm">{order.order_number}</p><p className="text-[#7A5C44] text-xs mt-0.5">{formatOrderDate(new Date(order.created_at))}</p></div><span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${STATUS_STYLES[order.status] || "bg-gray-100 text-gray-600"}`}>{order.status.replace(/-/g, " ")}</span></div><div className="space-y-1 mb-3">{order.order_items.map((item) => <div key={item.id} className="flex justify-between text-sm"><span className="text-[#7A5C44]">{item.item_name} ×{item.quantity}</span><span className="text-[#1A0A00] font-medium">{formatCurrency(item.unit_price * item.quantity)}</span></div>)}</div><div className="border-t border-[#E8D5BF] pt-3 flex items-center justify-between"><span className="text-xs text-[#7A5C44] capitalize">{order.order_type} · {order.payment_method.replace(/-/g, " ")}</span><span className="font-bold text-[#C8873F]">{formatCurrency(order.total)}</span></div></div><Link href={`/profile/orders/${order.id}`} className="flex items-center justify-center gap-1 py-2.5 bg-[#FDF6EE] border-t border-[#E8D5BF] text-[#3B1A08] text-xs font-medium hover:bg-[#F5EBE0] transition-colors">View Details <ChevronRight className="w-3 h-3" /></Link></motion.div>)}</div>
        )}
      </div><Footer />
    </div>
  );
}
