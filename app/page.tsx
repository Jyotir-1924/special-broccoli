import Link from "next/link";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Share Your Stories with the World
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              A modern blogging platform for writers and readers
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/blog"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Read Blogs
              </Link>
              <Link
                href="/blog/new"
                className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition border border-white"
              >
                Start Writing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Why Choose Our Platform?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <div className="text-blue-600 text-4xl mb-4">✍️</div>
              <h3 className="text-xl font-semibold mb-3">Easy Writing</h3>
              <p className="text-gray-600">
                Simple and intuitive editor to write and publish your content
                in minutes.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <div className="text-blue-600 text-4xl mb-4">🏷️</div>
              <h3 className="text-xl font-semibold mb-3">Organized</h3>
              <p className="text-gray-600">
                Categorize your posts and help readers find exactly what they
                are looking for.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border">
              <div className="text-blue-600 text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-3">Fast & Modern</h3>
              <p className="text-gray-600">
                Built with cutting-edge technology for the best performance and
                user experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 BlogPlatform. Built with Next.js, tRPC, and PostgreSQL.
          </p>
        </div>
      </footer>
    </div>
  );
}