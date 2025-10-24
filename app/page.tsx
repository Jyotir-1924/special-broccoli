"use client"

import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { motion } from "framer-motion";
import { use } from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
<section className="pt-24 relative overflow-hidden text-white">
  {/* Animated Gradient Background */}
  <div className="absolute inset-0 animate-gradient bg-[linear-gradient(270deg,_#2563eb,_#7c3aed,_#ec4899,_#06b6d4)] bg-[length:400%_400%]" />

  {/* Overlay for subtle radial lighting */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),transparent_60%)]" />

  {/* Hero Content */}
  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    <div className="text-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
      >
        Share Your Stories with the World
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-xl mb-10 text-blue-100"
      >
        A modern blogging platform for writers and readers
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex justify-center space-x-4"
      >
        <Link
          href="/blog"
          className="px-8 py-3 rounded-full font-semibold text-blue-700 bg-white shadow-lg hover:shadow-xl transition duration-300 hover:scale-105"
        >
          Read Blogs
        </Link>

        <Link
          href="/blog/new"
          className="px-8 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-blue-700 to-purple-700 shadow-lg hover:shadow-xl transition duration-300 hover:scale-105 border border-white"
        >
          Start Writing
        </Link>
      </motion.div>
    </div>
  </div>
</section>


      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Why Choose Our Platform?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "✍️",
                title: "Easy Writing",
                text: "Simple and intuitive editor to write and publish your content in minutes.",
              },
              {
                icon: "🏷️",
                title: "Organized",
                text: "Categorize your posts and help readers find exactly what they are looking for.",
              },
              {
                icon: "🚀",
                title: "Fast & Modern",
                text: "Built with cutting-edge technology for the best performance and user experience.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-8 rounded-lg shadow-sm border hover:shadow-md transition duration-300"
              >
                <div className="text-blue-600 text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 BlogPlatform. Built with Next.js, tRPC, and PostgreSQL.
          </p>
        </div>
      </footer>
    </div>
  );
}
