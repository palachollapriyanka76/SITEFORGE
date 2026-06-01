"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "../../../components/ui/Button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [cooldown, setCooldown] = useState(0);

  // Countdown timer effect
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          setGeneralError(""); // Clear the error when cooldown finishes
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const formatCooldown = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const validateEmailFormat = (val) => {
    if (!val) {
      return "Email address is required.";
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(val)) {
      return "Please enter a valid email address (e.g. name@domain.com).";
    }
    return "";
  };

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    if (emailError) {
      setEmailError(validateEmailFormat(val));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");
    
    if (cooldown > 0) {
      return;
    }

    const err = validateEmailFormat(email);
    if (err) {
      setEmailError(err);
      return;
    }

    setIsLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const response = await fetch(`${apiUrl}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSuccess(true);
      } else {
        if (data.cooldownSeconds) {
          setCooldown(data.cooldownSeconds);
        }
        setGeneralError(data.error || "An error occurred. Please try again later.");
      }
    } catch (err) {
      console.error("Forgot password submission error:", err);
      setGeneralError("Cannot connect to server. Please verify the backend is running and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="space-y-6 w-full text-[#354F52] animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="h-14 w-14 rounded-full bg-[#84A98C]/15 border border-[#84A98C]/30 flex items-center justify-center text-[#52796F]">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          
          <div className="space-y-2">
            <h1 className="font-display text-2xl font-extrabold tracking-tight text-[#2F3E46]">
              Check Your Inbox
            </h1>
            <p className="text-[#354F52]/80 text-xs sm:text-sm max-w-sm">
              Password reset link sent. Check your email.
            </p>
          </div>
        </div>

        <div className="bg-[#CAD2C5]/20 border border-[#2F3E46]/10 rounded-2xl p-4 text-[11px] text-[#354F52]/80 leading-relaxed max-w-sm mx-auto text-center font-medium">
          We have sent a secure single-use recovery link to <strong className="text-[#2F3E46]">{email}</strong>. It will automatically expire in 20 minutes for security reasons.
        </div>

        <div className="pt-2 text-center">
          <Link 
            href="/auth/login" 
            className="inline-flex items-center gap-2 text-xs font-bold text-[#52796F] hover:text-[#354F52] transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full text-[#354F52] animate-in fade-in duration-300">
      <div className="space-y-2 text-center sm:text-left">
        <h1 className="font-display text-2xl font-extrabold tracking-tight text-[#2F3E46]">
          Recover Your Password
        </h1>
        <p className="text-[#354F52]/70 text-xs sm:text-sm">
          No worries! Enter your registered email address and we will send you a secure link to reset your credentials.
        </p>
      </div>

      {/* Cooldown Timer Alert */}
      {cooldown > 0 ? (
        <div className="bg-amber-50 border border-amber-200/50 rounded-2xl p-4 text-xs text-amber-800 flex items-start gap-3 animate-in fade-in duration-200">
          <AlertCircle className="h-4.5 w-4.5 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold">Request Limit Reached</p>
            <p className="leading-relaxed">
              You recently requested a password reset. Please wait <strong className="font-mono bg-amber-100 px-1.5 py-0.5 rounded font-bold text-amber-900">{formatCooldown(cooldown)}</strong> before requesting another link.
            </p>
          </div>
        </div>
      ) : (
        generalError && (
          <div className="bg-red-50 border border-red-200/50 rounded-2xl p-4 text-xs text-red-600 flex items-start gap-3 animate-in fade-in duration-200">
            <AlertCircle className="h-4.5 w-4.5 shrink-0 mt-0.5" />
            <span className="font-medium leading-relaxed">{generalError}</span>
          </div>
        )
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="space-y-1.5">
          <label htmlFor="email-input" className="text-[10px] font-bold text-[#354F52] uppercase tracking-wider block">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-[#52796F]" />
            <input
              id="email-input"
              type="email"
              placeholder="bhaiya@store.com"
              value={email}
              onChange={handleEmailChange}
              disabled={isLoading || cooldown > 0}
              className={`w-full bg-white border text-[#2F3E46] placeholder-zinc-400 rounded-full h-11 pl-10 pr-4 focus:outline-none text-xs transition-colors ${
                emailError 
                  ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" 
                  : "border-[#2F3E46]/12 focus:border-[#52796F]"
              } ${cooldown > 0 ? "opacity-50 cursor-not-allowed bg-zinc-50" : ""}`}
            />
          </div>
          
          {emailError && (
            <p className="text-[10px] text-red-500 font-semibold px-2 animate-in slide-in-from-top-1 duration-200">
              {emailError}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading || cooldown > 0}
          className="w-full h-11 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 mt-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Sending Reset Link...</span>
            </>
          ) : cooldown > 0 ? (
            <span>Locked for {formatCooldown(cooldown)}</span>
          ) : (
            <span>Send Reset Link</span>
          )}
        </Button>
      </form>

      <p className="text-center text-xs text-[#354F52]/60 font-medium">
        Remembered your credentials?{" "}
        <Link href="/auth/login" className="text-[#52796F] hover:text-[#354F52] font-bold transition-colors inline-flex items-center gap-1 group">
          <span>Sign in instead</span>
          <ArrowLeft className="h-3.5 w-3.5 rotate-180 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </p>
    </div>
  );
}
