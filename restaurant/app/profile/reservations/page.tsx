"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarCheck, ArrowLeft, Users, Clock } from "lucide-react";
import Footer from "@/components/footer/Footer";
import { useAuthUIStore } from "@/lib/store/authUIStore";
import { DEMO_RESERVATIONS, formatDate, formatTime } from "@/lib/data/demo";

// SUPABASE: FUTURE BACKEND INTEGRATION - LOAD CUSTOMER RESERVATIONS
// const { data: reservations } = await supabase.from('reservations').select('*').eq('user_id', user.id)

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  completed: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-600",
};

export default function ReservationsProfilePage() {
  const { isDemoLoggedIn } = useAuthUIStore();

  if (!isDemoLoggedIn) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FDF6EE]">
        <div className="flex-1 flex items-center justify-center px-4 pt-20 text-center">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#3B1A08] mb-3">Login to view your reservations</h2>
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
          <h1 className="font-serif text-4xl font-bold text-white">My Reservations</h1>
          <p className="text-white/60 mt-1">{DEMO_RESERVATIONS.length} reservation(s)</p>
        </div>
      </div>

      <div className="flex-1 max-w-3xl mx-auto px-4 py-8 w-full">
        {/* <p className="text-amber-600 text-xs bg-amber-50 border border-amber-200 px-4 py-2 rounded-lg mb-6">
          ⚠️ Demo data — real reservations will appear here when backend is connected.
        </p> */}

        <div className="mb-5">
          <Link href="/reservations" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#3B1A08] hover:bg-[#C8873F] text-white text-sm font-medium rounded-full transition-colors">
            <CalendarCheck className="w-4 h-4" />
            Book a New Table
          </Link>
        </div>

        {DEMO_RESERVATIONS.length === 0 ? (
          <div className="text-center py-16">
            <CalendarCheck className="w-12 h-12 text-[#C8873F]/40 mx-auto mb-3" />
            <h2 className="font-serif text-xl text-[#3B1A08] mb-2">No reservations yet</h2>
            <Link href="/reservations" className="text-[#C8873F] hover:underline text-sm">Book a Table →</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {DEMO_RESERVATIONS.map((reservation, i) => (
              <motion.div
                key={reservation.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white border border-[#E8D5BF] rounded-xl p-5"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <p className="font-serif font-semibold text-[#1A0A00]">{formatDate(reservation.date)}</p>
                    <div className="flex items-center gap-3 mt-1 text-sm text-[#7A5C44]">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{formatTime(reservation.time)}</span>
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{reservation.guestCount} guest{reservation.guestCount !== 1 ? "s" : ""}</span>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${STATUS_STYLES[reservation.status] || "bg-gray-100 text-gray-600"}`}>
                    {reservation.status}
                  </span>
                </div>
                {reservation.occasion !== "none" && reservation.occasion && (
                  <p className="text-[#7A5C44] text-xs capitalize">Occasion: {reservation.occasion.replace(/-/g, " ")}</p>
                )}
                {reservation.specialRequests && (
                  <p className="text-[#7A5C44] text-xs italic mt-1">&ldquo;{reservation.specialRequests}&rdquo;</p>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
