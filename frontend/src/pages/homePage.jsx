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
        console.log(res.data);
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

  console.log(blogs)
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-all">
      <main className="flex-grow pb-24">

        {/* Conditional: Show blogs for logged-in users */}
        <section className="py-20 px-6 text-center bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-all">
          {!user ? (
            <div className="max-w-4xl mx-auto animate-fade-in">
              <h1 className="text-5xl font-extrabold mb-6 tracking-tight">
                Welcome to <span className="text-blue-600">BlogApp</span>
              </h1>
              <p className="text-xl md:text-2xl mb-10 font-light max-w-2xl mx-auto">
                A platform for creators, thinkers, and storytellers. Share your voice with the world.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                <Link
                  to="/signup"
                  className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-6 py-3 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300"
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
              )}
            </div>
          </section>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 w-full text-center py-4 bg-white dark:bg-gray-900 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-300 dark:border-gray-700">
        © {new Date().getFullYear()} BlogApp. All rights reserved to Ananya Raj.
      </footer>


      {/* Background Animation */}
      {/* <div className="absolute inset-0 pointer-events-none">
        <div className="animate-floating-objects">
          <div className="floating-object bg-white dark:bg-gray-400"></div>
          <div className="floating-object bg-yellow-300 dark:bg-yellow-500"></div>
          <div className="floating-object bg-blue-400 dark:bg-blue-500"></div>
          <div className="floating-object bg-green-300 dark:bg-green-500"></div>
        </div>
      </div> */}

      {/* Floating Object Animation Styles */}
      {/* <style jsx>{`
        @keyframes floating {
          0% {
            transform: translateX(0) translateY(0) scale(1);
          }
          25% {
            transform: translateX(30px) translateY(20px) scale(1.1);
          }
          50% {
            transform: translateX(-30px) translateY(-20px) scale(0.9);
          }
          75% {
            transform: translateX(50px) translateY(40px) scale(1.05);
          }
          100% {
            transform: translateX(0) translateY(0) scale(1);
          }
        }

        .animate-floating-objects {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 10;
          pointer-events: none;
        }

        .floating-object {
          position: absolute;
          border-radius: 50%;
          opacity: 0.6;
          animation: floating 10s ease-in-out infinite;
        }

        .floating-object:nth-child(1) {
          width: 120px;
          height: 120px;
          animation-duration: 12s;
          top: 10%;
          left: 30%;
          animation-delay: -3s;
        }

        .floating-object:nth-child(2) {
          width: 100px;
          height: 100px;
          animation-duration: 8s;
          top: 30%;
          left: 60%;
          animation-delay: -2s;
        }

        .floating-object:nth-child(3) {
          width: 140px;
          height: 140px;
          animation-duration: 15s;
          top: 60%;
          left: 40%;
          animation-delay: -1s;
        }

        .floating-object:nth-child(4) {
          width: 110px;
          height: 110px;
          animation-duration: 10s;
          top: 80%;
          left: 80%;
          animation-delay: -4s;
        }
      `}</style> */}
    </div>
  );
};

export default Home;
