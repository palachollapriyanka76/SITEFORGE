"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { name: "Features", href: "/#features" },
  { name: "AI Builder", href: "/#demo" },
  { name: "Pricing", href: "/#pricing" },
  { name: "FAQ", href: "/#faq" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-20 flex items-center ${
          isScrolled
            ? "border-b border-[#2F3E46]/10 bg-white/40 backdrop-blur-md shadow-sm"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-full">
            {/* Logo Left */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#84A98C] to-[#52796F] shadow-[0_0_15px_rgba(82,121,111,0.25)] transition-transform group-hover:scale-105">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="font-display text-xl font-extrabold tracking-tight text-[#2F3E46] transition-colors">
                SiteForge
              </span>
            </Link>

            {/* Navigation Center */}
            <div className="hidden md:flex items-center gap-8 bg-white/50 border border-[#2F3E46]/10 rounded-full px-6 py-2 backdrop-blur-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xs font-bold uppercase tracking-wider text-[#354F52] hover:text-[#2F3E46] transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* CTA Button Right */}
            <div className="hidden md:flex items-center gap-4">
              <Link href="/auth/login" className="text-xs font-bold uppercase tracking-wider text-[#354F52] hover:text-[#2F3E46] transition-colors">
                Sign In
              </Link>
              <Link href="/auth/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2.5 rounded-full bg-[#52796F] hover:bg-[#354F52] text-white text-xs font-bold tracking-wider uppercase shadow-md transition-colors duration-200"
                >
                  Start Building
                </motion.button>
              </Link>
            </div>

            {/* Mobile Hamburger Trigger */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-xl text-[#354F52] hover:text-[#2F3E46] bg-white/50 border border-[#2F3E46]/10 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#CAD2C5]/98 backdrop-blur-lg pt-24 px-6 md:hidden flex flex-col justify-between pb-8 border-b border-[#2F3E46]/10"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-extrabold text-[#2F3E46] transition-colors tracking-tight"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              <Link
                href="/auth/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-3.5 rounded-full border border-[#2F3E46]/10 bg-white/50 text-[#354F52] font-bold uppercase tracking-wider text-xs hover:text-[#2F3E46] transition-colors"
              >
                Sign In
              </Link>
              <Link href="/auth/signup" onClick={() => setIsMobileMenuOpen(false)}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="w-full py-3.5 rounded-full bg-[#52796F] text-white font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-1.5 shadow-md"
                >
                  Start Building <ArrowRight className="h-4 w-4" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
