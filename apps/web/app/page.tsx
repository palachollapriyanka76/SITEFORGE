"use client";

import { motion } from "framer-motion";
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import TemplatesShowcase from "../components/landing/TemplatesShowcase";
import AIDemoSection from "../components/landing/AIDemoSection";
import Testimonials from "../components/landing/Testimonials";
import Pricing from "../components/landing/Pricing";
import FAQ from "../components/landing/FAQ";
import Footer from "../components/landing/Footer";

// Scroll reveal animations for sections
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for smooth deceleration
    },
  },
};

export default function HomePage() {
  return (
    <div className="dark min-h-screen bg-zinc-950 text-white selection:bg-indigo-500/30 overflow-x-hidden font-sans antialiased">
      {/* 1. Header Navigation */}
      <Navbar />

      <main className="relative z-10">
        {/* 2. Hero Section (Built-in entrance animations) */}
        <Hero />

        {/* 3. Features Bento Grid Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-150px" }}
          variants={sectionVariants}
        >
          <Features />
        </motion.section>

        {/* 4. Horizontal Templates Showcase Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-150px" }}
          variants={sectionVariants}
        >
          <TemplatesShowcase />
        </motion.section>

        {/* 5. Conversational AI Generation Demo Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-150px" }}
          variants={sectionVariants}
        >
          <AIDemoSection />
        </motion.section>

        {/* 6. Vendor Testimonials Grid Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-150px" }}
          variants={sectionVariants}
        >
          <Testimonials />
        </motion.section>

        {/* 7. Flexible Pricing Options Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-150px" }}
          variants={sectionVariants}
        >
          <Pricing />
        </motion.section>

        {/* 8. Frequently Asked Questions Accordion Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-150px" }}
          variants={sectionVariants}
        >
          <FAQ />
        </motion.section>
      </main>

      {/* 9. Footer Section */}
      <Footer />
    </div>
  );
}
