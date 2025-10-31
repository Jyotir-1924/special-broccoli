"use client";

import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
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
              A modern blogging platform built for writers who care about their
              craft. Create, publish, and share your stories with ease.
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
};
