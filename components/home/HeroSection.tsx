"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export const HeroSection = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-linear-to-br from-[#ff751f]/10 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-linear-to-tr from-black/5 to-transparent rounded-full blur-3xl"
        />
      </div>
      <div className="container relative z-10 text-center py-32">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-8">
            <span className="inline-flex items-center px-6 py-2 rounded-full bg-[#ff751f]/10 text-[#ff751f] font-semibold text-sm border border-[#ff751f]/20">
              ✨ Welcome to the Future of Blogging
            </span>
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight"
          >
            <span className="bg-linear-to-r from-[#ff751f] to-[#000000] bg-clip-text text-transparent">
              Share Your Stories
            </span>
            <br />
            <span className="bg-linear-to-r from-[#ff751f] to-[#000000] bg-clip-text text-transparent">
              with the World
            </span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Craft beautiful blog posts with our powerful rich-text editor.
            <br className="hidden sm:block" />
            Join thousands of writers sharing their passion.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/blog"
                className="inline-flex items-center px-8 py-4 bg-linear-to-r from-[#ff751f] to-[#e66a1a] text-white text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <span>Explore Blogs</span>
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/blog/new"
                className="inline-flex items-center px-8 py-4 bg-black text-white text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-black hover:bg-gray-900"
              >
                <svg
                  className="mr-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                <span>Start Writing</span>
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            <div>
              <p className="text-4xl font-bold text-[#ff751f]">31+</p>
              <p className="text-gray-600 mt-2">Active Writers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#ff751f]">100+</p>
              <p className="text-gray-600 mt-2">Blog Posts</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-[#ff751f]">25+</p>
              <p className="text-gray-600 mt-2">Readers</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
};
