"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, MessageCircle, CheckCircle2, ChevronDown } from "lucide-react";
import Footer from "@/components/footer/Footer";
import { contactSchema, type ContactSchema } from "@/lib/validations";
import { BUSINESS_INFO } from "@/lib/data/demo";
import { createClient } from "@/lib/supabase/client";

const SUBJECTS = [
  { value: "reservation", label: "Reservation Inquiry" },
  { value: "order", label: "Order Question" },
  { value: "feedback", label: "Feedback" },
  { value: "partnership", label: "Partnership / Events" },
  { value: "general-inquiry", label: "General Inquiry" },
  { value: "other", label: "Other" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: { subject: "general-inquiry" },
  });

  const onSubmit = async (data: ContactSchema) => {
    setSubmitting(true);
    setSubmitError("");
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      const { error } = await supabase.from("contact_messages").insert({
        user_id: user?.id ?? null,
        name: data.name,
        email: data.email,
        phone: data.phone || "",
        subject: data.subject,
        message: data.message,
      });
      if (error) throw error;
      setSubmitted(true);
    } catch (error) {
      console.error("Contact message submission failed", error);
      setSubmitError(error instanceof Error ? error.message : "We couldn't send your message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDF6EE]">
      <div className="bg-[#1C0D03] pt-28 pb-12 px-4 text-center">
        <span className="text-[#C8873F] text-sm font-medium uppercase tracking-widest">Contact Us</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
          Get in Touch
        </h1>
        <p className="text-white/60 max-w-xl mx-auto">
          We&apos;d love to hear from you. Reach out for reservations, feedback, or any questions.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#1A0A00] mb-6">How to Reach Us</h2>
            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[#C8873F]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#C8873F]" />
                </div>
                <div>
                  <p className="font-medium text-[#3B1A08] text-sm">Address</p>
                  <p className="text-[#7A5C44] text-sm mt-0.5">{BUSINESS_INFO.address.street}</p>
                  <p className="text-[#7A5C44] text-sm">{BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state}</p>
                  <a href={BUSINESS_INFO.getDirectionsUrl} target="_blank" rel="noopener noreferrer" className="text-[#C8873F] text-xs hover:underline mt-1 inline-block">
                    Get Directions →
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[#C8873F]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#C8873F]" />
                </div>
                <div>
                  <p className="font-medium text-[#3B1A08] text-sm">Phone</p>
                  <a href={`tel:${BUSINESS_INFO.phone}`} className="text-[#7A5C44] text-sm hover:text-[#C8873F] transition-colors mt-0.5 block">{BUSINESS_INFO.phone}</a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[#C8873F]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-[#C8873F]" />
                </div>
                <div>
                  <p className="font-medium text-[#3B1A08] text-sm">WhatsApp</p>
                  <a href={`https://wa.me/${BUSINESS_INFO.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-[#7A5C44] text-sm hover:text-[#25D366] transition-colors mt-0.5 block">
                    Chat with us on WhatsApp
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[#C8873F]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#C8873F]" />
                </div>
                <div>
                  <p className="font-medium text-[#3B1A08] text-sm">Opening Hours</p>
                  <p className="text-[#7A5C44] text-sm mt-0.5">{BUSINESS_INFO.openingHours.display}</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            {/* IMAGE: GOOGLE MAP EMBED SHOWING WOOD HOUSE CAFE LOCATION */}
            <div className="mt-8 aspect-video bg-gradient-to-br from-[#E8C99A] to-[#C8873F] rounded-2xl flex items-center justify-center relative overflow-hidden">
              <span className="text-white/50 text-sm absolute top-3 left-3 bg-black/30 px-3 py-1 rounded-full text-xs">
                IMAGE: MAP — {BUSINESS_INFO.address.city}
              </span>
              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-white text-[#3B1A08] font-medium text-sm rounded-full hover:bg-[#3B1A08] hover:text-white transition-colors"
              >
                Open in Google Maps
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#1A0A00] mb-6">Send a Message</h2>

            {submitted ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-[#1A0A00] mb-2">Message Sent!</h3>
                <p className="text-[#7A5C44] text-sm">We&apos;ll get back to you via phone or WhatsApp shortly.</p>
                <button onClick={() => setSubmitted(false)} className="mt-4 text-[#C8873F] text-sm hover:underline">Send another message</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {submitError && <p role="alert" className="text-red-600 text-sm bg-red-50 border border-red-200 px-4 py-2 rounded-lg">{submitError}</p>}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#3B1A08] mb-1">Name *</label>
                    <input id="name" {...register("name")} placeholder="Your name" className="w-full px-4 py-2.5 border border-[#E8D5BF] rounded-lg text-sm focus:outline-none focus:border-[#C8873F]" />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[#3B1A08] mb-1">Phone</label>
                    <input id="phone" type="tel" {...register("phone")} placeholder="+234 800 000 0000" className="w-full px-4 py-2.5 border border-[#E8D5BF] rounded-lg text-sm focus:outline-none focus:border-[#C8873F]" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#3B1A08] mb-1">Email *</label>
                  <input id="email" type="email" {...register("email")} placeholder="your@email.com" className="w-full px-4 py-2.5 border border-[#E8D5BF] rounded-lg text-sm focus:outline-none focus:border-[#C8873F]" />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-[#3B1A08] mb-1">Subject *</label>
                  <div className="relative">
                    <select id="subject" {...register("subject")} className="w-full px-4 py-2.5 border border-[#E8D5BF] rounded-lg text-sm focus:outline-none focus:border-[#C8873F] appearance-none bg-white">
                      {SUBJECTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A5C44] pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#3B1A08] mb-1">Message *</label>
                  <textarea id="message" {...register("message")} rows={5} placeholder="How can we help?" className="w-full px-4 py-2.5 border border-[#E8D5BF] rounded-lg text-sm focus:outline-none focus:border-[#C8873F] resize-none" />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>
                <button type="submit" disabled={submitting} className="w-full py-3.5 bg-[#3B1A08] hover:bg-[#C8873F] text-white font-semibold rounded-xl transition-colors disabled:opacity-60">
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
