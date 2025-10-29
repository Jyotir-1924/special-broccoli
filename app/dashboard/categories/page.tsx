"use client";

import { Navbar } from "@/components/navbar";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { motion } from "framer-motion";

export default function CategoriesPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const { data: categories, refetch } = trpc.categories.getAll.useQuery();

  const createCategory = trpc.categories.create.useMutation({
    onSuccess: () => {
      setName("");
      setDescription("");
      refetch();
    },
  });

  const updateCategory = trpc.categories.update.useMutation({
    onSuccess: () => {
      setEditingId(null);
      setName("");
      setDescription("");
      refetch();
    },
  });

  const deleteCategory = trpc.categories.delete.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateCategory.mutate({ id: editingId, name, description });
    } else {
      createCategory.mutate({ name, description });
    }
  };

  const handleEdit = (category: any) => {
    setEditingId(category.id);
    setName(category.name);
    setDescription(category.description || "");
  };

  const handleDelete = (id: number, name: string) => {
    if (confirm(`Delete category "${name}"? This action cannot be undone.`)) {
      deleteCategory.mutate({ id });
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setName("");
    setDescription("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Manage Categories
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            Organize your blog posts with categories
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md border p-6 mb-8 text-gray-600"
        >
          <h2 className="text-xl font-semibold mb-4 text-black">
            {editingId ? "Edit Category" : "Create New Category"}
          </h2>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Category Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff751f] focus:border-transparent transition-all"
              placeholder="e.g., Technology, Travel, Food"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Description (Optional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff751f] focus:border-transparent transition-all"
              placeholder="Brief description of this category..."
            />
          </div>

          <div className="flex gap-4">
            <motion.button
              type="submit"
              disabled={createCategory.isPending || updateCategory.isPending}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-[#ff751f] text-white rounded-lg hover:bg-[#e66a1a] transition-colors font-semibold disabled:opacity-50"
            >
              {editingId ? "Update" : "Create"} Category
            </motion.button>
            {editingId && (
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCancel}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
              >
                Cancel
              </motion.button>
            )}
          </div>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-xl shadow-md border overflow-hidden"
        >
          <h2 className="text-xl font-semibold p-6 border-b bg-gray-50 text-black">
            All Categories
          </h2>
          {categories && categories.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categories.map((category) => (
                    <motion.tr
                      key={category.id}
                    >
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        {category.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {category.description || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(category)}
                          className="text-blue-600 hover:text-blue-900 mr-4 transition-colors font-bold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            handleDelete(category.id, category.name)
                          }
                          className="text-red-600 hover:text-red-900 transition-colors font-bold"
                        >
                          Delete
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-600">
              <div className="text-5xl mb-3">📁</div>
              <p className="text-lg">
                No categories yet. Create your first category above.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
