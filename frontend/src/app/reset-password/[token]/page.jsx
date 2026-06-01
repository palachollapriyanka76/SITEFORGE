"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, Loader2, CheckCircle2, AlertCircle, Sparkles, Check, X } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import AuthLayout from "../../auth/layout";

export default function ResetPasswordPage({ params }) {
  const { token } = params;
  const router = useRouter();

  // Verification states
  const [isVerifying, setIsVerifying] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [tokenError, setTokenError] = useState("");

  // Form states
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  // Verify token on mount
  useEffect(() => {
    async function verifyToken() {
      if (!token) {
        setIsTokenValid(false);
        setTokenError("Missing token in request path.");
        setIsVerifying(false);
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/auth/reset-password/${token}`);
        const data = await response.json();

        if (response.ok && data.valid) {
          setIsTokenValid(true);
        } else {
          setIsTokenValid(false);
          setTokenError(data.error || "This password reset link is invalid or has expired.");
        }
      } catch (err) {
        console.error("Token verification error:", err);
        setIsTokenValid(false);
        setTokenError("Unable to verify link validity. Please check your network and try again.");
      } finally {
        setIsVerifying(false);
      }
    }

    verifyToken();
  }, [token, apiUrl]);

  // Live password strength calculations
  const criteria = {
    length: password.length >= 8,
    hasNumber: /\d/.test(password),
    hasUpper: /[A-Z]/.test(password),
    hasSpecial: /[^A-Za-z0-9]/.test(password),
  };

  const strengthPoints = Object.values(criteria).filter(Boolean).length;

  const getStrengthLabel = () => {
    if (password.length === 0) return { label: "", color: "bg-transparent", textClass: "" };
    if (strengthPoints <= 1) return { label: "Weak", color: "bg-red-500 w-1/3", textClass: "text-red-500" };
    if (strengthPoints <= 3) return { label: "Medium", color: "bg-amber-500 w-2/3", textClass: "text-amber-500" };
    return { label: "Strong", color: "bg-emerald-500 w-full", textClass: "text-emerald-500" };
  };

  const strength = getStrengthLabel();

  // Validate form
  const isFormValid = 
    password.length >= 8 && 
    password === confirmPassword && 
    strengthPoints >= 3; // require at least medium strength

  const passwordsMatch = password === confirmPassword || confirmPassword.length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");

    if (!isFormValid) {
      if (password !== confirmPassword) {
        setGeneralError("Passwords do not match.");
      } else {
        setGeneralError("Please ensure your password meets the strength criteria.");
      }
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/auth/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSuccess(true);
      } else {
        setGeneralError(data.error || "Failed to reset password. Please try again.");
      }
    } catch (err) {
      console.error("Password reset error:", err);
      setGeneralError("Failed to update password. Please check your network and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Rendering States
  let content;

  if (isVerifying) {
    content = (
      <div className="flex flex-col items-center justify-center py-12 text-[#354F52] space-y-4">
        <Loader2 className="h-10 w-10 text-[#52796F] animate-spin" />
        <p className="text-xs font-semibold uppercase tracking-wider text-[#354F52]/60">
          Verifying your recovery token...
        </p>
      </div>
    );
  } else if (!isTokenValid) {
    content = (
      <div className="space-y-6 w-full text-[#354F52] animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="h-14 w-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
            <AlertCircle className="h-8 w-8" />
          </div>
          
          <div className="space-y-2">
            <h1 className="font-display text-2xl font-extrabold tracking-tight text-[#2F3E46]">
              Invalid Recovery Link
            </h1>
            <p className="text-[#354F52]/80 text-xs sm:text-sm max-w-sm">
              {tokenError}
            </p>
          </div>
        </div>

        <div className="bg-red-50/50 border border-red-100 rounded-2xl p-4 text-[11px] text-[#354F52]/80 leading-relaxed max-w-sm mx-auto text-center font-medium">
          For your account security, password reset links are strictly single-use and automatically expire after 20 minutes. If you have already used this link, please sign in.
        </div>

        <div className="pt-4 flex flex-col gap-3 max-w-xs mx-auto">
          <Link href="/auth/forgot-password" style={{ width: '100%' }}>
            <Button className="w-full h-11 text-xs font-bold rounded-full">
              Request New Link
            </Button>
          </Link>
          <Link href="/auth/login" className="text-center text-xs font-bold text-[#52796F] hover:text-[#354F52] transition-colors py-2">
            Return to Sign In
          </Link>
        </div>
      </div>
    );
  } else if (isSuccess) {
    content = (
      <div className="space-y-6 w-full text-[#354F52] animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="h-14 w-14 rounded-full bg-[#84A98C]/15 border border-[#84A98C]/30 flex items-center justify-center text-[#52796F]">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          
          <div className="space-y-2">
            <h1 className="font-display text-2xl font-extrabold tracking-tight text-[#2F3E46]">
              Password Reset Successful
            </h1>
            <p className="text-[#354F52]/80 text-xs sm:text-sm max-w-sm">
              Your password has been successfully updated. Your recovery token has been cleared.
            </p>
          </div>
        </div>

        <div className="bg-[#CAD2C5]/20 border border-[#2F3E46]/10 rounded-2xl p-4 text-[11px] text-[#354F52]/80 leading-relaxed max-w-sm mx-auto text-center font-medium">
          You can now log in securely using your new credentials to access your store configuration and AI web editing tools.
        </div>

        <div className="pt-4 max-w-xs mx-auto">
          <Link href="/auth/login" style={{ width: '100%' }}>
            <Button className="w-full h-11 text-xs font-bold rounded-full">
              Sign In with New Password
            </Button>
          </Link>
        </div>
      </div>
    );
  } else {
    content = (
      <div className="space-y-6 w-full text-[#354F52] animate-in fade-in duration-300">
        <div className="space-y-2 text-center sm:text-left">
          <h1 className="font-display text-2xl font-extrabold tracking-tight text-[#2F3E46]">
            Reset Your Password
          </h1>
          <p className="text-[#354F52]/70 text-xs sm:text-sm">
            Configure a strong, new password for your account below.
          </p>
        </div>

        {generalError && (
          <div className="bg-red-50 border border-red-200/50 rounded-2xl p-4 text-xs text-red-600 flex items-start gap-3 animate-in fade-in duration-200">
            <AlertCircle className="h-4.5 w-4.5 shrink-0 mt-0.5" />
            <span className="font-medium leading-relaxed">{generalError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-[#354F52] uppercase tracking-wider block">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-[#52796F]" />
              <input
                required
                type={showPassword ? "text" : "password"}
                placeholder="New Password (8+ chars)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full bg-white border border-[#2F3E46]/12 text-[#2F3E46] placeholder-zinc-400 rounded-full h-11 pl-10 pr-10 focus:border-[#52796F] focus:outline-none text-xs transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
                className="absolute right-3.5 top-3.5 hover:text-[#52796F] text-[#354F52]/40 transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Password Strength Meter */}
          {password.length > 0 && (
            <div className="space-y-2 px-1 animate-in fade-in duration-200">
              <div className="flex justify-between items-center text-[10px] font-semibold">
                <span className="text-[#354F52]/60">Password Strength:</span>
                <span className={`${strength.textClass} font-bold`}>{strength.label}</span>
              </div>
              
              {/* Progress Bar Container */}
              <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                <div className={`h-full transition-all duration-300 rounded-full ${strength.color}`} />
              </div>

              {/* Checklist */}
              <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 pt-1">
                {[
                  { key: "length", label: "8+ characters" },
                  { key: "hasNumber", label: "At least 1 number" },
                  { key: "hasUpper", label: "1 uppercase letter" },
                  { key: "hasSpecial", label: "1 special symbol" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center gap-1.5">
                    <div className={`h-3.5 w-3.5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      criteria[item.key] ? "bg-emerald-500/10 text-emerald-600" : "bg-zinc-100 text-zinc-300"
                    }`}>
                      {criteria[item.key] ? (
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      ) : (
                        <X className="h-2.5 w-2.5 stroke-[3]" />
                      )}
                    </div>
                    <span className={`text-[10px] font-medium leading-none ${
                      criteria[item.key] ? "text-[#354F52]/90" : "text-[#354F52]/50"
                    }`}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Confirm Password Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-[#354F52] uppercase tracking-wider block">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-[#52796F]" />
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-type new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                className={`w-full bg-white border text-[#2F3E46] placeholder-zinc-400 rounded-full h-11 pl-10 pr-10 focus:outline-none text-xs transition-colors ${
                  !passwordsMatch 
                    ? "border-red-500 focus:border-red-500" 
                    : "border-[#2F3E46]/12 focus:border-[#52796F]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                tabIndex="-1"
                className="absolute right-3.5 top-3.5 hover:text-[#52796F] text-[#354F52]/40 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            
            {!passwordsMatch && (
              <p className="text-[10px] text-red-500 font-semibold px-2 animate-in slide-in-from-top-1 duration-200">
                Passwords do not match.
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading || !isFormValid}
            className="w-full h-11 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 mt-4"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Updating Password...</span>
              </>
            ) : (
              <span>Reset Password</span>
            )}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <AuthLayout>
      {content}
    </AuthLayout>
  );
}
