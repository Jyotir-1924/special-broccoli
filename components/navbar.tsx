"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  // Read sessionStorage synchronously on initialization
  const [hasAnimated, setHasAnimated] = useState(() => {
    try {
      return sessionStorage.getItem("navbarAnimated") === "true";
    } catch {
      return false;
    }
  });

  // Mark animation as run for the rest of the session
  useEffect(() => {
    if (!hasAnimated) {
      try {
        sessionStorage.setItem("navbarAnimated", "true");
        setHasAnimated(true);
      } catch {
        // ignore storage errors
      }
    }
  }, [hasAnimated]);

  return (
    <motion.nav
      initial={hasAnimated ? false : { y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: hasAnimated ? 0 : 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-gray-200 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/assets/images/BSlogo.png"
                alt="Blogsmith Logo"
                width={200}
                height={80}
                priority
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/blog"
              className="text-gray-700 hover:text-[#000000] px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 hover:bg-[#ff751f]"
            >
              Read Blogs
            </Link>

            {session && (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-[#000000] px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 hover:bg-[#ff751f]"
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/categories"
                  className="text-gray-700 hover:text-[#000000] px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 hover:bg-[#ff751f]"
                >
                  Categories
                </Link>
              </>
            )}

            {/* Auth Buttons / User Menu */}
            {status === "loading" ? (
              <div className="ml-4 px-6 py-2.5 bg-gray-200 rounded-lg animate-pulse">
                <div className="h-5 w-20 bg-gray-300 rounded"></div>
              </div>
            ) : session ? (
              <>
                {/* Write Post Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-4"
                >
                  <Link
                    href="/blog/new"
                    className="inline-flex items-center px-6 py-2.5 bg-linear-to-r from-[#ff751f] to-[#e66a1a] text-white text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
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

                {/* User Menu */}
                <div className="relative ml-3">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-all"
                  >
                    {session.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || "User"}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-linear-to-r from-[#ff751f] to-[#e66a1a] rounded-full flex items-center justify-center text-white font-semibold">
                        {session.user?.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                    )}
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-semibold text-gray-900">
                            {session.user?.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {session.user?.email}
                          </p>
                        </div>
                        <div className="py-1">
                          <Link
                            href="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            Your Profile
                          </Link>
                          <Link
                            href="/dashboard"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            My Posts
                          </Link>
                          <Link
                            href="/settings"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            Settings
                          </Link>
                        </div>
                        <div className="border-t border-gray-100">
                          <button
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              signOut({ callbackUrl: "/" });
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="ml-4 flex items-center gap-3">
                <Link
                  href="/auth/signin"
                  className="text-gray-700 hover:text-[#ff751f] px-4 py-2 rounded-lg text-base font-medium transition-all"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center px-6 py-2.5 bg-linear-to-r from-[#ff751f] to-[#e66a1a] text-white text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Get Started
                </Link>
              </div>
            )}
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

                {session ? (
                  <>
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
                      href="/profile"
                      className="text-gray-700 hover:text-[#ff751f] hover:bg-gray-50 px-4 py-3 rounded-lg text-base font-medium transition-all"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      href="/blog/new"
                      className="bg-linear-to-r from-[#ff751f] to-[#e66a1a] text-white px-4 py-3 rounded-lg text-base font-semibold hover:shadow-lg transition-all text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Write Post
                    </Link>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        signOut({ callbackUrl: "/" });
                      }}
                      className="text-red-600 hover:bg-red-50 px-4 py-3 rounded-lg text-base font-medium transition-all text-left"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/signin"
                      className="text-gray-700 hover:text-[#ff751f] hover:bg-gray-50 px-4 py-3 rounded-lg text-base font-medium transition-all"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="bg-linear-to-r from-[#ff751f] to-[#e66a1a] text-white px-4 py-3 rounded-lg text-base font-semibold hover:shadow-lg transition-all text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}