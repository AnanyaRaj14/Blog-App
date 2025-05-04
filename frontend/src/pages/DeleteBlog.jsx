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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-md w-full p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
          Are you sure you want to delete this blog?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">
          Deleting this blog cannot be undone. Please confirm your action.
        </p>
        
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleDeleteBlog}
            className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition duration-300"
          >
            Delete Blog
          </button>
          <button
            onClick={() => navigate("/myblogs")}
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-400 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBlog;
