"use client";

import { motion } from "framer-motion";

export const FeaturesSection = () => {

  return (
    <section className="py-32 bg-white">
      <div className="container text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Why Choose <span className="text-[#ff751f]">Blogsmith</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to create, publish, and grow your blog
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-4">
          {[
            {
              icon: "✍️",
              title: "Rich Text Editor",
              description:
                "Powerful editor with formatting, images, code blocks, and more. Write like a pro.",
            },
            {
              icon: "🏷️",
              title: "Smart Categories",
              description:
                "Organize your content effortlessly. Help readers discover your best work.",
            },
            {
              icon: "⚡",
              title: "Lightning Fast",
              description:
                "Built with Next.js and optimized for speed. Your readers will love the experience.",
            },
            {
              icon: "🤖",
              title: "AI Powered",
              description:
                "Enhance your creativity with AI-assisted summaries and content suggestions.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-linear-to-r from-[#ff751f]/10 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center min-h-80">
                <div className="text-6xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
