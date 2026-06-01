"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Chrome, Mail, Lock, User } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import axios from "axios";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // 1. Front-end Validation: Invalid Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Invalid email format.");
      setIsLoading(false);
      return;
    }

    // 2. Front-end Validation: Password too short
    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      setIsLoading(false);
      return;
    }

    try {
      // 3. Validate duplicate email (backend + database check)
      const emailCheck = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050/api"}/auth/check-email?email=${encodeURIComponent(email.trim())}`
      );
      if (emailCheck.data.exists) {
        setError(emailCheck.data.error || "This email is already registered. Please sign in instead.");
        setIsLoading(false);
        return;
      }

      // 4. Register user
      const signupResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050/api"}/auth/signup`,
        { name, email: email.trim(), password }
      );

      if (signupResponse.data.success) {
        const userId = signupResponse.data.user.id;
        localStorage.setItem("siteforge-auth-user", userId);
        console.log("STEP 10: User Created - " + userId);
        
        // Go to onboarding
        router.push("/onboarding");
      }
    } catch (err) {
      console.error("Signup validation error:", err);
      if (!err.response) {
        setError("Network error. Please try again.");
      } else {
        setError(err.response.data?.error || "Registration failed. Please check your inputs.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    setIsLoading(true);
    const mockUserId = `user_${Math.floor(100000 + Math.random() * 900000)}`;
    localStorage.setItem("siteforge-auth-user", mockUserId);
    console.log("STEP 10: User Created - " + mockUserId);
    
    setTimeout(() => {
      setIsLoading(false);
      router.push("/onboarding");
    }, 1000);
  };

  return (
    <div className="space-y-6 w-full text-[#354F52]">
      <div className="space-y-2 text-center sm:text-left">
        <h1 className="font-display text-2xl font-extrabold tracking-tight text-[#2F3E46]">
          Create your account
        </h1>
        <p className="text-[#354F52]/70 text-xs sm:text-sm">
          Get started free. No credit card required.
        </p>
      </div>

      {/* Social Google Signup */}
      <button
        onClick={handleGoogleSignup}
        disabled={isLoading}
        className="w-full bg-[#CAD2C5]/20 border border-[#2F3E46]/12 hover:bg-[#CAD2C5]/40 text-[#354F52] rounded-full h-11 transition-all duration-200 flex items-center justify-center gap-2.5 text-xs font-semibold shadow-sm"
      >
        <Chrome className="h-4 w-4 text-[#52796F]" />
        <span>Sign up with Google</span>
      </button>

      <div className="flex items-center gap-3 py-1">
        <span className="h-px bg-[#2F3E46]/10 flex-1" />
        <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold font-mono">or email</span>
        <span className="h-px bg-[#2F3E46]/10 flex-1" />
      </div>

      {/* Error Warnings alerts */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-xs font-semibold text-center leading-relaxed">
          ⚠️ {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-[#354F52] uppercase tracking-wider block">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-3.5 h-4 w-4 text-[#52796F]" />
            <input
              required
              type="text"
              placeholder="Rohan Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white border border-[#2F3E46]/12 text-[#2F3E46] placeholder-zinc-400 rounded-full h-11 pl-10 pr-4 focus:border-[#52796F] focus:outline-none text-xs transition-colors"
            />
          </div>
        </div>



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
          <label className="text-[10px] font-bold text-[#354F52] uppercase tracking-wider block">
            Password
          </label>
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
          {isLoading ? "Creating Account..." : "Create Free Account"}
          {!isLoading && <ArrowRight className="h-4 w-4" />}
        </Button>
      </form>

      <p className="text-center text-xs text-[#354F52]/60 font-medium">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-[#52796F] hover:text-[#354F52] font-bold transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  );
}
