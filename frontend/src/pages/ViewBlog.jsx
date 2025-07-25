import { useState, useEffect, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../components/context/Appcontext";

const ViewBlog = () => {
  const { id } = useParams();
  const location = useLocation();
  const {blog, setBlog, author, setAuthor} = useContext(AppContext);

  // First fetch the blog
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/blog/getall`);
        const foundBlog = response.data.find((blog) => blog._id === id);
        setBlog(foundBlog);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    if (id) fetchBlog();
  }, [id, location.key]);

  // Then fetch the author once blog is available
  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/employee/getall`);
        const foundAuthor = response.data.find((author) => author._id === blog?.author);
        setAuthor(foundAuthor);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    if (blog?.author) fetchAuthor();
  }, [blog]);

  if (!blog) return <p className="text-center mt-12">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow mt-8">
      <h1 className="text-4xl font-bold mb-4 text-blue-600 dark:text-blue-400">
        {blog.title}
      </h1>

      {blog.image && (
        <img
          src={blog.image}
          alt="Blog visual"
          className="w-full h-auto mb-6 rounded shadow"
        />
      )}

      <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        {author?.fullName ? (
          <span>By <strong>{author.fullName}</strong></span>
        ) : (
          <span>By <strong>Unknown Author</strong></span>
        )}
        {blog.createdAt && (
          <span> • {new Date(blog.createdAt).toLocaleDateString()}</span>
        )}
      </div>

      <div className="text-lg leading-relaxed text-gray-700 dark:text-gray-200 whitespace-pre-line">
        {blog.content}
      </div>
    </div>
  );
};

export default ViewBlog;
