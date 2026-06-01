"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Loader2, AlertCircle, RefreshCw } from "lucide-react";

export default function GoogleCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState("verifying"); // 'verifying' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // 1. Retrieve the hash fragment from the URL containing tokens
    const hash = window.location.hash;
    if (!hash) {
      setStatus("error");
      setErrorMessage("No authentication tokens were returned from the OAuth flow.");
      return;
    }

    // 2. Parse hash query parameters
    const params = new URLSearchParams(hash.substring(1));
    const accessToken = params.get("access_token");
    const idToken = params.get("id_token");

    if (!accessToken || !idToken) {
      setStatus("error");
      setErrorMessage("Failed to extract ID token or Access token from Google response.");
      return;
    }

    const authenticateWithBackend = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const response = await axios.post(`${apiUrl}/auth/google`, {
          access_token: accessToken,
          id_token: idToken
        });

        if (response.data.success) {
          setStatus("success");
          const userId = response.data.user.id;
          localStorage.setItem("siteforge-auth-user", userId);
          
          // Smooth redirection to onboarding
          setTimeout(() => {
            router.push("/onboarding");
          }, 800);
        } else {
          throw new Error(response.data.error || "Authentication failed.");
        }
      } catch (err) {
        console.error("Callback authentication error:", err);
        setStatus("error");
        if (err.response && err.response.data && err.response.data.error) {
          setErrorMessage(err.response.data.error);
        } else {
          setErrorMessage(err.message || "An unexpected error occurred during backend verification.");
        }
      }
    };

    authenticateWithBackend();
  }, [router]);

  return (
    <div className="min-h-screen bg-[#CAD2C5]/30 flex items-center justify-center p-6 text-[#354F52] font-sans antialiased">
      <div className="w-full max-w-md bg-white border border-[#2F3E46]/12 rounded-3xl p-8 shadow-xl text-center space-y-6 transition-all">
        
        {status === "verifying" && (
          <div className="space-y-6 py-6">
            <div className="relative flex justify-center">
              <Loader2 className="h-12 w-12 text-[#52796F] animate-spin" />
            </div>
            <div className="space-y-2">
              <h2 className="font-display text-lg font-bold text-[#2F3E46]">
                Verifying Credentials
              </h2>
              <p className="text-xs text-[#354F52]/70 max-w-xs mx-auto leading-relaxed">
                We are validating your Google session token securely on our servers. Do not close this window.
              </p>
            </div>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-6 py-6">
            <div className="relative flex justify-center">
              <div className="h-12 w-12 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center text-emerald-500 scale-105 transition-transform duration-300">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="font-display text-lg font-bold text-[#2F3E46]">
                Verification Successful!
              </h2>
              <p className="text-xs text-emerald-600/90 font-medium">
                Redirecting you to onboarding...
              </p>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-6 py-4">
            <div className="relative flex justify-center">
              <div className="h-12 w-12 bg-rose-50 border border-rose-100 rounded-full flex items-center justify-center text-rose-500">
                <AlertCircle className="h-6 w-6" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="font-display text-lg font-bold text-[#2F3E46]">
                Authentication Rejected
              </h2>
              <div className="p-3.5 bg-rose-50 border border-rose-100 rounded-2xl text-xs font-semibold text-rose-600 leading-relaxed text-center">
                ⚠️ {errorMessage}
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => router.push("/auth/login")}
                className="w-full bg-[#2F3E46] hover:bg-[#354F52] text-white rounded-full h-11 text-xs font-semibold transition-all duration-200 shadow-sm flex items-center justify-center gap-2"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Return to Login</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
