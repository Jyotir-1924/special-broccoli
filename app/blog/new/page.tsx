"use client";

import { Navbar } from "@/components/navbar";
import { RichTextEditor } from "@/components/rich-text-editor";
import { trpc } from "@/lib/trpc";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/signin");
    },
  });

  const { data: categories } = trpc.categories.getAll.useQuery();

  const createPost = trpc.posts.create.useMutation({
    onSuccess: (data) => {
      router.push(`/blog/post/${data.slug}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) {
      router.push("/auth/signin");
      return;
    }

    createPost.mutate({
      title,
      content,
      published,
      categoryIds: selectedCategories,
      authorId: session.user.id,
    });
  };

  const toggleCategory = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Write New Post
          </h1>
          <p className="text-gray-600 mb-8">
            Share your thoughts with the world
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg border p-8"
        >
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff751f] focus:border-transparent transition-all text-black placeholder-gray-400"
              placeholder="Enter an engaging title..."
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Content
            </label>
            <RichTextEditor
              content={content}
              onChange={setContent}
              placeholder="Start writing your amazing content..."
            />
          </div>
          {categories && categories.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Categories (Optional)
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleCategory(category.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategories.includes(category.id)
                        ? "bg-[#ff751f] text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category.name}
                  </motion.button>
                ))}
              </div>
            </div>
          )}
          <div className="mb-8">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="w-5 h-5 text-[#ff751f] border-gray-300 rounded focus:ring-[#ff751f] cursor-pointer"
              />
              <span className="ml-3 text-sm font-medium text-gray-700">
                Publish immediately
              </span>
            </label>
            <p className="text-xs text-gray-500 mt-2 ml-8">
              Uncheck to save as draft
            </p>
          </div>
          <div className="flex gap-4">
            <motion.button
              type="submit"
              disabled={createPost.isPending}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 bg-[#ff751f] text-white rounded-lg hover:bg-[#e66a1a] transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createPost.isPending
                ? "Creating..."
                : published
                ? "Publish Post"
                : "Save Draft"}
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.back()}
              className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              Cancel
            </motion.button>
          </div>

          {createPost.error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-red-600 text-sm"
            >
              {createPost.error.message}
            </motion.p>
          )}
        </motion.form>
      </div>
    </div>
  );
}
