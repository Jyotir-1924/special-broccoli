"use client";

import { Navbar } from "@/components/navbar";
import { BlogCard } from "@/components/blog-card";
import { trpc } from "@/lib/trpc";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AuthorPage() {
  const params = useParams();
  const authorId = params.id as string;

  const { data: author, isLoading: authorLoading } = trpc.users.getById.useQuery({
    id: authorId,
  });

  const { data: posts, isLoading: postsLoading } = trpc.posts.getAll.useQuery({
    published: true,
  });

  const authorPosts = posts?.filter((post) => post.authorId === authorId);

  if (authorLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#ff751f]"></div>
        </div>
      </div>
    );
  }

  if (!author) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
          <div className="text-center py-20 bg-white rounded-xl border">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Author Not Found</h1>
            <p className="text-gray-600">This author doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-12"
        >
          <div className="bg-linear-to-r from-[#ff751f] to-[#e66a1a] px-8 py-16">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {author.image ? (
                <Image
                  src={author.image}
                  alt={author.name || "Author"}
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center text-[#ff751f] text-5xl font-bold shadow-lg">
                  {author.name?.charAt(0).toUpperCase() || "A"}
                </div>
              )}
              <div className="text-white text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold mb-2">{author.name}</h1>
                {author.bio && <p className="text-xl text-white/90">{author.bio}</p>}
                <div className="flex items-center gap-4 mt-4 justify-center md:justify-start">
                  <div>
                    <span className="text-2xl font-bold">{authorPosts?.length || 0}</span>
                    <span className="text-white/90 ml-2">Posts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Posts by {author.name}
          </h2>
          {postsLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#ff751f]"></div>
            </div>
          ) : authorPosts && authorPosts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {authorPosts.map((post) => (
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
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-xl border">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-600 text-lg">No posts yet from this author.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}