import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../components/context/Appcontext";

const Home = () => {
  const { user, setUser } = useContext(AppContext);
  const [blogs, setBlogs] = useState([]);

  // Restore user from localStorage if needed
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Fetch latest blogs for logged-in users
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/blog/latest");
        setBlogs(res.data || []);
      } catch (err) {
        console.error("Error fetching latest blogs:", err);
      }
    };
  
    if (user) fetchBlogs();
  }, [user]);
  
  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-all">
      <main className="flex-grow pb-24">
        
        {/* Conditional: Show blogs for logged-in users */}
        <section className="text-center py-20 px-4">
          {!user ? (
            <>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Welcome to <span className="text-blue-600">BlogApp</span>
              </h1>
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
          ) : (
            <>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Latest Blogs on <span className="text-blue-600">BlogApp</span>
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                Hello, {user.Name || user.email}! 🚀
              </p>
              <button
                onClick={handleLogout}
                className="mt-2 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          )}
        </section>

        {/* Show latest blogs only for logged-in users */}
        {user && (
          <section className="bg-gray-100 dark:bg-gray-800 py-12 px-4">
            <div className="max-w-6xl mx-auto">
              {blogs.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">
                  No recent blogs found. Create your first post!
                </p>
              ) : (
                <div className="grid md:grid-cols-3 gap-8">
                  {blogs.slice(0, 6).map((blog) => (
                    <div
                      key={blog._id}
                      className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 hover:shadow-xl transition"
                    >
                      <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                      <p className="text-sm mb-2 text-gray-500">
                        by {blog.author?.fullName || "Unknown Author"}
                      </p>
                      <p className="text-sm mb-4 text-gray-700 dark:text-gray-300">
                        {blog.content.slice(0, 100)}...
                      </p>
                      <Link
                        to={`/blog/${blog._id}`}
                        className="text-blue-600 hover:underline text-sm font-medium"
                      >
                        Read More →
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 w-full text-center py-4 bg-white dark:bg-gray-900 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-300 dark:border-gray-700">
        © {new Date().getFullYear()} BlogApp. All rights reserved to Ananya Raj.
      </footer>
    </div>
  );
};

export default Home;
