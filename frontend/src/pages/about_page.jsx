import { Link } from "react-router-dom";
import { FaFeatherAlt, FaEdit, FaUserLock, FaMoon } from "react-icons/fa";
import Footer from "../pages/footer_page";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-12 sm:py-20 flex-grow">

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            About <span className="text-blue-600">TalkTrail</span>
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            TalkTrail is a platform where users can create, read, update, and delete blog posts.
            It helps users share their knowledge, experiences, and stories with the world.
          </p>
        </div>

        {/* Features Section */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
  {/* Features Card */}
  <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-[1.02]">
    <h2 className="text-2xl font-semibold text-blue-600 mb-6 flex items-center gap-2">
      ✨ Platform Highlights
    </h2>
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <FaFeatherAlt className="text-2xl text-blue-500 mt-1" />
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Express Freely</h3>
          <p className="text-gray-700 dark:text-gray-300">Craft thoughtful blogs using a clean, intuitive editor. No clutter — just your words.</p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <FaEdit className="text-2xl text-blue-500 mt-1" />
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Edit with Ease</h3>
          <p className="text-gray-700 dark:text-gray-300">Update and manage your content effortlessly, even after publishing.</p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <FaUserLock className="text-2xl text-blue-500 mt-1" />
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Safe & Secure</h3>
          <p className="text-gray-700 dark:text-gray-300">Your data and ideas are protected with modern authentication and secure storage.</p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <FaMoon className="text-2xl text-blue-500 mt-1" />
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Day or Night</h3>
          <p className="text-gray-700 dark:text-gray-300">Switch between light and dark modes for a writing experience that suits your mood.</p>
        </div>
      </div>
    </div>
  </div>

  {/* Purpose Card */}
  <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-[1.02]">
    <h2 className="text-2xl font-semibold text-blue-600 mb-6 flex items-center gap-2">
      🎯 Why TalkTrail?
    </h2>
    <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
    Our mission is to provide a distraction-free, simple, and elegant blogging experience. Whether you're a professional writer or a casual creator, TalkTrail offers the perfect tools to express yourself.
    </p>
    <p className="mt-4 text-gray-700 dark:text-gray-300 text-lg">
      Whether you're a seasoned blogger or just starting out, TalkTrail gives you the tools to write confidently and connect authentically.
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
      </div>

      {/* Footer */}
      <div className="mt-24">
        <Footer />
      </div>
    </div>
  );
};

export default About;
