"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export const StarterSection = () => {
  return (
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
  );
};
