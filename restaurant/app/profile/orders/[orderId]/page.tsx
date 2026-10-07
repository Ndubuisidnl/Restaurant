"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, CreditCard, Truck, Store } from "lucide-react";
import Footer from "@/components/footer/Footer";
import { formatCurrency, formatOrderDate } from "@/lib/data/demo";
import { createClient } from "@/lib/supabase/client";

interface Props { params: Promise<{ orderId: string }> }
type Order = {
  id: string; order_number: string; order_type: string; payment_method: string; status: string;
  created_at: string; subtotal: number; delivery_fee: number | null; total: number;
  delivery_address: string | null; delivery_landmark: string | null;
  order_items: { id: string; item_name: string; unit_price: number; quantity: number; special_instructions: string }[];
};

const STATUS_STYLES: Record<string, string> = {
  received: "bg-amber-100 text-amber-700", pending: "bg-amber-100 text-amber-700", confirmed: "bg-blue-100 text-blue-700",
  preparing: "bg-purple-100 text-purple-700", ready: "bg-green-100 text-green-700", collected: "bg-gray-100 text-gray-600",
  delivered: "bg-emerald-100 text-emerald-700", cancelled: "bg-red-100 text-red-600",
};

export default function OrderDetailPage({ params }: Props) {
  const { orderId } = use(params);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        const { data, error } = await supabase.from("orders")
          .select("id,order_number,order_type,payment_method,status,created_at,subtotal,delivery_fee,total,delivery_address,delivery_landmark,order_items(id,item_name,unit_price,quantity,special_instructions)")
          .eq("id", orderId).maybeSingle();
        if (error) throw error;
        if (active && data) setOrder(data as Order);
      } catch (error) { console.error("Unable to load order", error); }
      finally { if (active) setLoading(false); }
    };
    void load();
    return () => { active = false; };
  }, [orderId]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-[#7A5C44]">Loading order…</div>;
  if (!order) return <div className="min-h-screen flex flex-col items-center justify-center text-center px-4"><h1 className="font-serif text-2xl text-[#3B1A08] mb-3">Order not found</h1><Link href="/profile/orders" className="text-[#C8873F] hover:underline">Back to orders</Link></div>;

  return <div className="flex flex-col min-h-screen bg-[#FDF6EE]">
    <div className="bg-[#1C0D03] pt-28 pb-12 px-4"><div className="max-w-2xl mx-auto"><Link href="/profile/orders" className="flex items-center gap-2 text-[#C8873F] text-sm mb-4 hover:text-white transition-colors"><ArrowLeft className="w-4 h-4" /> Back to Orders</Link><div className="flex items-start justify-between gap-2"><div><h1 className="font-serif text-3xl font-bold text-white">{order.order_number}</h1><p className="text-white/50 text-sm mt-1">{formatOrderDate(new Date(order.created_at))}</p></div><span className={`px-3 py-1.5 rounded-full text-sm font-medium capitalize ${STATUS_STYLES[order.status] || "bg-gray-100 text-gray-600"}`}>{order.status.replace(/-/g, " ")}</span></div></div></div>
    <div className="flex-1 max-w-2xl mx-auto px-4 py-8 w-full space-y-5"><div className="bg-white border border-[#E8D5BF] rounded-xl p-5"><h2 className="font-serif text-lg font-semibold text-[#1A0A00] mb-4">Order Items</h2><div className="space-y-3">{order.order_items.map((item) => <div key={item.id} className="flex items-center gap-3"><div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#E8C99A] to-[#C8873F] flex items-center justify-center flex-shrink-0"><span className="text-lg">🍽️</span></div><div className="flex-1"><p className="font-medium text-[#1A0A00] text-sm">{item.item_name}</p>{item.special_instructions && <p className="text-[#7A5C44] text-xs italic">&ldquo;{item.special_instructions}&rdquo;</p>}</div><div className="text-right"><p className="text-sm font-medium text-[#1A0A00]">×{item.quantity}</p><p className="text-[#C8873F] text-sm font-bold">{formatCurrency(item.unit_price * item.quantity)}</p></div></div>)}</div><div className="border-t border-[#E8D5BF] mt-4 pt-4 space-y-2"><div className="flex justify-between text-sm"><span className="text-[#7A5C44]">Subtotal</span><span>{formatCurrency(order.subtotal)}</span></div><div className="flex justify-between text-sm"><span className="text-[#7A5C44]">Delivery Fee</span><span>{order.delivery_fee === null ? "To be confirmed" : order.delivery_fee === 0 ? "Free" : formatCurrency(order.delivery_fee)}</span></div><div className="flex justify-between font-bold text-base pt-1"><span>Total</span><span className="text-[#C8873F]">{formatCurrency(order.total)}</span></div></div></div>
      <div className="bg-white border border-[#E8D5BF] rounded-xl p-5"><h2 className="font-serif text-lg font-semibold text-[#1A0A00] mb-4">Order Details</h2><div className="space-y-3 text-sm"><div className="flex items-center gap-3">{order.order_type === "delivery" ? <Truck className="w-4 h-4 text-[#C8873F]" /> : <Store className="w-4 h-4 text-[#C8873F]" />}<span className="text-[#7A5C44] capitalize">{order.order_type}</span></div>{order.delivery_address && <div className="flex items-start gap-3"><MapPin className="w-4 h-4 text-[#C8873F] mt-0.5 flex-shrink-0" /><div><p className="text-[#7A5C44]">{order.delivery_address}</p>{order.delivery_landmark && <p className="text-[#7A5C44] text-xs">{order.delivery_landmark}</p>}</div></div>}<div className="flex items-center gap-3"><CreditCard className="w-4 h-4 text-[#C8873F]" /><span className="text-[#7A5C44] capitalize">{order.payment_method.replace(/-/g, " ")}</span></div></div></div></div>
    <Footer />
  </div>;
}
