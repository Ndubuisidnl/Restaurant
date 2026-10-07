"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { MapPin, Plus, Trash2, ArrowLeft, Check } from "lucide-react";
import Footer from "@/components/footer/Footer";
import { useAuthUIStore } from "@/lib/store/authUIStore";
import { createClient } from "@/lib/supabase/client";

type AddressRow = { id: string; label: "Home" | "Work" | "Other"; address: string; landmark: string; city: string; phone: string; is_default: boolean };

export default function AddressesPage() {
  const { isLoggedIn } = useAuthUIStore();
  const [addresses, setAddresses] = useState<AddressRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({ label: "Home" as AddressRow["label"], address: "", landmark: "", city: "Port Harcourt", phone: "", is_default: false });

  const loadAddresses = async () => {
    const supabase = createClient();
    const { data, error: queryError } = await supabase.from("addresses").select("id,label,address,landmark,city,phone,is_default").order("created_at", { ascending: false });
    if (queryError) throw queryError;
    setAddresses((data || []) as AddressRow[]);
  };

  useEffect(() => {
    let active = true;
    const load = async () => {
      try { const supabase = createClient(); const { data, error } = await supabase.from("addresses").select("id,label,address,landmark,city,phone,is_default").order("created_at", { ascending: false }); if (error) throw error; if (active) setAddresses((data || []) as AddressRow[]); }
      catch (err) { console.error("Unable to load addresses", err); if (active) setError("We couldn't load your saved addresses."); }
      finally { if (active) setLoading(false); }
    };
    void load();
    return () => { active = false; };
  }, []);

  const addAddress = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setSaving(true); setError(""); setMessage("");
    try {
      const supabase = createClient(); const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Please sign in again to save an address.");
      if (form.is_default) await supabase.from("addresses").update({ is_default: false }).eq("user_id", user.id);
      const { error } = await supabase.from("addresses").insert({ ...form, user_id: user.id });
      if (error) throw error;
      await loadAddresses(); setShowForm(false); setForm({ label: "Home", address: "", landmark: "", city: "Port Harcourt", phone: "", is_default: false }); setMessage("Address saved.");
    } catch (err) { setError(err instanceof Error ? err.message : "We couldn't save this address."); }
    finally { setSaving(false); }
  };

  const deleteAddress = async (id: string) => {
    setError("");
    try { const { error } = await createClient().from("addresses").delete().eq("id", id); if (error) throw error; setAddresses((current) => current.filter((address) => address.id !== id)); }
    catch (err) { setError(err instanceof Error ? err.message : "We couldn't delete this address."); }
  };

  const makeDefault = async (id: string) => {
    setError("");
    try { const supabase = createClient(); const { data: { user } } = await supabase.auth.getUser(); if (!user) throw new Error("Please sign in again."); await supabase.from("addresses").update({ is_default: false }).eq("user_id", user.id); const { error } = await supabase.from("addresses").update({ is_default: true }).eq("id", id); if (error) throw error; await loadAddresses(); }
    catch (err) { setError(err instanceof Error ? err.message : "We couldn't update the default address."); }
  };

  if (!isLoggedIn) {
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
        {error && <p role="alert" className="text-red-600 text-sm bg-red-50 border border-red-200 px-4 py-3 rounded-lg mb-4">{error}</p>}
        {message && <p className="text-emerald-700 text-sm bg-emerald-50 border border-emerald-200 px-4 py-3 rounded-lg mb-4">{message}</p>}

        <div className="space-y-3 mb-5">
          {loading ? <p className="text-center py-8 text-[#7A5C44]">Loading addresses…</p> : addresses.map((address, i) => (
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
                  {address.is_default && (
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
                onClick={() => void deleteAddress(address.id)}
                className="text-[#7A5C44] hover:text-red-500 transition-colors flex-shrink-0"
                aria-label={`Delete ${address.label} address`}
                title="Delete address"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              {!address.is_default && <button onClick={() => void makeDefault(address.id)} className="text-xs text-[#C8873F] hover:underline mt-2">Set as default</button>}
            </motion.div>
          ))}
        </div>

              <button
          className="flex items-center gap-2 px-5 py-2.5 border-2 border-dashed border-[#E8D5BF] hover:border-[#C8873F] text-[#7A5C44] hover:text-[#C8873F] rounded-xl text-sm font-medium transition-colors w-full justify-center"
          onClick={() => setShowForm((value) => !value)}
        >
          <Plus className="w-4 h-4" />
          Add New Address
        </button>
        {showForm && <form onSubmit={addAddress} className="mt-5 bg-white border border-[#E8D5BF] rounded-xl p-5 space-y-3">
          <h2 className="font-serif text-lg font-semibold text-[#1A0A00]">Add an Address</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <select value={form.label} onChange={(event) => setForm({ ...form, label: event.target.value as AddressRow["label"] })} className="px-3 py-2 border border-[#E8D5BF] rounded-lg text-sm"><option>Home</option><option>Work</option><option>Other</option></select>
            <input required placeholder="City" value={form.city} onChange={(event) => setForm({ ...form, city: event.target.value })} className="px-3 py-2 border border-[#E8D5BF] rounded-lg text-sm" />
          </div>
          <input required placeholder="Street address" value={form.address} onChange={(event) => setForm({ ...form, address: event.target.value })} className="w-full px-3 py-2 border border-[#E8D5BF] rounded-lg text-sm" />
          <div className="grid sm:grid-cols-2 gap-3"><input placeholder="Landmark (optional)" value={form.landmark} onChange={(event) => setForm({ ...form, landmark: event.target.value })} className="px-3 py-2 border border-[#E8D5BF] rounded-lg text-sm" /><input placeholder="Phone (optional)" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} className="px-3 py-2 border border-[#E8D5BF] rounded-lg text-sm" /></div>
          <label className="flex items-center gap-2 text-sm text-[#7A5C44]"><input type="checkbox" checked={form.is_default} onChange={(event) => setForm({ ...form, is_default: event.target.checked })} /> Make this my default address</label>
          <button disabled={saving} className="px-5 py-2 bg-[#3B1A08] hover:bg-[#C8873F] text-white text-sm font-medium rounded-lg disabled:opacity-60">{saving ? "Saving…" : "Save Address"}</button>
        </form>}
      </div>

      <Footer />
    </div>
  );
}
