import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../components/context/Appcontext";
import Footer from "../pages/footer_page";

const Home = () => {
  const { user, setUser } = useContext(AppContext);
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // state for pagination
  const [loading, setLoading] = useState(false); // state for loading indicator

  // Check for user on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  // Fetch blogs when the user is logged in or when the page changes
  useEffect(() => {
    if (user) {
      fetchBlogs(page);
    } else {
      setBlogs([]);
      setPage(1);
      setHasMore(true);
    }
  }, [user, page]);

  // Function to fetch blogs from the backend
  const fetchBlogs = async (pageNumber) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8000/api/blog/latest?page=${pageNumber}&limit=6`
      );
      const { blogs: newBlogs, hasMore: more } = res.data;

      setBlogs((prev) => (pageNumber === 1 ? newBlogs : [...prev, ...newBlogs]));
      setHasMore(more);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
    setLoading(false);
  };

  // Function to load more blogs
  const handleLoadMore = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Logout function
  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    setUser(null);
    setBlogs([]);
    setPage(1);
    setHasMore(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-200 transition-all">
      <main className="flex-grow pb-24">
        {user ? (
          <>
            <section className="py-20 px-6 text-center bg-white dark:bg-gray-900">
              <p className="text-xl md:text-2xl mb-6 font-light max-w-2xl mx-auto font-serif">
                We're glad to have you here. Stay updated with the latest blogs and share your thoughts with the community.
              </p>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Hello, {user.Name || user.email}! 🚀
              </h1>
              <button
                onClick={handleLogout}
                className="mt-2 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </section>

            <section className="py-12 px-4">
              <div className="max-w-6xl mx-auto">
                {blogs.length === 0 ? (
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    No recent blogs found. Create your first post!
                  </p>
                ) : (
                  <>
                    <div className="grid md:grid-cols-3 gap-8">
                      {blogs.map((blog) => (
                        <div
                          key={blog.id}
                          className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300 transform hover:scale-105"
                        >
                          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                            {blog.title}
                          </h3>
                          <p className="text-sm mb-2 text-gray-500 dark:text-gray-400">
                            by {blog.author?.fullName || "Unknown Author"}
                          </p>
                          <p className="text-sm mb-4 text-gray-700 dark:text-gray-300">
                            {blog.content.length > 100
                              ? `${blog.content.slice(0, 100)}...`
                              : blog.content}
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

                    {loading ? (
                      <div className="mt-10 text-center">Loading...</div>
                    ) : (
                      hasMore && (
                        <div className="mt-10 text-center">
                          <button
                            onClick={handleLoadMore}
                            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
                          >
                            Load More Blogs
                          </button>
                        </div>
                      )
                    )}
                  </>
                )}
              </div>
            </section>
          </>
        ) : (
          <section className="py-20 px-6 text-center bg-transparent">
            <div className="max-w-4xl mx-auto animate-fade-in">
              <h1 className="text-5xl font-extrabold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-purple-600">
                Welcome to <span className="font-bold text-blue-600">TalkTrail</span>
              </h1>
              <p className="text-xl md:text-2xl mb-10 font-light max-w-2xl mx-auto">
                A platform for creators, thinkers, and storytellers. Share your voice with the world.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full hover:from-blue-700 hover:to-purple-700 transition"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-6 py-3 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                  Login
                </Link>
              </div>
              <div className="grid sm:grid-cols-3 gap-8 text-sm md:text-base text-gray-700 dark:text-gray-300 animate-fade-in-slow">
                <div className="flex flex-col items-center">
                  <span className="text-4xl mb-2">✍️</span>
                  <p>Write stories, ideas & tutorials</p>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-4xl mb-2">🌍</span>
                  <p>Reach readers across the globe</p>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-4xl mb-2">🚀</span>
                  <p>Grow your audience & impact</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
