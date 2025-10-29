"use client";

import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const [theme, setTheme] = useState("light");
  const [name, setName] = useState(session?.user?.name || "");
  const [email] = useState(session?.user?.email || "");

  if (status === "loading") return <p className="p-8">Loading...</p>;
  if (!session) redirect("/auth/signin");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    alert("Settings saved successfully (mock)");
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 border border-gray-200"
      >
        {}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Account Settings</h1>
            <p className="text-gray-500">Manage your profile and preferences</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
          >
            Sign out
          </button>
        </div>

        {}
        <form onSubmit={handleSave} className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Profile</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff751f] focus:border-transparent"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  value={email}
                  disabled
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Appearance</h2>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  checked={theme === "light"}
                  onChange={() => setTheme("light")}
                  className="text-[#ff751f] focus:ring-[#ff751f]"
                />
                <span>Light</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  checked={theme === "dark"}
                  onChange={() => setTheme("dark")}
                  className="text-[#ff751f] focus:ring-[#ff751f]"
                />
                <span>Dark</span>
              </label>
            </div>
          </div>

          {}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Security</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-600 mb-2">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff751f] focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600 mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff751f] focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {}
          <div className="pt-4 border-t border-gray-200">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-linear-to-r from-[#ff751f] to-[#e66a1a] text-white rounded-lg font-semibold shadow hover:shadow-lg transition-all"
            >
              Save Changes
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}