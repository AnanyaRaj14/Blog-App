// src/pages/ViewBlog.js
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewBlog = () => {
  const { id } = useParams(); // get blog ID from URL
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/blog/get/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id]); // dependency array to run only on mount or when id changes

  if (!blog) return <p className="text-center mt-12">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-blue-600 dark:text-blue-400">{blog.title}</h1>
      <p className="text-gray-700 dark:text-gray-300">{blog.content}</p>
    </div>
  );
};

export default ViewBlog;