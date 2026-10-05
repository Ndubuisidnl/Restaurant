import Footer from "@/components/footer/Footer";
import { MapPin, Clock, Phone, MessageCircle, Wifi, Trees, BookOpen, CalendarCheck, Coffee, Users } from "lucide-react";
import { BUSINESS_INFO } from "@/lib/data/demo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Wood House Cafe — Port Harcourt's warmest cafe. Our story, our space, and what makes us special.",
};

const TEAM_HIGHLIGHT = [
  { icon: Coffee, label: "Artisanal Coffee", desc: "Premium beans brewed with care" },
  { icon: Trees, label: "Outdoor Seating", desc: "Comfortable open-air dining" },
  { icon: Wifi, label: "Free Wi-Fi", desc: "Stay connected while you relax" },
  { icon: BookOpen, label: "Games & Books", desc: "Unwind with in-house entertainment" },
  { icon: CalendarCheck, label: "Reservations", desc: "Book your table in advance" },
  { icon: Users, label: "Group Dining", desc: "Perfect for gatherings & events" },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDF6EE]">
      {/* Hero */}
      <div className="bg-[#1C0D03] pt-28 pb-16 px-4 text-center">
        <span className="text-[#C8873F] text-sm font-medium uppercase tracking-widest">Our Story</span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-3 mb-4">
          About Wood House Cafe
        </h1>
        <p className="text-white/60 max-w-xl mx-auto text-base">
          Where every meal feels like home. A warm, cozy corner in the heart of Port Harcourt.
        </p>
      </div>

      {/* Story Section */}
      <section className="py-16 px-4 max-w-4xl mx-auto w-full">
        {/* IMAGE: WOOD HOUSE CAFE EXTERIOR OR INTERIOR WARM DAYLIGHT */}
        <div className="aspect-video bg-gradient-to-br from-[#E8C99A] to-[#C8873F] rounded-2xl mb-10 flex items-center justify-center relative overflow-hidden">
          <span className="text-white/30 text-sm absolute top-4 left-4 bg-black/30 px-3 py-1 rounded-full">IMAGE: WOOD HOUSE CAFE EXTERIOR OR INTERIOR</span>
          <div className="text-center text-white">
            <Coffee className="w-12 h-12 mx-auto mb-3 opacity-60" />
            <p className="font-serif text-xl opacity-60">Wood House Cafe</p>
          </div>
        </div>

        <div className="prose prose-lg max-w-none text-[#6B4226] leading-relaxed space-y-5">
          <p>
            <strong className="text-[#3B1A08] font-serif">Wood House Cafe</strong> is more than a restaurant, it is a warm, inviting space where great food, artisanal coffee, and genuine hospitality come together.
          </p>
          <p>
            Located at <strong>{BUSINESS_INFO.address.street}</strong>, in Port Harcourt, Rivers State, we are your everyday destination for a hearty breakfast, a productive lunch break, or a relaxing evening dinner with loved ones.
          </p>
          <p>
            From wood-fired grills and creamy pastas to Belgian waffles and premium coffee crafted by passionate baristas, every item on our menu is prepared with care and quality ingredients.
          </p>
          <p>
            Whether you need a quiet corner to work, a cosy table for a date, or a space to celebrate a special moment. You are always welcome at Wood House Cafe. We are open <strong>every day from 8:00 AM to 10:00 PM</strong>.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-[#3B1A08] py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-white text-center mb-10">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TEAM_HIGHLIGHT.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="p-5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 bg-[#C8873F]/20 rounded-lg flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-[#C8873F]" />
                </div>
                <h3 className="font-serif text-white font-semibold mb-1">{label}</h3>
                <p className="text-white/50 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="py-16 px-4 max-w-4xl mx-auto w-full">
        <h2 className="font-serif text-3xl font-bold text-[#1A0A00] mb-8 text-center">Find Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white border border-[#E8D5BF] rounded-2xl p-6 space-y-4">
            <h3 className="font-serif text-lg font-semibold text-[#3B1A08] mb-2">Visit Us</h3>
            <div className="flex gap-3">
              <MapPin className="w-5 h-5 text-[#C8873F] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[#6B4226] text-sm">{BUSINESS_INFO.address.street}</p>
                <p className="text-[#6B4226] text-sm">{BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state}</p>
                <a href={BUSINESS_INFO.getDirectionsUrl} target="_blank" rel="noopener noreferrer" className="text-[#C8873F] text-xs mt-1 inline-block hover:underline">
                  Get Directions →
                </a>
              </div>
            </div>
            <div className="flex gap-3">
              <Clock className="w-5 h-5 text-[#C8873F] flex-shrink-0" />
              <p className="text-[#6B4226] text-sm">{BUSINESS_INFO.openingHours.display}</p>
            </div>
          </div>
          <div className="bg-white border border-[#E8D5BF] rounded-2xl p-6 space-y-4">
            <h3 className="font-serif text-lg font-semibold text-[#3B1A08] mb-2">Get in Touch</h3>
            <div className="flex gap-3">
              <Phone className="w-5 h-5 text-[#C8873F] flex-shrink-0" />
              <a href={`tel:${BUSINESS_INFO.phone}`} className="text-[#6B4226] text-sm hover:text-[#C8873F] transition-colors">{BUSINESS_INFO.phone}</a>
            </div>
            <div className="flex gap-3">
              <MessageCircle className="w-5 h-5 text-[#C8873F] flex-shrink-0" />
              <a href={`https://wa.me/${BUSINESS_INFO.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-[#6B4226] text-sm hover:text-[#25D366] transition-colors">
                WhatsApp Us
              </a>
            </div>
            <div className="flex gap-3 items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#C8873F] flex-shrink-0">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <a href={BUSINESS_INFO.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-[#6B4226] text-sm hover:text-[#C8873F] transition-colors">{BUSINESS_INFO.instagram}</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
