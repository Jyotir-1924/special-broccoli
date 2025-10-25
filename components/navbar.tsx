"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Link href="/assets/images/BSlogo.png" className="flex items-center space-x-2">
              <span className="text-3xl font-bold">
                <span className="text-[#ff751f]">Blog</span>
                <span className="text-black">smith</span>
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/blog"
              className="text-gray-700 hover:text-[#ff751f] px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 hover:bg-gray-50"
            >
              Blog
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-700 hover:text-[#ff751f] px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 hover:bg-gray-50"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/categories"
              className="text-gray-700 hover:text-[#ff751f] px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 hover:bg-gray-50"
            >
              Categories
            </Link>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-4"
            >
              <Link
                href="/blog/new"
                className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-[#ff751f] to-[#e66a1a] text-white text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Write Post
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-[#ff751f] p-2 rounded-lg transition-colors hover:bg-gray-50"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col space-y-1 py-4">
                <Link
                  href="/blog"
                  className="text-gray-700 hover:text-[#ff751f] hover:bg-gray-50 px-4 py-3 rounded-lg text-base font-medium transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-[#ff751f] hover:bg-gray-50 px-4 py-3 rounded-lg text-base font-medium transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/categories"
                  className="text-gray-700 hover:text-[#ff751f] hover:bg-gray-50 px-4 py-3 rounded-lg text-base font-medium transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Categories
                </Link>
                <Link
                  href="/blog/new"
                  className="bg-gradient-to-r from-[#ff751f] to-[#e66a1a] text-white px-4 py-3 rounded-lg text-base font-semibold hover:shadow-lg transition-all text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Write Post
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}