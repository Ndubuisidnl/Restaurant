"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Coffee, KeyRound, CheckCircle2 } from "lucide-react";
import { resetPasswordSchema, type ResetPasswordSchema } from "@/lib/validations";

// SUPABASE: FUTURE BACKEND INTEGRATION - UPDATE PASSWORD
// Replace onSubmit with: await supabase.auth.updateUser({ password: data.password })

export default function ResetPasswordPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (_data: ResetPasswordSchema) => {
    setSubmitting(true);
    // SUPABASE: FUTURE BACKEND INTEGRATION - RESET PASSWORD
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setDone(true);
    setTimeout(() => router.push("/auth/login"), 2500);
  };

  return (
    <div className="min-h-screen bg-[#FDF6EE] flex flex-col items-center justify-center px-4 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <Link href="/" className="flex items-center gap-2 justify-center mb-8">
          <div className="w-10 h-10 rounded-full bg-[#C8873F] flex items-center justify-center">
            <Coffee className="w-5 h-5 text-white" />
          </div>
          <p className="font-serif text-[#1A0A00] font-semibold leading-none">Wood House Cafe</p>
        </Link>

        <div className="bg-white border border-[#E8D5BF] rounded-2xl p-8 shadow-sm">
          {done ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#1A0A00] mb-2">Password Updated!</h2>
              <p className="text-[#7A5C44] text-sm">Redirecting you to login...</p>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 bg-[#C8873F]/10 rounded-xl flex items-center justify-center mb-4">
                <KeyRound className="w-6 h-6 text-[#C8873F]" />
              </div>
              <h1 className="font-serif text-2xl font-bold text-[#1A0A00] mb-2">Reset Password</h1>
              <p className="text-[#7A5C44] text-sm mb-5">Enter your new password below.</p>

              {/* <p className="text-amber-600 text-xs bg-amber-50 border border-amber-200 px-4 py-2 rounded-lg mb-5">
                ⚠️ Demo mode — password will not actually change. Backend coming soon.
              </p> */}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-[#3B1A08] mb-1">New Password</label>
                  <div className="relative">
                    <input id="password" type={showPassword ? "text" : "password"} {...register("password")} placeholder="Min 8 chars, 1 uppercase, 1 number" className="w-full px-4 py-3 pr-12 border border-[#E8D5BF] rounded-xl text-sm focus:outline-none focus:border-[#C8873F]" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A5C44]">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#3B1A08] mb-1">Confirm Password</label>
                  <div className="relative">
                    <input id="confirmPassword" type={showConfirm ? "text" : "password"} {...register("confirmPassword")} placeholder="Confirm new password" className="w-full px-4 py-3 pr-12 border border-[#E8D5BF] rounded-xl text-sm focus:outline-none focus:border-[#C8873F]" />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A5C44]">
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                </div>
                <button type="submit" disabled={submitting} className="w-full py-3 bg-[#3B1A08] hover:bg-[#C8873F] text-white font-semibold rounded-xl transition-colors disabled:opacity-60">
                  {submitting ? "Updating..." : "Reset Password"}
                </button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
