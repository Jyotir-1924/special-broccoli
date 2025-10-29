"use client";

import { Navbar } from "@/components/navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status, update } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/signin");
    },
  });

  const [name, setName] = useState(session?.user?.name || "");
  const [bio, setBio] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    setIsSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, bio }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      await update({ name });
      setMessage("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      setMessage("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (status === "loading") {
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
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Your Profile
          </h1>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-linear-to-r from-[#ff751f] to-[#e66a1a] px-8 py-12">
              <div className="flex items-center gap-6">
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    width={100}
                    height={100}
                    className="rounded-full border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-[#ff751f] text-4xl font-bold shadow-lg">
                    {session?.user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
                <div className="text-white">
                  <h2 className="text-3xl font-bold mb-1">{session?.user?.name}</h2>
                  <p className="text-white/90">{session?.user?.email}</p>
                </div>
              </div>
            </div>
            <div className="p-8">
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-6 p-4 rounded-lg ${
                    message.includes("success")
                      ? "bg-green-50 border border-green-200 text-green-700"
                      : "bg-red-50 border border-red-200 text-red-700"
                  }`}
                >
                  {message}
                </motion.div>
              )}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Display Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff751f] focus:border-transparent transition-all"
                      placeholder="Your name"
                    />
                  ) : (
                    <p className="text-lg text-gray-900">{session?.user?.name || "Not set"}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <p className="text-lg text-gray-900">{session?.user?.email}</p>
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={4}
                      className="text-gray-700 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff751f] focus:border-transparent transition-all"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="text-lg text-gray-900">{bio || "No bio yet"}</p>
                  )}
                </div>
                <div className="flex gap-4 pt-4">
                  {isEditing ? (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-6 py-3 bg-linear-to-r from-[#ff751f] to-[#e66a1a] text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                      >
                        {isSaving ? "Saving..." : "Save Changes"}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setIsEditing(false);
                          setName(session?.user?.name || "");
                          setBio("");
                        }}
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                      >
                        Cancel
                      </motion.button>
                    </>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsEditing(true)}
                      className="px-6 py-3 bg-linear-to-r from-[#ff751f] to-[#e66a1a] text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                      Edit Profile
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
            >
              <h3 className="text-gray-500 text-sm font-medium mb-2">Total Posts</h3>
              <p className="text-3xl font-bold text-gray-900">0</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
            >
              <h3 className="text-gray-500 text-sm font-medium mb-2">Published</h3>
              <p className="text-3xl font-bold text-green-600">0</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
            >
              <h3 className="text-gray-500 text-sm font-medium mb-2">Drafts</h3>
              <p className="text-3xl font-bold text-yellow-600">0</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}