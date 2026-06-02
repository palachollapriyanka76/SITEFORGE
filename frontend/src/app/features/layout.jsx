import React from "react";
import Navbar from "../../components/landing/Navbar";
import Footer from "../../components/landing/Footer";

export default function FeaturesLayout({ children }) {
  return (
    <div className="bg-[#CAD2C5] min-h-screen text-[#354F52] font-sans overflow-x-hidden relative selection:bg-[#52796F] selection:text-white">
      {/* Decorative radial blur gradients */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#84A98C]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20vh] right-1/4 w-[500px] h-[500px] bg-[#52796F]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Navbar */}
      <Navbar />

      {/* Main detail page content wrapper */}
      <main className="pt-20 relative z-10 min-h-[calc(100vh-20rem)]">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
