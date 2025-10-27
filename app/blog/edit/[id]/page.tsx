"use client";

import { Navbar } from "@/components/navbar";
import { RichTextEditor } from "@/components/rich-text-editor";
import { trpc } from "@/lib/trpc";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = parseInt(params.id as string);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const { data: post, isLoading } = trpc.posts.getById.useQuery({ id: postId });
  const { data: categories } = trpc.categories.getAll.useQuery();
  const updatePost = trpc.posts.update.useMutation({
    onSuccess: (data) => {
      router.push(`/blog/post/${data.slug}`);
    },
  });
  const deletePost = trpc.posts.delete.useMutation({
    onSuccess: () => {
      router.push("/dashboard");
    },
  });

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setPublished(post.published);
      setSelectedCategories(post.categoryIds || []);
    }
  }, [post]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePost.mutate({
      id: postId,
      title,
      content,
      published,
      categoryIds: selectedCategories,
    });
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      deletePost.mutate({ id: postId });
    }
  };

  const toggleCategory = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-[#ff751f]"></div>
            <p className="mt-4 text-gray-600 text-lg">Loading post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
          <div className="text-center py-20 bg-white rounded-xl border shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Edit Post</h1>
          <p className="text-gray-600 mb-8">Update your blog post</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg border p-8"
        >
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff751f] focus:border-transparent transition-all"
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
            />
          </div>
          {categories && categories.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Categories
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
              <span className="ml-3 text-sm font-medium text-gray-700">Published</span>
            </label>
          </div>
          <div className="flex flex-wrap gap-4">
            <motion.button
              type="submit"
              disabled={updatePost.isPending}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 bg-[#ff751f] text-white rounded-lg hover:bg-[#e66a1a] transition-colors font-semibold disabled:opacity-50"
            >
              {updatePost.isPending ? "Updating..." : "Update Post"}
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
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDelete}
              disabled={deletePost.isPending}
              className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold disabled:opacity-50 ml-auto"
            >
              {deletePost.isPending ? "Deleting..." : "Delete Post"}
            </motion.button>
          </div>

          {updatePost.error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-red-600 text-sm"
            >
              {updatePost.error.message}
            </motion.p>
          )}
        </motion.form>
      </div>
    </div>
  );
}