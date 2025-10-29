"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

interface BlogCardProps {
  id: number;
  title: string;
  content: string;
  slug: string;
  published: boolean;
  createdAt: Date | string;
  author?: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  } | null;
}

export function BlogCard({ id, title, content, slug, published, createdAt, author }: BlogCardProps) {
  const plainText = content.replace(/<[^>]*>/g, '');
  const excerpt = plainText.length > 150 ? plainText.substring(0, 150) + "..." : plainText;
  
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
      {}
      {author && (
        <Link href={`/author/${author.id}`} className="flex items-center gap-3 mb-4 group">
          {author.image ? (
            <Image
              src={author.image}
              alt={author.name || "Author"}
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <div className="w-10 h-10 bg-linear-to-r from-[#ff751f] to-[#e66a1a] rounded-full flex items-center justify-center text-white font-semibold">
              {author.name?.charAt(0).toUpperCase() || "A"}
            </div>
          )}
          <div>
            <p className="text-sm font-semibold text-gray-900 group-hover:text-[#ff751f] transition-colors">
              {author.name || "Anonymous"}
            </p>
            <p className="text-xs text-gray-500">{formattedDate}</p>
          </div>
        </Link>
      )}

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
        {!author && <span className="text-sm text-gray-500">{formattedDate}</span>}
        <Link
          href={`/blog/post/${slug}`}
          className="text-[#ff751f] hover:text-[#e66a1a] font-medium text-sm flex items-center gap-1 transition-colors ml-auto"
        >
          Read more
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </motion.article>
  );
}