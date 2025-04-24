// src/pages/UpdateBlog.js
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateBlog = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/blog/get/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
      })
      .catch((err) => console.error("Error loading blog:", err));
  }, [id]);

  const handleUpdateBlog = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/api/blog/update/${id}`, {
        title,
        content,
      });
      if (response.data.message === "Blog updated successfully") {
        alert("Blog updated!");
        navigate("/myblogs");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Update failed: " + error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-6 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Edit Blog</h2>
      <form onSubmit={handleUpdateBlog} className="space-y-4">
        <input
          type="text"
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="8"
        />
        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateBlog;
