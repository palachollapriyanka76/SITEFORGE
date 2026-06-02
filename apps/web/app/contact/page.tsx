"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/landing/Navbar";
import Footer from "../../components/landing/Footer";
import { Mail, MessageSquare, Phone, Send, ArrowLeft, Sparkles, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.name && formState.email && formState.message) {
      setSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
    }
  };

  return (
    <div className="bg-[#CAD2C5] min-h-screen text-[#354F52] font-sans overflow-x-hidden relative selection:bg-[#52796F] selection:text-white">
      {/* Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#84A98C]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20vh] right-1/4 w-[500px] h-[500px] bg-[#52796F]/10 rounded-full blur-[120px] pointer-events-none" />

      <Navbar />

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 min-h-[calc(100vh-20rem)]">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#354F52] hover:text-[#2F3E46] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Homepage</span>
          </Link>
        </div>

        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#52796F]/30 bg-[#52796F]/10 px-4 py-1.5 text-xs font-bold text-[#52796F]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Guides & Support</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-[#2F3E46] leading-tight tracking-tight">
            We're Here to Help Your <br />
            Business Grow
          </h1>
          <p className="text-base sm:text-lg text-[#354F52] max-w-2xl leading-relaxed">
            Need assistance setting up your custom catalog, configuring your domain name, 
            or managing direct WhatsApp orders? Connect with our dedicated support team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Info cards (Left: 5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Card 1: WhatsApp Chat */}
            <div className="bg-white border border-[#2F3E46]/12 rounded-[32px] p-6 flex gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-10 w-10 shrink-0 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#2F3E46]">WhatsApp Support</h4>
                <p className="text-[11px] text-[#354F52]">Active chat helpers for instant troubleshooting.</p>
                <p className="text-xs font-bold text-[#52796F] pt-1">+91 98765 43210</p>
              </div>
            </div>

            {/* Card 2: Email */}
            <div className="bg-white border border-[#2F3E46]/12 rounded-[32px] p-6 flex gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-10 w-10 shrink-0 rounded-xl bg-[#52796F]/10 border border-[#52796F]/20 flex items-center justify-center text-[#52796F]">
                <Mail className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#2F3E46]">Email Helpdesk</h4>
                <p className="text-[11px] text-[#354F52]">Drop us an email and get a reply within 2 hours.</p>
                <p className="text-xs font-bold text-[#52796F] pt-1">support@siteforge.app</p>
              </div>
            </div>

            {/* Card 3: Support Hours */}
            <div className="bg-white border border-[#2F3E46]/12 rounded-[32px] p-6 flex gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-10 w-10 shrink-0 rounded-xl bg-[#84A98C]/15 border border-[#84A98C]/25 flex items-center justify-center text-[#52796F]">
                <Phone className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#2F3E46]">Business Hours</h4>
                <p className="text-[11px] text-[#354F52]">Monday through Saturday, 9 AM to 7 PM IST.</p>
                <p className="text-xs font-bold text-[#52796F] pt-1">Response Time: Sub-2 Hours</p>
              </div>
            </div>

          </div>

          {/* Form (Right: 7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#2F3E46]/12 rounded-[32px] p-8 shadow-sm">
            <h3 className="font-display text-lg font-bold text-[#2F3E46] mb-6">Send us a direct message</h3>
            
            {submitted ? (
              <div className="p-8 text-center space-y-3 bg-[#CAD2C5]/20 rounded-2xl border border-[#2F3E46]/10">
                <CheckCircle className="h-12 w-12 text-[#52796F] mx-auto animate-bounce" />
                <h4 className="text-sm font-bold text-[#2F3E46]">Message Sent Successfully!</h4>
                <p className="text-xs text-[#354F52] max-w-sm mx-auto">
                  Dhanyavaad! We have received your query and a support executive will reach out to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="text-[10px] font-bold text-[#354F52] uppercase tracking-wider">Your Name</label>
                    <input 
                      required
                      id="contact-name"
                      type="text" 
                      placeholder="Vikram Singh"
                      value={formState.name}
                      onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-[#CAD2C5]/10 border border-[#2F3E46]/12 text-xs rounded-xl p-3 outline-none focus:border-[#52796F] transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-[10px] font-bold text-[#354F52] uppercase tracking-wider">Email Address</label>
                    <input 
                      required
                      id="contact-email"
                      type="email" 
                      placeholder="vikram@store.com"
                      value={formState.email}
                      onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-[#CAD2C5]/10 border border-[#2F3E46]/12 text-xs rounded-xl p-3 outline-none focus:border-[#52796F] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="text-[10px] font-bold text-[#354F52] uppercase tracking-wider">Message Description</label>
                  <textarea 
                    required
                    id="contact-message"
                    rows={5}
                    placeholder="Describe what features you need assistance with..."
                    value={formState.message}
                    onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full bg-[#CAD2C5]/10 border border-[#2F3E46]/12 text-xs rounded-xl p-3 outline-none focus:border-[#52796F] transition-colors resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="h-11 px-6 rounded-full bg-[#52796F] hover:bg-[#354F52] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md transition-all duration-200"
                >
                  Submit Inquiry <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            )}

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
