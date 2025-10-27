"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface BlogCardProps {
  id: number;
  title: string;
  content: string;
  slug: string;
  published: boolean;
  createdAt: Date | string;
}

export function BlogCard({
  id,
  title,
  content,
  slug,
  published,
  createdAt,
}: BlogCardProps) {
  const plainText = content.replace(/<[^>]*>/g, "");
  const excerpt =
    plainText.length > 150 ? plainText.substring(0, 150) + "..." : plainText;

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-2xl font-bold text-gray-900 hover:text-[#ff751f] transition-colors">
          <Link href={`/blog/post/${slug}`}>{title}</Link>
        </h2>
        {!published && (
          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
            Draft
          </span>
        )}
      </div>

      <p className="text-gray-600 mb-4 line-clamp-3">{excerpt}</p>

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{formattedDate}</span>
        <Link
          href={`/blog/post/${slug}`}
          className="text-[#ff751f] hover:text-[#e66a1a] font-medium text-sm flex items-center gap-1 transition-colors"
        >
          Read more
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </motion.article>
  );
}
