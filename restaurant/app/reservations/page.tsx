"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CalendarCheck, Clock, Users, ChevronDown, CheckCircle2 } from "lucide-react";
import Footer from "@/components/footer/Footer";
import { reservationSchema, type ReservationSchema } from "@/lib/validations";
import { RESERVATION_TIMES, formatTime, BUSINESS_INFO } from "@/lib/data/demo";
import type { Metadata } from "next";

// SUPABASE: FUTURE BACKEND INTEGRATION - RESERVATION SUBMISSION
// Replace handleSubmit logic with a real Supabase insert to the reservations table.

const OCCASIONS = [
  { value: "none", label: "No special occasion" },
  { value: "birthday", label: "🎂 Birthday" },
  { value: "anniversary", label: "💑 Anniversary" },
  { value: "date", label: "❤️ Date Night" },
  { value: "business-meeting", label: "💼 Business Meeting" },
  { value: "family-gathering", label: "👨‍👩‍👧‍👦 Family Gathering" },
  { value: "other", label: "✨ Other" },
];

export default function ReservationsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ReservationSchema>({
    resolver: zodResolver(reservationSchema),
    defaultValues: { guestCount: 2, occasion: "none" },
  });

  const onSubmit = async (data: ReservationSchema) => {
    setSubmitting(true);
    // SUPABASE: FUTURE BACKEND INTEGRATION - INSERT RESERVATION
    // await supabase.from('reservations').insert({ ...data, status: 'pending' })
    console.log("Reservation (demo):", data);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
  };

  const todayStr = new Date().toISOString().split("T")[0];

  if (submitted) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FDF6EE]">
        <div className="flex-1 flex items-center justify-center px-4 pt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md"
          >
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#1A0A00] mb-3">Reservation Received!</h2>
            <p className="text-[#7A5C44] mb-2">
              Thank you! We&apos;ve received your reservation request. Our team will confirm via WhatsApp or phone.
            </p>
            <p className="text-[#7A5C44] text-sm mb-8">
              For faster confirmation, reach us at{" "}
              <a href={`https://wa.me/${BUSINESS_INFO.whatsapp}`} className="text-[#C8873F] hover:underline" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>.
            </p>
            <p className="text-amber-600 text-xs bg-amber-50 border border-amber-200 px-4 py-2 rounded-lg">
              ⚠️ Demo mode — no actual reservation was made. Backend coming soon.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 px-6 py-2.5 bg-[#3B1A08] text-white rounded-full text-sm font-medium hover:bg-[#C8873F] transition-colors"
            >
              Make Another Reservation
            </button>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FDF6EE]">
      {/* Header */}
      <div className="bg-[#1C0D03] pt-28 pb-12 px-4 text-center">
        <span className="text-[#C8873F] text-sm font-medium uppercase tracking-widest">Book a Table</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
          Reserve Your Spot
        </h1>
        <p className="text-white/60 max-w-xl mx-auto">
          Plan your visit ahead. Fill in the form below and our team will confirm your reservation.
        </p>
        {/* <p className="text-amber-400/70 text-xs mt-3 bg-amber-400/10 inline-block px-4 py-1.5 rounded-full">
          ⚠️ Demo mode — form submissions are not saved. Backend coming soon.
        </p> */}
      </div>

      {/* Info Cards */}
      <div className="max-w-3xl mx-auto px-4 w-full -mt-4 py-8">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { icon: Clock, label: "Hours", value: BUSINESS_INFO.openingHours.display },
            { icon: CalendarCheck, label: "Booking", value: "Same or advance day" },
            { icon: Users, label: "Group Size", value: "Up to 50 guests" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-white border border-[#E8D5BF] rounded-xl p-3 text-center shadow-sm">
              <Icon className="w-5 h-5 text-[#C8873F] mx-auto mb-1" />
              <p className="text-[#3B1A08] text-xs font-medium">{label}</p>
              <p className="text-[#7A5C44] text-xs mt-0.5">{value}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-[#E8D5BF] rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
          <h2 className="font-serif text-xl font-semibold text-[#1A0A00]">Reservation Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-[#3B1A08] mb-1">Full Name *</label>
              <input id="fullName" {...register("fullName")} placeholder="Your full name" className="w-full px-4 py-2.5 border border-[#E8D5BF] rounded-lg text-sm focus:outline-none focus:border-[#C8873F] transition-colors" />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#3B1A08] mb-1">Email *</label>
              <input id="email" type="email" {...register("email")} placeholder="your@email.com" className="w-full px-4 py-2.5 border border-[#E8D5BF] rounded-lg text-sm focus:outline-none focus:border-[#C8873F] transition-colors" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-[#3B1A08] mb-1">Phone *</label>
              <input id="phone" type="tel" {...register("phone")} placeholder="+234 800 000 0000" className="w-full px-4 py-2.5 border border-[#E8D5BF] rounded-lg text-sm focus:outline-none focus:border-[#C8873F] transition-colors" />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-[#3B1A08] mb-1">Date *</label>
              <input id="date" type="date" min={todayStr} {...register("date")} className="w-full px-4 py-2.5 border border-[#E8D5BF] rounded-lg text-sm focus:outline-none focus:border-[#C8873F] transition-colors" />
              {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-[#3B1A08] mb-1">Time *</label>
              <div className="relative">
                <select id="time" {...register("time")} className="w-full px-4 py-2.5 border border-[#E8D5BF] rounded-lg text-sm focus:outline-none focus:border-[#C8873F] transition-colors appearance-none bg-white">
                  <option value="">Select a time</option>
                  {RESERVATION_TIMES.map((t) => (
                    <option key={t} value={t}>{formatTime(t)}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A5C44] pointer-events-none" />
              </div>
              {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>}
            </div>
            <div>
              <label htmlFor="guestCount" className="block text-sm font-medium text-[#3B1A08] mb-1">Number of Guests *</label>
              <input id="guestCount" type="number" min={1} max={50} {...register("guestCount", { valueAsNumber: true })} className="w-full px-4 py-2.5 border border-[#E8D5BF] rounded-lg text-sm focus:outline-none focus:border-[#C8873F] transition-colors" />
              {errors.guestCount && <p className="text-red-500 text-xs mt-1">{errors.guestCount.message}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="occasion" className="block text-sm font-medium text-[#3B1A08] mb-1">Occasion</label>
            <div className="relative">
              <select id="occasion" {...register("occasion")} className="w-full px-4 py-2.5 border border-[#E8D5BF] rounded-lg text-sm focus:outline-none focus:border-[#C8873F] transition-colors appearance-none bg-white">
                {OCCASIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A5C44] pointer-events-none" />
            </div>
          </div>

          <div>
            <label htmlFor="specialRequests" className="block text-sm font-medium text-[#3B1A08] mb-1">Special Requests</label>
            <textarea id="specialRequests" {...register("specialRequests")} rows={3} placeholder="Dietary requirements, seating preferences, etc." className="w-full px-4 py-2.5 border border-[#E8D5BF] rounded-lg text-sm focus:outline-none focus:border-[#C8873F] transition-colors resize-none" />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 bg-[#3B1A08] hover:bg-[#C8873F] text-white font-semibold rounded-xl transition-colors disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Request Reservation"}
          </button>

          <p className="text-[#7A5C44] text-xs text-center">
            For immediate bookings, WhatsApp us at{" "}
            <a href={`https://wa.me/${BUSINESS_INFO.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-[#C8873F] hover:underline">
              {BUSINESS_INFO.phone}
            </a>
          </p>
        </form>
      </div>

      <Footer />
    </div>
  );
}
