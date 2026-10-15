"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, User, Bell, Lock, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer/Footer";
import { useAuthUIStore } from "@/lib/store/authUIStore";
import { createClient } from "@/lib/supabase/client";

export default function SettingsPage() {
  const router = useRouter();
  const { isLoggedIn, userName, userEmail, setAuthenticatedUser, clearAuthenticatedUser } = useAuthUIStore();
  const [fullName, setFullName] = useState(userName);
  const [phone, setPhone] = useState("");
  const [preferences, setPreferences] = useState({ order_updates: true, reservation_reminders: true, promotions: false });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        const { data, error: queryError } = await supabase.from("profiles").select("full_name,phone,preferences").eq("id", user.id).maybeSingle();
        if (queryError) throw queryError;
        if (active) {
          setFullName(data?.full_name || user.user_metadata?.full_name || "");
          setPhone(data?.phone || user.user_metadata?.phone || "");
          if (data?.preferences) setPreferences((current) => ({ ...current, ...data.preferences }));
        }
      } catch (loadError) { console.error("Unable to load profile settings", loadError); if (active) setError("We couldn't load your profile settings."); }
    };
    void load();
    return () => { active = false; };
  }, []);

  if (!isLoggedIn) {
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

  const saveProfile = async () => {
    setSaving(true); setError(""); setMessage("");
    try {
      const supabase = createClient(); const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Please sign in again.");
      const { error } = await supabase.from("profiles").update({ full_name: fullName.trim(), phone: phone.trim() }).eq("id", user.id);
      if (error) throw error;
      await supabase.auth.updateUser({ data: { full_name: fullName.trim(), phone: phone.trim() } });
      setAuthenticatedUser(fullName.trim(), user.email || ""); setMessage("Profile details saved.");
    } catch (saveError) { setError(saveError instanceof Error ? saveError.message : "We couldn't save your profile."); }
    finally { setSaving(false); }
  };

  const savePreference = async (key: keyof typeof preferences, value: boolean) => {
    const next = { ...preferences, [key]: value }; setPreferences(next); setError("");
    try {
      const supabase = createClient(); const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Please sign in again.");
      const { error } = await supabase.from("profiles").update({ preferences: next }).eq("id", user.id);
      if (error) throw error;
    } catch (saveError) { setPreferences(preferences); setError(saveError instanceof Error ? saveError.message : "We couldn't save this preference."); }
  };

  const handleLogout = async () => {
    try { await createClient().auth.signOut(); } finally { clearAuthenticatedUser(); router.push("/"); }
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
        {error && <p role="alert" className="text-red-600 text-sm bg-red-50 border border-red-200 px-4 py-3 rounded-lg">{error}</p>}
        {message && <p className="text-emerald-700 text-sm bg-emerald-50 border border-emerald-200 px-4 py-3 rounded-lg">{message}</p>}

        {/* Profile Info */}
        <div className="bg-white border border-[#E8D5BF] rounded-xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-5 h-5 text-[#C8873F]" />
            <h2 className="font-serif text-lg font-semibold text-[#1A0A00]">Personal Information</h2>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-[#7A5C44] mb-1">Full Name</label>
              <input value={fullName} onChange={(event) => setFullName(event.target.value)} className="w-full px-4 py-2.5 border border-[#E8D5BF] rounded-lg text-sm focus:outline-none focus:border-[#C8873F]" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#7A5C44] mb-1">Email</label>
              <input value={userEmail} type="email" readOnly className="w-full px-4 py-2.5 border border-[#E8D5BF] rounded-lg text-sm bg-gray-50" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#7A5C44] mb-1">Phone</label>
              <input value={phone} onChange={(event) => setPhone(event.target.value)} type="tel" className="w-full px-4 py-2.5 border border-[#E8D5BF] rounded-lg text-sm focus:outline-none focus:border-[#C8873F]" />
            </div>
            <button
              disabled={saving}
              className="px-5 py-2 bg-[#3B1A08] hover:bg-[#C8873F] text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-60"
              onClick={() => void saveProfile()}
            >
              {saving ? "Saving…" : "Save Changes"}
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
              { key: "order_updates" as const, label: "Order updates", desc: "Get notified when your order status changes" },
              { key: "reservation_reminders" as const, label: "Reservation reminders", desc: "Reminders before your reservation" },
              { key: "promotions" as const, label: "Promotions & offers", desc: "Special deals from Wood House Cafe" },
            ].map(({ key, label, desc }) => (
              <div key={label} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#1A0A00]">{label}</p>
                  <p className="text-xs text-[#7A5C44]">{desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={preferences[key]} onChange={(event) => void savePreference(key, event.target.checked)} className="sr-only peer" />
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

        <p className="text-xs text-[#7A5C44]">To request account deletion, contact the restaurant directly.</p>

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
