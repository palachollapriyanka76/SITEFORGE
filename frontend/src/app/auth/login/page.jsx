"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Chrome, Mail, Lock } from "lucide-react";
import { Button } from "../../../components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Scopes user ID in localStorage
    const mockUserId = `user_${Math.floor(100000 + Math.random() * 900000)}`;
    localStorage.setItem("siteforge-auth-user", mockUserId);
    
    setTimeout(() => {
      setIsLoading(false);
      router.push("/onboarding");
    }, 1200);
  };

  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
  const isGoogleConfigured = googleClientId.length > 0;

  const handleGoogleLogin = () => {
    if (!isGoogleConfigured) return;
    setIsLoading(true);
    const redirectUri = `${window.location.origin}/auth/callback`;
    
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${encodeURIComponent(googleClientId)}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&response_type=token%20id_token` +
      `&scope=openid%20email%20profile` +
      `&prompt=select_account` +
      `&nonce=${Math.random().toString(36).substring(2)}`;
    
    window.location.href = googleAuthUrl;
  };

  return (
    <div className="space-y-6 w-full text-[#354F52]">
      <div className="space-y-2 text-center sm:text-left">
        <h1 className="font-display text-2xl font-extrabold tracking-tight text-[#2F3E46]">
          Sign in to SiteForge
        </h1>
        <p className="text-[#354F52]/70 text-xs sm:text-sm">
          Welcome back! Access your vendor dashboard and AI website tools.
        </p>
      </div>

      {/* Social Google Login */}
      {isGoogleConfigured ? (
        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full bg-[#CAD2C5]/20 border border-[#2F3E46]/12 hover:bg-[#CAD2C5]/40 text-[#354F52] rounded-full h-11 transition-all duration-200 flex items-center justify-center gap-2.5 text-xs font-semibold shadow-sm"
        >
          <Chrome className="h-4 w-4 text-[#52796F]" />
          <span>Continue with Google</span>
        </button>
      ) : (
        <div className="space-y-2">
          <button
            disabled
            className="w-full bg-zinc-100 border border-zinc-200 text-zinc-400 rounded-full h-11 transition-all duration-200 flex items-center justify-center gap-2.5 text-xs font-semibold cursor-not-allowed"
          >
            <Chrome className="h-4 w-4 text-zinc-300" />
            <span>Google Sign In is not configured</span>
          </button>
          <p className="text-[9px] text-zinc-400 text-center font-medium leading-relaxed">
            Set <code className="bg-zinc-100 px-1 py-0.5 rounded font-mono font-bold">NEXT_PUBLIC_GOOGLE_CLIENT_ID</code> in <code className="bg-zinc-100 px-1 py-0.5 rounded font-mono font-bold">frontend/.env</code> or <code className="bg-zinc-100 px-1 py-0.5 rounded font-mono font-bold">.env.local</code>
          </p>
        </div>
      )}

      <div className="flex items-center gap-3 py-1">
        <span className="h-px bg-[#2F3E46]/10 flex-1" />
        <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold font-mono">or email</span>
        <span className="h-px bg-[#2F3E46]/10 flex-1" />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-[#354F52] uppercase tracking-wider block">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-[#52796F]" />
            <input
              required
              type="email"
              placeholder="bhaiya@store.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-[#2F3E46]/12 text-[#2F3E46] placeholder-zinc-400 rounded-full h-11 pl-10 pr-4 focus:border-[#52796F] focus:outline-none text-xs transition-colors"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-bold text-[#354F52] uppercase tracking-wider block">
              Password
            </label>
            <Link href="/auth/forgot-password" className="text-[10px] font-bold text-[#52796F] hover:text-[#354F52]">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-[#52796F]" />
            <input
              required
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-[#2F3E46]/12 text-[#2F3E46] placeholder-zinc-400 rounded-full h-11 pl-10 pr-4 focus:border-[#52796F] focus:outline-none text-xs transition-colors"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 mt-2"
        >
          {isLoading ? "Signing In..." : "Sign In with Email"}
          {!isLoading && <ArrowRight className="h-4 w-4" />}
        </Button>
      </form>

      <p className="text-center text-xs text-[#354F52]/60 font-medium">
        Don&apos;t have an account?{" "}
        <Link href="/auth/signup" className="text-[#52796F] hover:text-[#354F52] font-bold transition-colors">
          Sign up free
        </Link>
      </p>
    </div>
  );
}
