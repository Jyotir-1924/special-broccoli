"use client";

import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { StarterSection } from "@/components/home/StarterSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { Footer } from "@/components/home/Footer";

export default function Home() {

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <StarterSection />
      <Footer />
    </div>
  );
}
