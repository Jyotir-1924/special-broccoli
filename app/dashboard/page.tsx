"use client";

import { Navbar } from "@/components/navbar";
import { trpc } from "@/lib/trpc";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/signin");
    },
  });

  const { data: allPosts, isLoading } = trpc.posts.getAll.useQuery();
  const deletePost = trpc.posts.delete.useMutation({
    onSuccess: () => window.location.reload(),
    onError: (error) => alert(error.message),
  });

  
  const userPosts =
    allPosts?.filter((post) => post.authorId === session?.user?.id) || [];
  const publishedPosts = userPosts.filter((post) => post.published);
  const draftPosts = userPosts.filter((post) => !post.published);

  const handleDelete = (id: number, title: string) => {
    if (!session?.user?.id) return;

    if (
      confirm(
        `Are you sure you want to delete "${title}"? This action cannot be undone.`
      )
    ) {
      deletePost.mutate({
        id,
        userId: session.user.id,
      });
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#ff751f]"></div>
        </div>
      </div>
    );
  }

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
            Dashboard
          </h1>
          <p className="text-gray-600 text-lg">Manage your blog posts</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#ff751f]"
          >
            <h3 className="text-gray-500 text-sm font-medium mb-2">
              Total Posts
            </h3>
            <p className="text-4xl font-bold text-gray-900">
              {userPosts.length}
            </p>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500"
          >
            <h3 className="text-gray-500 text-sm font-medium mb-2">
              Published
            </h3>
            <p className="text-4xl font-bold text-green-600">
              {publishedPosts.length}
            </p>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500"
          >
            <h3 className="text-gray-500 text-sm font-medium mb-2">Drafts</h3>
            <p className="text-4xl font-bold text-yellow-600">
              {draftPosts.length}
            </p>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Published Posts
          </h2>
          {publishedPosts.length === 0 ? (
            <div className="bg-white rounded-xl border p-8 text-center text-gray-600">
              <div className="text-5xl mb-3">📝</div>
              <p className="text-lg">No published posts yet.</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md border overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                      Created
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {publishedPosts.map((post) => (
                    <motion.tr
                      key={post.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ backgroundColor: "#f9fafb" }}
                    >
                      <td className="px-4 sm:px-6 py-4">
                        <Link
                          href={`/blog/post/${post.slug}`}
                          className="text-[#ff751f] hover:text-[#e66a1a] font-medium text-sm wrap-break-word transition-colors"
                        >
                          {post.title}
                        </Link>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          href={`/blog/edit/${post.id}`}
                          className="text-blue-600 hover:text-blue-900 mr-2 sm:mr-4 transition-colors"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id, post.title)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Drafts
          </h2>
          {draftPosts.length === 0 ? (
            <div className="bg-white rounded-xl border p-8 text-center text-gray-600">
              <div className="text-5xl mb-3">✅</div>
              <p className="text-lg">No drafts.</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md border overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                      Created
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {draftPosts.map((post) => (
                    <motion.tr
                      key={post.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ backgroundColor: "#f9fafb" }}
                    >
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex flex-col sm:flex-row sm:items-center">
                          <span className="text-gray-900 font-medium text-sm wrap-break-word">
                            {post.title}
                          </span>
                          <span className="mt-1 sm:mt-0 sm:ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full inline-block w-fit font-medium">
                            Draft
                          </span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          href={`/blog/edit/${post.id}`}
                          className="text-blue-600 hover:text-blue-900 mr-2 sm:mr-4 transition-colors"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id, post.title)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}