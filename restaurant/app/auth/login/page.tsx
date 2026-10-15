"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Coffee, LogIn } from "lucide-react";
import { loginSchema, type LoginSchema } from "@/lib/validations";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    setSubmitting(true);
    setError("");
    try {
      const supabase = createClient();
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (loginError) throw loginError;
      router.push("/profile");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "We couldn't sign you in. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF6EE] flex flex-col items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 justify-center mb-8">
          <div className="w-10 h-10 rounded-full bg-[#C8873F] flex items-center justify-center">
            <Coffee className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-serif text-[#1A0A00] font-semibold leading-none">Wood House Cafe</p>
            <p className="text-[#C8873F] text-xs tracking-wider">Welcome back</p>
          </div>
        </Link>

        <div className="bg-white border border-[#E8D5BF] rounded-2xl p-8 shadow-sm">
          <h1 className="font-serif text-2xl font-bold text-[#1A0A00] mb-2">Login</h1>
          <p className="text-[#7A5C44] text-sm mb-6">Sign in to your Wood House Cafe account</p>

          {error && <p className="text-red-500 text-sm mb-4 bg-red-50 border border-red-200 px-4 py-2 rounded-lg">{error}</p>}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#3B1A08] mb-1">Email</label>
              <input
                id="email"
                type="email"
                {...register("email")}
                placeholder="your@email.com"
                autoComplete="email"
                className="w-full px-4 py-3 border border-[#E8D5BF] rounded-xl text-sm focus:outline-none focus:border-[#C8873F] transition-colors"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-[#3B1A08]">Password</label>
                <Link href="/auth/forgot-password" className="text-xs text-[#C8873F] hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Your password"
                  autoComplete="current-password"
                  className="w-full px-4 py-3 pr-12 border border-[#E8D5BF] rounded-xl text-sm focus:outline-none focus:border-[#C8873F] transition-colors"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A5C44]">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-[#3B1A08] hover:bg-[#C8873F] text-white font-semibold rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              {submitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-sm text-[#7A5C44] mt-5">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-[#C8873F] font-medium hover:underline">Sign up</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
