import Link from "next/link";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Share Your Stories with the World
            </h1>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-blue-100">
              A modern blogging platform for writers and readers
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/blog"
                className="bg-white text-blue-600 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition text-center"
              >
                Read Blogs
              </Link>
              <Link
                href="/blog/new"
                className="bg-blue-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition border border-white text-center"
              >
                Start Writing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-900">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm border">
              <div className="text-blue-600 text-4xl mb-4">✍️</div>
              <h3 className="text-xl font-semibold mb-3">Easy Writing</h3>
              <p className="text-gray-600">
                Simple and intuitive editor to write and publish your content
                in minutes.
              </p>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm border">
              <div className="text-blue-600 text-4xl mb-4">🏷️</div>
              <h3 className="text-xl font-semibold mb-3">Organized</h3>
              <p className="text-gray-600">
                Categorize your posts and help readers find exactly what they
                are looking for.
              </p>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm border">
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
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-sm sm:text-base">
            © 2025 BlogPlatform. Built with Next.js, tRPC, and PostgreSQL.
          </p>
        </div>
      </footer>
    </div>
  );
}