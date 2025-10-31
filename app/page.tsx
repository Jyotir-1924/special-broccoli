"use client";

import { Navbar } from "@/components/navbar";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
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
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <Navbar />
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
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
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
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
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
      <section className="py-32 bg-white">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="text-[#ff751f]">Blogsmith</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to create, publish, and grow your blog
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-4">
            {[
              {
                icon: "✍️",
                title: "Rich Text Editor",
                description:
                  "Powerful editor with formatting, images, code blocks, and more. Write like a pro.",
              },
              {
                icon: "🏷️",
                title: "Smart Categories",
                description:
                  "Organize your content effortlessly. Help readers discover your best work.",
              },
              {
                icon: "⚡",
                title: "Lightning Fast",
                description:
                  "Built with Next.js and optimized for speed. Your readers will love the experience.",
              },
              {
                icon: "🤖",
                title: "AI Powered",
                description:
                  "Enhance your creativity with AI-assisted summaries and content suggestions.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-linear-to-r from-[#ff751f]/10 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center min-h-80">
                  <div className="text-6xl mb-6">{feature.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-32 bg-linear-to-tr from-[#ff751f] to-[#8f3700] relative overflow-hidden">
        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Join our community of writers and share your unique voice with the
              world.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/blog/new"
                className="inline-flex items-center px-10 py-5 bg-white text-[#ff751f] text-lg font-bold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                <span>Create Your First Post</span>
                <svg
                  className="ml-2 w-6 h-6"
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
          </motion.div>
        </div>
      </section>
      <footer className="bg-black text-white py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 mx-4 md:col-span-2 ">
              <Image
                src="/assets/images/BSlogo.png"
                alt="Blogsmith Logo"
                width={300}
                height={80}
                priority
              />
              <p className="text-gray-400 mb-6 max-w-md md:text-xl sm:text-xs text-justify ">
                A modern blogging platform built for writers who care about
                their craft. Create, publish, and share your stories with ease.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-400 hover:text-[#ff751f] transition-colors"
                  >
                    All Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className="text-gray-400 hover:text-[#ff751f] transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/categories"
                    className="text-gray-400 hover:text-[#ff751f] transition-colors"
                  >
                    Categories
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Tech Stack</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Next.js 15</li>
                <li>TypeScript</li>
                <li>tRPC</li>
                <li>PostgreSQL</li>
                <li>Tailwind CSS</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>
              © 2025 <span className="text-white font-semibold">Blogsmith</span>
              . Built with passion, ☕ and ❤️ for writers everywhere.
            </p>
            <p className="mt-2">
              <span className="text-gray-500">Created by</span>{" "}
              <span className="text-white font-medium">
                Jyotiraditya Gautam
              </span>{" "}
              (
              <a
                href="https://www.linkedin.com/in/jyotiraditya-gautam/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                LinkedIn
              </a>
              {"  |  "}
              <a
                href="https://github.com/Jyotir-1924"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                GitHub
              </a>
              )
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
