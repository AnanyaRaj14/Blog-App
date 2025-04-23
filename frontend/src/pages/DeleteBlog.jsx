import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DeleteBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/blog/get/${id}`)
      .then((res) => setBlog(res.data))
      .catch((err) => console.error("Error fetching blog:", err));
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/blog/delete/${id}`);
      alert("Blog deleted.");
      navigate("/myblogs");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete blog.");
    }
  };

  if (!blog) return <p className="text-center mt-12">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Delete Blog</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">Are you sure you want to delete <strong>{blog.title}</strong>?</p>
      <div className="flex gap-4">
        <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Delete
        </button>
        <button onClick={() => navigate(-1)} className="bg-gray-300 dark:bg-gray-600 text-black dark:text-white px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteBlog;
