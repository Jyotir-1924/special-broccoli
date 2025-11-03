"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-6 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 justify-items-center">
          <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-md">
            <Image
              src="/assets/images/BSlogo.png"
              alt="Blogsmith Logo"
              width={300}
              height={80}
              priority
              className="mx-auto md:mx-0 mb-4"
            />
            <p className="text-gray-400 md:text-lg sm:text-sm text-justify md:text-left">
              A modern blogging platform built for writers who care about their
              craft. Create, publish, and share your stories with ease.
            </p>
          </div>
          <div className="text-left">
            <h4 className="font-semibold text-xl mb-4">Quick Links</h4>
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
          <div className="text-left">
            <h4 className="font-semibold text-xl mb-4">Tech Stack</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Next.js 15</li>
              <li>TypeScript</li>
              <li>tRPC</li>
              <li>PostgreSQL</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 text-gray-400 text-center">
          <p>
            © 2025 <span className="text-white font-semibold">Blogsmith</span>.
            Built with passion, ☕ and ❤️ for writers everywhere.
          </p>
          <p className="mt-2">
            <span className="text-gray-500">Created by</span>{" "}
            <span className="text-white font-medium">Jyotiraditya Gautam</span>{" "}
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
  );
}
