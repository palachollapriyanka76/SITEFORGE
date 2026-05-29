import React from "react";
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import SocialProof from "../components/landing/SocialProof";
import Features from "../components/landing/Features";
import TemplatesShowcase from "../components/landing/TemplatesShowcase";
import AIDemoSection from "../components/landing/AIDemoSection";
import TrustSection from "../components/landing/TrustSection";
import Testimonials from "../components/landing/Testimonials";
import Pricing from "../components/landing/Pricing";
import FAQ from "../components/landing/FAQ";
import Footer from "../components/landing/Footer";

export default function Home() {
  return (
    <div className="bg-[#CAD2C5] min-h-screen text-[#354F52] font-sans overflow-x-hidden relative selection:bg-[#52796F] selection:text-white">
      {/* Eco-friendly warm background glow highlights */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#84A98C]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[120vh] right-1/4 w-[500px] h-[500px] bg-[#52796F]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[200vh] left-1/3 w-[550px] h-[550px] bg-[#354F52]/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[50vh] right-1/3 w-[450px] h-[450px] bg-[#84A98C]/15 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: "15s" }} />

      {/* Sticky Glassmorphism Header */}
      <Navbar />

      {/* Hero section */}
      <Hero />

      {/* Social Proof */}
      <SocialProof />

      {/* Bento grid layout features panel */}
      <Features />

      {/* Realistic templates section */}
      <TemplatesShowcase />

      {/* AI Realtime chat conversation demo */}
      <AIDemoSection />

      {/* Google Reviews & Speed Metrics Trust section */}
      <TrustSection />

      {/* Snapping horizontal scrolling testimonials */}
      <Testimonials />

      {/* Pricing panels focusing on Rs 999 plan */}
      <Pricing />

      {/* Accordion FAQ list */}
      <FAQ />

      {/* newsletter & Brand footer */}
      <Footer />
    </div>
  );
}
