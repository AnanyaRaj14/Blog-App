// src/pages/DeleteBlog.js
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DeleteBlog = ({ id }) => {
  const navigate = useNavigate();

  const handleDeleteBlog = async () => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/blog/delete/${id}`);
      if (response.data.message === "Blog deleted successfully") {
        alert("Blog deleted!");
        navigate("/myblogs"); // Redirect to the blogs list after deletion
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Delete failed: " + error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="text-center">
      <button
        onClick={handleDeleteBlog}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Delete Blog
      </button>
    </div>
  );
};

export default DeleteBlog;
