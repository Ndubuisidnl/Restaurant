"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Plus, Trash2, ArrowLeft, Check } from "lucide-react";
import Footer from "@/components/footer/Footer";
import { useAuthUIStore } from "@/lib/store/authUIStore";
import { DEMO_SAVED_ADDRESSES } from "@/lib/data/demo";

// SUPABASE: FUTURE BACKEND INTEGRATION - MANAGE SAVED ADDRESSES
// const { data: addresses } = await supabase.from('addresses').select('*').eq('user_id', user.id)

export default function AddressesPage() {
  const { isDemoLoggedIn } = useAuthUIStore();

  if (!isDemoLoggedIn) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FDF6EE]">
        <div className="flex-1 flex items-center justify-center px-4 pt-20 text-center">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#3B1A08] mb-3">Login to manage addresses</h2>
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
        <div className="max-w-2xl mx-auto">
          <Link href="/profile" className="flex items-center gap-2 text-[#C8873F] text-sm mb-4 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Profile
          </Link>
          <h1 className="font-serif text-4xl font-bold text-white">Saved Addresses</h1>
          <p className="text-white/60 mt-1">Manage your delivery addresses</p>
        </div>
      </div>

      <div className="flex-1 max-w-2xl mx-auto px-4 py-8 w-full">
        {/* <p className="text-amber-600 text-xs bg-amber-50 border border-amber-200 px-4 py-2 rounded-lg mb-6">
          ⚠️ Demo data — addresses will sync to your account when backend is connected.
        </p> */}

        <div className="space-y-3 mb-5">
          {DEMO_SAVED_ADDRESSES.map((address, i) => (
            <motion.div
              key={address.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white border border-[#E8D5BF] rounded-xl p-4 flex items-start gap-4"
            >
              <div className="w-10 h-10 bg-[#C8873F]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-[#C8873F]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="font-semibold text-[#1A0A00] text-sm">{address.label}</p>
                  {address.isDefault && (
                    <span className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <Check className="w-3 h-3" /> Default
                    </span>
                  )}
                </div>
                <p className="text-[#7A5C44] text-sm">{address.address}</p>
                {address.landmark && <p className="text-[#7A5C44] text-xs mt-0.5">{address.landmark}</p>}
                <p className="text-[#7A5C44] text-xs mt-0.5">{address.city}</p>
              </div>
              <button
                className="text-[#7A5C44] hover:text-red-500 transition-colors flex-shrink-0"
                aria-label="Delete address (demo — no action)"
                title="Delete (demo — no backend action)"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        <button
          className="flex items-center gap-2 px-5 py-2.5 border-2 border-dashed border-[#E8D5BF] hover:border-[#C8873F] text-[#7A5C44] hover:text-[#C8873F] rounded-xl text-sm font-medium transition-colors w-full justify-center"
          onClick={() => alert("Add address form — coming when backend is connected")}
        >
          <Plus className="w-4 h-4" />
          Add New Address
        </button>
      </div>

      <Footer />
    </div>
  );
}
