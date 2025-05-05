// src/pages/MyBlogs.js
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState([])
  // const user = JSON.parse(localStorage.getItem("user"));

  const fetchBlog = async () => {
    try {
      console.log(user);
      const response = await axios.get("http://localhost:8000/api/blog/getall");

      // Filter blogs authored by the current user
      const userBlogs = response.data.filter((blog) =>
        blog.author === user?.id || blog.author?._id === user?.id
      );

      setBlogs(userBlogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    const userToken = Cookies.get('token');
    if (userToken) {
      try {
        const decoded = jwtDecode(userToken);
        setUser(decoded);
        console.log(decoded);
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


  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        My Blogs
      </h1>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          No blogs found.{" "}
          <Link to="/create" className="text-blue-500 underline">
            Create one
          </Link>
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white dark:bg-gray-800 p-4 rounded shadow"
            >
              <img src={blog.image} alt="image" />
              <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                {blog.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {blog.content}
              </p>
              <div className="flex justify-between text-sm">
                <Link
                  to={`/get/${blog._id}`}
                  className="text-blue-500 hover:underline"
                >
                  View
                </Link>
                <Link
                  to={`/update/${blog._id}`}
                  className="text-yellow-500 hover:underline"
                >
                  Edit
                </Link>
                <Link
                  to={`/delete/${blog._id}`}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBlogs;
