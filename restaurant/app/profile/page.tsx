"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, BookOpen, UtensilsCrossed, Heart, MapPin, Settings, LogOut, ArrowRight } from "lucide-react";
import Footer from "@/components/footer/Footer";
import { useAuthUIStore } from "@/lib/store/authUIStore";
import { DEMO_CUSTOMER_PROFILE, DEMO_ORDERS, DEMO_RESERVATIONS } from "@/lib/data/demo";

// SUPABASE: FUTURE BACKEND INTEGRATION - LOAD CUSTOMER PROFILE
// Replace demo data with: const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()

const PROFILE_LINKS = [
  { href: "/profile/orders", icon: BookOpen, label: "My Orders", desc: "View order history" },
  { href: "/profile/reservations", icon: UtensilsCrossed, label: "My Reservations", desc: "Manage your bookings" },
  { href: "/profile/favorites", icon: Heart, label: "Favorites", desc: "Your saved items" },
  { href: "/profile/addresses", icon: MapPin, label: "Saved Addresses", desc: "Manage delivery addresses" },
  { href: "/profile/settings", icon: Settings, label: "Settings", desc: "Account settings" },
];

export default function ProfilePage() {
  const router = useRouter();
  const { isDemoLoggedIn, demoUserName, demoUserEmail, demoLogout } = useAuthUIStore();

  if (!isDemoLoggedIn) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FDF6EE]">
        <div className="flex-1 flex items-center justify-center px-4 pt-20 text-center">
          <div>
            <User className="w-12 h-12 text-[#C8873F]/50 mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-bold text-[#3B1A08] mb-3">You&apos;re not logged in</h2>
            <p className="text-[#7A5C44] mb-5">Please login to view your profile.</p>
            <Link href="/auth/login" className="px-6 py-3 bg-[#3B1A08] text-white rounded-full hover:bg-[#C8873F] transition-colors font-medium inline-block">
              Login
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleLogout = () => {
    demoLogout();
    router.push("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDF6EE]">
      <div className="bg-[#1C0D03] pt-28 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#C8873F] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-2xl font-bold">{demoUserName.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <h1 className="font-serif text-3xl font-bold text-white">{demoUserName}</h1>
              <p className="text-white/60 text-sm mt-0.5">{demoUserEmail}</p>
              {/* <span className="text-amber-400/70 text-xs bg-amber-400/10 px-3 py-0.5 rounded-full inline-block mt-1">
                Demo Account
              </span> */}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-3xl mx-auto px-4 py-8 w-full">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: "Orders", value: DEMO_ORDERS.length },
            { label: "Reservations", value: DEMO_RESERVATIONS.length },
            { label: "Favorites", value: "—" },
            { label: "Member Since", value: "Sep 2024" },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white border border-[#E8D5BF] rounded-xl p-4 text-center">
              <p className="font-serif text-2xl font-bold text-[#C8873F]">{value}</p>
              <p className="text-[#7A5C44] text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Navigation Links */}
        <div className="space-y-2">
          {PROFILE_LINKS.map(({ href, icon: Icon, label, desc }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-4 p-4 bg-white border border-[#E8D5BF] rounded-xl hover:border-[#C8873F]/40 hover:shadow-sm transition-all group"
            >
              <div className="w-10 h-10 bg-[#FDF6EE] rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-[#C8873F]" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-[#1A0A00] text-sm">{label}</p>
                <p className="text-[#7A5C44] text-xs">{desc}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#7A5C44] group-hover:text-[#C8873F] transition-colors" />
            </Link>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full mt-4 flex items-center justify-center gap-2 py-3 text-red-500 border border-red-200 hover:bg-red-50 rounded-xl text-sm font-medium transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </button>
      </div>

      <Footer />
    </div>
  );
}
