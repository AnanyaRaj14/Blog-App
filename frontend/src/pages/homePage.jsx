import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-all">
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to <span className="text-blue-600">BlogApp</span>
        </h1>

        {user ? (
          <div className="mt-6 flex flex-col items-center gap-4">
            <h2 className="text-xl font-semibold">
              Welcome, {user.fullName || user.email}! 👋
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Let’s begin your blogging journey 🚀
            </p>
            <button
              onClick={handleLogout}
              className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <p className="max-w-2xl mx-auto text-lg md:text-xl mb-8">
              Share your thoughts, stories, and expertise with the world. Read amazing content from creators like you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-6 py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                Login
              </Link>
            </div>
          </>
        )}
      </section>

      {/* Featured Blogs */}
      <section className="bg-gray-100 dark:bg-gray-800 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8 text-center">Featured Blogs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 hover:shadow-xl transition"
              >
                <h3 className="text-lg font-semibold mb-2">Sample Blog Title {item}</h3>
                <p className="text-sm mb-4 text-gray-700 dark:text-gray-300">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, officia.
                </p>
                <Link
                  to="/"
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  Read More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} BlogApp. All rights reserved to Ananya Raj.
      </footer>
    </div>
  );
};

export default Home;
