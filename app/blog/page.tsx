"use client";

import { Navbar } from "@/components/navbar";
import { BlogCard } from "@/components/blog-card";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);

  const { data: posts, isLoading: postsLoading } = trpc.posts.getAll.useQuery({
    published: true,
    categoryId: selectedCategory,
  });

  const { data: categories } = trpc.categories.getAll.useQuery();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            All Blog Posts
          </h1>
          <p className="text-gray-600 text-lg">
            Discover stories, thinking, and expertise from writers on any topic.
          </p>
        </motion.div>

        {categories && categories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Filter by Category
            </label>
            <div className="flex flex-wrap gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(undefined)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === undefined
                    ? "bg-[#ff751f] text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-[#ff751f]"
                }`}
              >
                All Posts
              </motion.button>
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? "bg-[#ff751f] text-white shadow-md"
                      : "bg-white text-gray-700 border border-gray-300 hover:border-[#ff751f]"
                  }`}
                >
                  {category.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
        {postsLoading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-[#ff751f]"></div>
            <p className="mt-4 text-gray-600 text-lg">Loading posts...</p>
          </div>
        ) : posts && posts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-2"
          >
            {posts.map((post) => (
              <BlogCard
                key={post.id}
                id={post.id}
                title={post.title}
                content={post.content}
                slug={post.slug}
                published={post.published}
                createdAt={post.createdAt}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20 bg-white rounded-xl border shadow-sm"
          >
            <div className="text-6xl mb-4">📝</div>
            <p className="text-gray-600 text-xl mb-6">No blog posts yet.</p>
            <Link
              href="/blog/new"
              className="text-[#ff751f] hover:text-[#e66a1a] font-semibold text-lg"
            >
              Be the first to write a post →
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}