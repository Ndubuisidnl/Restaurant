"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, BookOpen, UtensilsCrossed, Heart, MapPin, Settings, LogOut, ArrowRight } from "lucide-react";
import Footer from "@/components/footer/Footer";
import { useAuthUIStore } from "@/lib/store/authUIStore";
import { createClient } from "@/lib/supabase/client";

const PROFILE_LINKS = [
  { href: "/profile/orders", icon: BookOpen, label: "My Orders", desc: "View order history" },
  { href: "/profile/reservations", icon: UtensilsCrossed, label: "My Reservations", desc: "Manage your bookings" },
  { href: "/profile/favorites", icon: Heart, label: "Favorites", desc: "Your saved items" },
  { href: "/profile/addresses", icon: MapPin, label: "Saved Addresses", desc: "Manage delivery addresses" },
  { href: "/profile/settings", icon: Settings, label: "Settings", desc: "Account settings" },
];

export default function ProfilePage() {
  const router = useRouter();
  const { isLoggedIn, userName, userEmail, clearAuthenticatedUser } = useAuthUIStore();
  const [stats, setStats] = useState({ orders: 0, reservations: 0, favorites: 0, memberSince: "—" });

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const supabase = createClient(); const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        const [orders, reservations, favorites, profile] = await Promise.all([
          supabase.from("orders").select("id", { count: "exact", head: true }),
          supabase.from("reservations").select("id", { count: "exact", head: true }),
          supabase.from("favorites").select("menu_item_id", { count: "exact", head: true }),
          supabase.from("profiles").select("created_at").eq("id", user.id).maybeSingle(),
        ]);
        if (active) setStats({
          orders: orders.count || 0,
          reservations: reservations.count || 0,
          favorites: favorites.count || 0,
          memberSince: profile.data?.created_at ? new Date(profile.data.created_at).toLocaleDateString("en-NG", { month: "short", year: "numeric" }) : "—",
        });
      } catch (error) { console.error("Unable to load profile summary", error); }
    };
    void load();
    return () => { active = false; };
  }, []);

  if (!isLoggedIn) {
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

  const handleLogout = async () => {
    try { await createClient().auth.signOut(); } finally { clearAuthenticatedUser(); router.push("/"); }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDF6EE]">
      <div className="bg-[#1C0D03] pt-28 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#C8873F] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-2xl font-bold">{userName.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <h1 className="font-serif text-3xl font-bold text-white">{userName}</h1>
              <p className="text-white/60 text-sm mt-0.5">{userEmail}</p>
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
            { label: "Orders", value: stats.orders },
            { label: "Reservations", value: stats.reservations },
            { label: "Favorites", value: stats.favorites },
            { label: "Member Since", value: stats.memberSince },
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
