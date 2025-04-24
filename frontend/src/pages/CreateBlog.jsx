// src/pages/CreateBlog.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleCreateBlog = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/blog/create", {
        title,
        content,
      });
      if (response.data.message === "Blog created successfully") {
        alert("Blog created successfully!");
        navigate("/myblogs"); // Redirect to the user's blogs page
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Failed to create blog: " + error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-6 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Create New Blog</h2>
      <form onSubmit={handleCreateBlog} className="space-y-4">
        <input
          type="text"
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog title"
        />
        <textarea
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter blog content"
          rows="8"
        />
        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
