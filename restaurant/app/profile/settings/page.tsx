"use client";

import Link from "next/link";
import { ArrowLeft, User, Bell, Lock, Trash2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer/Footer";
import { useAuthUIStore } from "@/lib/store/authUIStore";

// SUPABASE: FUTURE BACKEND INTEGRATION - ACCOUNT SETTINGS
// Profile updates, notification preferences, and account deletion will be handled via Supabase.

export default function SettingsPage() {
  const router = useRouter();
  const { isDemoLoggedIn, demoUserName, demoUserEmail, demoLogout } = useAuthUIStore();

  if (!isDemoLoggedIn) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FDF6EE]">
        <div className="flex-1 flex items-center justify-center px-4 pt-20 text-center">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#3B1A08] mb-3">Login to manage settings</h2>
            <Link href="/auth/login" className="px-6 py-3 bg-[#3B1A08] text-white rounded-full hover:bg-[#C8873F] transition-colors font-medium inline-block">Login</Link>
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
        <div className="max-w-2xl mx-auto">
          <Link href="/profile" className="flex items-center gap-2 text-[#C8873F] text-sm mb-4 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Profile
          </Link>
          <h1 className="font-serif text-4xl font-bold text-white">Settings</h1>
          <p className="text-white/60 mt-1">Manage your account preferences</p>
        </div>
      </div>

      <div className="flex-1 max-w-2xl mx-auto px-4 py-8 w-full space-y-5">
        {/* <p className="text-amber-600 text-xs bg-amber-50 border border-amber-200 px-4 py-2 rounded-lg">
          ⚠️ Demo mode — settings changes are not saved. Backend coming soon.
        </p> */}

        {/* Profile Info */}
        <div className="bg-white border border-[#E8D5BF] rounded-xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-5 h-5 text-[#C8873F]" />
            <h2 className="font-serif text-lg font-semibold text-[#1A0A00]">Personal Information</h2>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-[#7A5C44] mb-1">Full Name</label>
              <input defaultValue={demoUserName} className="w-full px-4 py-2.5 border border-[#E8D5BF] rounded-lg text-sm focus:outline-none focus:border-[#C8873F]" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#7A5C44] mb-1">Email</label>
              <input defaultValue={demoUserEmail} type="email" className="w-full px-4 py-2.5 border border-[#E8D5BF] rounded-lg text-sm focus:outline-none focus:border-[#C8873F]" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#7A5C44] mb-1">Phone</label>
              <input defaultValue="+234 800 000 0000" type="tel" className="w-full px-4 py-2.5 border border-[#E8D5BF] rounded-lg text-sm focus:outline-none focus:border-[#C8873F]" />
            </div>
            <button
              className="px-5 py-2 bg-[#3B1A08] hover:bg-[#C8873F] text-white text-sm font-medium rounded-lg transition-colors"
              onClick={() => alert("Save changes — demo mode, no backend action")}
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white border border-[#E8D5BF] rounded-xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-[#C8873F]" />
            <h2 className="font-serif text-lg font-semibold text-[#1A0A00]">Notifications</h2>
          </div>
          <div className="space-y-3">
            {[
              { label: "Order updates", desc: "Get notified when your order status changes" },
              { label: "Reservation reminders", desc: "Reminders before your reservation" },
              { label: "Promotions & offers", desc: "Special deals from Wood House Cafe" },
            ].map(({ label, desc }) => (
              <div key={label} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#1A0A00]">{label}</p>
                  <p className="text-xs text-[#7A5C44]">{desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#C8873F]"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Password */}
        <div className="bg-white border border-[#E8D5BF] rounded-xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-5 h-5 text-[#C8873F]" />
            <h2 className="font-serif text-lg font-semibold text-[#1A0A00]">Password</h2>
          </div>
          <Link href="/auth/reset-password" className="text-[#C8873F] text-sm hover:underline">
            Change Password →
          </Link>
        </div>

        {/* Danger Zone */}
        <div className="bg-white border border-red-200 rounded-xl p-5">
          <h2 className="font-serif text-lg font-semibold text-red-600 mb-3 flex items-center gap-2">
            <Trash2 className="w-5 h-5" />
            Danger Zone
          </h2>
          <p className="text-[#7A5C44] text-sm mb-3">Permanently delete your account and all data.</p>
          <button
            className="text-red-500 text-sm border border-red-200 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
            onClick={() => alert("Delete account — demo mode, no backend action")}
          >
            Delete My Account
          </button>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-3 text-red-500 border border-red-200 hover:bg-red-50 rounded-xl text-sm font-medium transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </button>
      </div>

      <Footer />
    </div>
  );
}
