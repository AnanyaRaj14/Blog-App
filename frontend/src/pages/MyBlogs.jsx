import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?._id) {
      axios
        .get(`http://localhost:8000/api/blog/getall?author=${user._id}`)
        .then((res) => setBlogs(res.data))
        .catch((err) => console.error("Error fetching blogs:", err));
    }
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        My Blogs
      </h1>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          No blogs found. <Link to="/create" className="text-blue-500 underline">Create one</Link>
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
              <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                {blog.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {blog.content}
              </p>
              <div className="flex justify-between text-sm">
                <Link to={`/get/${blog._id}`} className="text-blue-500 hover:underline">View</Link>
                <Link to={`/update/${blog._id}`} className="text-yellow-500 hover:underline">Edit</Link>
                <Link to={`/delete/${blog._id}`} className="text-red-500 hover:underline">Delete</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBlogs;
