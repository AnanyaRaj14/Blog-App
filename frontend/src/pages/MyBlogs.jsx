import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../components/context/Appcontext";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const MyBlogs = () => {
  const [user, setUser] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [updatedBlog, setUpdatedBlog] = useState({ title: "", content: "", image: "" });

  const { blog, setBlog } = useContext(AppContext);

  const fetchBlog = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/blog/getall");
      // console.log("Fetched blogs:", response.data);

      const userBlogs = Array.isArray(response.data)
        ? response.data.filter(
          (blog) => blog.author === user?.id || blog.author?._id === user?.id
        )
        : [];

      setBlog(userBlogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlog([]); // Fail-safe fallback
    }
  };

  useEffect(() => {
    const userToken = Cookies.get("token");
    if (userToken) {
      try {
        const decoded = jwtDecode(userToken);
        setUser(decoded);
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, []);

  useEffect(() => {
    if (user && user.id) {
      fetchBlog();
    }
  }, [user]);

  const openModal = (blog) => {
    setCurrentBlog(blog);
    setUpdatedBlog({
      title: blog.title,
      content: blog.content,
      image: blog.image || "",
    });
    setShowModal(true);
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/blog/update/${currentBlog._id}`,
        {
          title: updatedBlog.title,
          content: updatedBlog.content,
          image: updatedBlog.image,
          author: user.id,
        }
      );
      if (res.status === 200) {
        fetchBlog();
        setShowModal(false);
      }
    } catch (err) {
      console.error("Failed to update blog:", err.response?.data || err.message);
    }
  };

  const handleDeleptePost = async () => {
    console.log('currentBlog : ', currentBlog);
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/blog/delete/${currentBlog._id}`
      );
      if (res.status === 200) {
        console.log(res.data.message);
        fetchBlog();
        setShowModal(false);
      }
    } catch (err) {
      console.error("Failed to delete blog:", err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        My Blogs
      </h1>

      {!Array.isArray(blog) ? (
        <p className="text-red-500 text-center">Something went wrong loading your blogs.</p>
      ) : blog.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          No blogs found.{" "}
          <Link to="/create" className="text-blue-500 underline">
            Create one
          </Link>
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blog.map((blog) => (
            <div key={blog._id} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
              {blog.image && (
                <img
                  src={blog.image}
                  alt="blog"
                  className="w-full h-40 object-cover rounded mb-4"
                />
              )}
              <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                {blog.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {blog.content}
              </p>
              <div className="flex justify-between text-sm">
                <Link to={`/get/${blog._id}`} className="text-blue-500 hover:underline">
                  View
                </Link>
                <button
                  onClick={() => openModal(blog)}
                  className="text-yellow-500 hover:underline"
                >
                  Edit
                </button>
                <button onClick={handleDeleptePost} className="text-red-500 hover:underline">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
              Update Blog
            </h2>

            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
              Title
              <input
                type="text"
                value={updatedBlog.title}
                onChange={(e) => setUpdatedBlog({ ...updatedBlog, title: e.target.value })}
                className="w-full p-2 border rounded mt-1 dark:bg-gray-700 dark:text-white"
              />
            </label>

            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
              Content
              <textarea
                value={updatedBlog.content}
                onChange={(e) => setUpdatedBlog({ ...updatedBlog, content: e.target.value })}
                rows="4"
                className="w-full p-2 border rounded mt-1 dark:bg-gray-700 dark:text-white"
              />
            </label>

            <label className="block mb-4 text-sm font-medium text-gray-700 dark:text-gray-200">
              Image URL
              <input
                type="text"
                value={updatedBlog.image}
                onChange={(e) => setUpdatedBlog({ ...updatedBlog, image: e.target.value })}
                className="w-full p-2 border rounded mt-1 dark:bg-gray-700 dark:text-white"
              />
            </label>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBlogs;
