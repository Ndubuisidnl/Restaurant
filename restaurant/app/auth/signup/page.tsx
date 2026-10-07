"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Coffee, UserPlus } from "lucide-react";
import { signupSchema, type SignupSchema } from "@/lib/validations";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [confirmationSent, setConfirmationSent] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: { termsAccepted: false },
  });

  const onSubmit = async (data: SignupSchema) => {
    setSubmitting(true);
    setError("");
    try {
      const supabase = createClient();
      const { data: result, error: signupError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: { full_name: data.fullName, phone: data.phone },
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/profile`,
        },
      });
      if (signupError) throw signupError;
      if (result.session) router.push("/profile");
      else setConfirmationSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "We couldn't create your account. Please try again.");
    } finally {
      setSubmitting(false);
    }
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
            <p className="text-[#C8873F] text-xs tracking-wider">Create an account</p>
          </div>
        </Link>

        <div className="bg-white border border-[#E8D5BF] rounded-2xl p-8 shadow-sm">
          {confirmationSent ? (
            <div className="py-4 text-center">
              <h1 className="font-serif text-2xl font-bold text-[#1A0A00] mb-2">Check your email</h1>
              <p className="text-[#7A5C44] text-sm">We sent a confirmation link to your email address. Open it to activate your account, then you can log in.</p>
              <Link href="/auth/login" className="inline-block mt-5 text-[#C8873F] font-medium hover:underline">Go to Login</Link>
            </div>
          ) : <>
          <h1 className="font-serif text-2xl font-bold text-[#1A0A00] mb-2">Create Account</h1>
          <p className="text-[#7A5C44] text-sm mb-5">Join Wood House Cafe for a personalised experience</p>

          {error && <p role="alert" className="text-red-600 text-sm mb-4 bg-red-50 border border-red-200 px-4 py-2 rounded-lg">{error}</p>}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-[#3B1A08] mb-1">Full Name</label>
              <input id="fullName" {...register("fullName")} placeholder="Your full name" className="w-full px-4 py-3 border border-[#E8D5BF] rounded-xl text-sm focus:outline-none focus:border-[#C8873F]" />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#3B1A08] mb-1">Email</label>
              <input id="email" type="email" {...register("email")} placeholder="your@email.com" className="w-full px-4 py-3 border border-[#E8D5BF] rounded-xl text-sm focus:outline-none focus:border-[#C8873F]" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-[#3B1A08] mb-1">Phone</label>
              <input id="phone" type="tel" {...register("phone")} placeholder="+234 800 000 0000" className="w-full px-4 py-3 border border-[#E8D5BF] rounded-xl text-sm focus:outline-none focus:border-[#C8873F]" />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#3B1A08] mb-1">Password</label>
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
                <input id="confirmPassword" type={showConfirm ? "text" : "password"} {...register("confirmPassword")} placeholder="Confirm your password" className="w-full px-4 py-3 pr-12 border border-[#E8D5BF] rounded-xl text-sm focus:outline-none focus:border-[#C8873F]" />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A5C44]">
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" {...register("termsAccepted")} className="mt-0.5 accent-[#C8873F]" />
              <span className="text-sm text-[#7A5C44]">
                I agree to the{" "}
                <Link href="/terms" className="text-[#C8873F] hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link href="/privacy-policy" className="text-[#C8873F] hover:underline">Privacy Policy</Link>
              </span>
            </label>
            {errors.termsAccepted && <p className="text-red-500 text-xs">{errors.termsAccepted.message}</p>}

            <button type="submit" disabled={submitting} className="w-full py-3 bg-[#3B1A08] hover:bg-[#C8873F] text-white font-semibold rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
              <UserPlus className="w-4 h-4" />
              {submitting ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-[#7A5C44] mt-5">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-[#C8873F] font-medium hover:underline">Login</Link>
          </p>
          </>}
        </div>
      </motion.div>
    </div>
  );
}
