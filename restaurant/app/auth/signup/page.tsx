"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Coffee, UserPlus } from "lucide-react";
import { signupSchema, type SignupSchema } from "@/lib/validations";
import { useAuthUIStore } from "@/lib/store/authUIStore";

// SUPABASE: FUTURE BACKEND INTEGRATION - REAL SIGNUP
// Replace demoLogin with: await supabase.auth.signUp({ email, password, options: { data: { full_name } } })

export default function SignupPage() {
  const router = useRouter();
  const { demoLogin } = useAuthUIStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: { termsAccepted: false },
  });

  const onSubmit = async (data: SignupSchema) => {
    setSubmitting(true);
    // SUPABASE: FUTURE BACKEND INTEGRATION - AUTH SIGN UP
    await new Promise((r) => setTimeout(r, 900));
    demoLogin(data.fullName, data.email);
    setSubmitting(false);
    router.push("/profile");
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
          <h1 className="font-serif text-2xl font-bold text-[#1A0A00] mb-2">Create Account</h1>
          <p className="text-[#7A5C44] text-sm mb-5">Join Wood House Cafe for a personalised experience</p>

          <p className="text-amber-600 text-xs bg-amber-50 border border-amber-200 px-4 py-2 rounded-lg mb-5">
            ⚠️ Demo mode — account data is not saved. Backend coming soon.
          </p>

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
        </div>
      </motion.div>
    </div>
  );
}
