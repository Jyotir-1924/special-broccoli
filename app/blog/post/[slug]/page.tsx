"use client";

import { Navbar } from "@/components/navbar";
import { trpc } from "@/lib/trpc";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  const {
    data: post,
    isLoading,
    error,
  } = trpc.posts.getBySlug.useQuery({ slug });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-[#ff751f]"></div>
            <p className="mt-4 text-gray-600 text-lg">Loading post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
          <div className="text-center py-20 bg-white rounded-xl border shadow-sm">
            <div className="text-6xl mb-4">😕</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Post Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              The blog post you're looking for doesn't exist.
            </p>
            <Link
              href="/blog"
              className="text-[#ff751f] hover:text-[#e66a1a] font-semibold text-lg"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/blog"
            className="text-[#ff751f] hover:text-[#e66a1a] font-medium mb-6 inline-flex items-center gap-2 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blog
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg border p-8 md:p-12 mt-6"
        >
          {/* Header */}
          <header className="mb-8 border-b pb-6">
            {/* Author Info */}
            {post.author && (
              <Link
                href={`/author/${post.author.id}`}
                className="flex items-center gap-3 mb-6 group w-fit"
              >
                {post.author.image ? (
                  <Image
                    src={post.author.image}
                    alt={post.author.name || "Author"}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 bg-linear-to-r from-[#ff751f] to-[#e66a1a] rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    {post.author.name?.charAt(0).toUpperCase() || "A"}
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-[#ff751f] transition-colors">
                    {post.author.name || "Anonymous"}
                  </p>
                  <p className="text-xs text-gray-500">Author</p>
                </div>
              </Link>
            )}

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-gray-600 text-sm">
              <time
                dateTime={post.createdAt.toString()}
                className="flex items-center gap-1"
              >
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {formattedDate}
              </time>
              {!post.published && (
                <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full font-medium">
                  Draft
                </span>
              )}
            </div>
          </header>

          <div
            className="max-w-none text-black leading-relaxed
            [&_ul]:list-disc [&_ul]:ml-8 [&_ul]:my-4
            [&_ol]:list-decimal [&_ol]:ml-8 [&_ol]:my-4
            [&_li]:my-2 [&_li]:leading-relaxed
            [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:my-6
            [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:my-5
            [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:my-4
            [&_p]:my-4 [&_p]:leading-relaxed
            [&_strong]:font-bold
            [&_em]:italic
            [&_blockquote]:border-l-4 [&_blockquote]:border-[#ff751f] [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:my-6 [&_blockquote]:text-gray-700
            [&_pre]:bg-gray-900 [&_pre]:text-white [&_pre]:p-6 [&_pre]:rounded-lg [&_pre]:my-6 [&_pre]:overflow-x-auto
            [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono
            [&_a]:text-[#ff751f] [&_a]:underline [&_a]:hover:text-[#e66a1a]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 pt-8 border-t flex gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={`/blog/edit/${post.id}`}
                className="px-6 py-3 bg-[#ff751f] text-white rounded-lg hover:bg-[#e66a1a] transition-colors font-medium inline-flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit Post
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </article>
    </div>
  );
}
