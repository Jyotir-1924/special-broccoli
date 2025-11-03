"use client";

import { Navbar } from "@/components/navbar";
import HeroSection from "@/components/Home/HeroSection";
import CTASection from "@/components/Home/CTASection";
import StarterSection from "@/components/Home/StarterSection";
import Footer from "@/components/Home/Footer";

export default function Home() {

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <Navbar />
      <HeroSection />
      <CTASection />
      <StarterSection />
      <Footer />
    </div>
  );
}
