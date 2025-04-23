import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto p-6 sm:p-12">
        {/* Heading Section */}
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            About BlogApp
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            BlogApp is a platform where users can create, read, update, and delete blog posts.
            It helps users share their knowledge, experiences, and stories with the world.
          </p>
        </div>

        {/* App Features Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Features</h2>
            <ul className="list-disc text-lg text-gray-700 dark:text-gray-300 space-y-2">
              <li>Create blog posts with rich content</li>
              <li>Manage posts through a simple interface</li>
              <li>Login and signup to manage your posts</li>
              <li>Light and dark mode for a comfortable experience</li>
            </ul>
          </div>

          {/* App Purpose Section */}
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Purpose</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Our goal is to provide a simple and efficient blogging platform for users to share
              their thoughts and ideas. Whether you're a hobbyist or a professional writer, BlogApp
              offers the tools you need to express yourself online.
            </p>
          </div>
        </div>

        {/* Contact Section (Optional) */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Contact</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            If you have any questions or feedback, feel free to reach out!
          </p>
          <Link to="/contact" className="text-blue-600 hover:underline">
            Go to Contact Page
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; 2025 BlogApp. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
