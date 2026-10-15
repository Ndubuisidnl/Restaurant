"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Coffee, Mail, CheckCircle2 } from "lucide-react";
import { forgotPasswordSchema, type ForgotPasswordSchema } from "@/lib/validations";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, getValues, formState: { errors } } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordSchema) => {
    setSubmitting(true);
    setError("");
    try {
      const { error } = await createClient().auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/auth/reset-password`,
      });
      if (error) throw error;
      setSubmitted(true);
    } catch (err) { setError(err instanceof Error ? err.message : "We couldn't send the reset link."); }
    finally { setSubmitting(false); }
  };

  return (
    <div className="min-h-screen bg-[#FDF6EE] flex flex-col items-center justify-center px-4 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <Link href="/" className="flex items-center gap-2 justify-center mb-8">
          <div className="w-10 h-10 rounded-full bg-[#C8873F] flex items-center justify-center">
            <Coffee className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-serif text-[#1A0A00] font-semibold leading-none">Wood House Cafe</p>
          </div>
        </Link>

        <div className="bg-white border border-[#E8D5BF] rounded-2xl p-8 shadow-sm">
          {submitted ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              </div>
              <h1 className="font-serif text-2xl font-bold text-[#1A0A00] mb-2">Check Your Email</h1>
              <p className="text-[#7A5C44] text-sm mb-4">
                A password reset link has been sent to <strong>{getValues("email")}</strong>.
              </p>
              <Link href="/auth/login" className="mt-5 block text-[#C8873F] text-sm hover:underline">Back to Login</Link>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 bg-[#C8873F]/10 rounded-xl flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-[#C8873F]" />
              </div>
              <h1 className="font-serif text-2xl font-bold text-[#1A0A00] mb-2">Forgot Password?</h1>
              <p className="text-[#7A5C44] text-sm mb-6">Enter your email and we&apos;ll send you a link to reset your password.</p>


              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {error && <p role="alert" className="text-red-600 text-sm bg-red-50 border border-red-200 px-4 py-2 rounded-lg">{error}</p>}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#3B1A08] mb-1">Email</label>
                  <input id="email" type="email" {...register("email")} placeholder="your@email.com" className="w-full px-4 py-3 border border-[#E8D5BF] rounded-xl text-sm focus:outline-none focus:border-[#C8873F]" />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <button type="submit" disabled={submitting} className="w-full py-3 bg-[#3B1A08] hover:bg-[#C8873F] text-white font-semibold rounded-xl transition-colors disabled:opacity-60">
                  {submitting ? "Sending..." : "Send Reset Link"}
                </button>
              </form>

              <p className="text-center text-sm text-[#7A5C44] mt-5">
                Remember your password?{" "}
                <Link href="/auth/login" className="text-[#C8873F] hover:underline">Login</Link>
              </p>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
