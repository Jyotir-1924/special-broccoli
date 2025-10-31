"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface CategorySuggestion {
  name: string;
  description: string;
}

interface AICategorySuggestionsProps {
  onSelectCategory: (name: string, description: string) => void;
}

export function AICategorySuggestions({
  onSelectCategory,
}: AICategorySuggestionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<CategorySuggestion[]>([]);
  const [showCount, setShowCount] = useState(5);
  const [error, setError] = useState("");

  const fetchSuggestions = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/ai/suggest-categories");

      if (!response.ok) {
        throw new Error("Failed to fetch suggestions");
      }

      const data = await response.json();
      setSuggestions(data.categories);
      setIsOpen(true);
      setShowCount(5);  
    } catch (err: any) {
      setError(err.message || "Failed to generate suggestions");
      console.error("Error fetching suggestions:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (category: CategorySuggestion) => {
    onSelectCategory(category.name, category.description);
    setIsOpen(false);
  };

  const handleShowMore = () => {
    setShowCount(10);
  };

  const visibleSuggestions = suggestions.slice(0, showCount);
  const hasMore = suggestions.length > showCount;

  return (
    <div className="relative">
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={fetchSuggestions}
        disabled={isLoading}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
      >
        {isLoading ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
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
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </motion.div>
            <span>Generating...</span>
          </>
        ) : (
          <>
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
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span>Get suggestion from AI</span>
          </>
        )}
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl max-h-[80vh] overflow-hidden"
            >
              <div className="bg-white rounded-2xl shadow-2xl border-2 border-purple-200 overflow-hidden">
                <div className="bg-linear-to-r from-purple-600 to-blue-600 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        AI-Suggested Categories
                      </h3>
                      <p className="text-xs text-white/80">
                        Trending topics for {new Date().getFullYear()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="p-6 overflow-y-auto max-h-[60vh]">
                  {error ? (
                    <div className="text-center py-8">
                      <div className="text-red-600 mb-2">⚠️</div>
                      <p className="text-red-600 font-medium">{error}</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {visibleSuggestions.map((suggestion, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                          onClick={() => handleSelect(suggestion)}
                          className="bg-linear-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 rounded-xl p-4 cursor-pointer border-2 border-transparent hover:border-purple-300 transition-all group"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-lg">
                                  {
                                    [
                                      "🚀",
                                      "💡",
                                      "✨",
                                      "🎯",
                                      "🌟",
                                      "🔥",
                                      "⭐",
                                      "💎",
                                      "🎨",
                                      "📱",
                                    ][index]
                                  }
                                </span>
                                <h4 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                                  {suggestion.name}
                                </h4>
                              </div>
                              <p className="text-sm text-gray-600 leading-relaxed">
                                {suggestion.description}
                              </p>
                            </div>
                            <motion.div
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                              className="ml-4"
                            >
                              <svg
                                className="w-5 h-5 text-purple-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </motion.div>
                          </div>
                        </motion.div>
                      ))}
                      {hasMore && (
                        <motion.button
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleShowMore}
                          className="w-full py-3 bg-linear-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                        >
                          Show more
                        </motion.button>
                      )}
                    </div>
                  )}
                </div>
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center">
                    💡 Click on any category to auto-fill the form • Powered by
                    GPT-3.5
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}