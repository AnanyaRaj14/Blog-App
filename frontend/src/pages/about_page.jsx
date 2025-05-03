import { Link } from "react-router-dom";
import { FaFeatherAlt, FaEdit, FaUserLock, FaMoon } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-12 sm:py-20">

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            About <span className="text-blue-600">BlogApp</span>
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            BlogApp is a platform where users can create, read, update, and delete blog posts.
            It helps users share their knowledge, experiences, and stories with the world
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-2xl transition">
            <h2 className="text-2xl font-semibold text-blue-600 mb-6">✨ Features</h2>
            <ul className="space-y-4 text-gray-700 dark:text-gray-300 text-lg">
              <li className="flex items-center gap-3">
                <FaFeatherAlt className="text-blue-500" />
                Create blog posts with rich content
              </li>
              <li className="flex items-center gap-3">
                <FaEdit className="text-blue-500" />
                Manage posts through an intuitive interface
              </li>
              <li className="flex items-center gap-3">
                <FaUserLock className="text-blue-500" />
                Secure login and signup system
              </li>
              <li className="flex items-center gap-3">
                <FaMoon className="text-blue-500" />
                Light & dark mode support
              </li>
            </ul>
          </div>

          {/* Purpose Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-2xl transition">
            <h2 className="text-2xl font-semibold text-blue-600 mb-6">🎯 Purpose</h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              Our mission is to provide a distraction-free, simple, and elegant blogging experience. Whether you're a professional writer or a casual creator, BlogApp offers the perfect tools to express yourself.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">📩 Contact Us</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            Have questions, suggestions, or just want to say hi?
          </p>
          <Link
            to="/contact"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition"
          >
            Go to Contact Page
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-24 text-center py-6 border-t border-gray-300 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} BlogApp. All rights reserved to Ananya Raj.
        </footer>

      </div>
    </div>
  );
};

export default About;
