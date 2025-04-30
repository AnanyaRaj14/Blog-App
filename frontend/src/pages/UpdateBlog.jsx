// src/pages/UpdateBlog.js
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { uploadImageToCloudinary } from "../utils"; // Make sure this function is available

const UpdateBlog = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(""); // State to hold current image URL
  const [imageToUpload, setImageToUpload] = useState(null); // State for the new image file
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the blog data by ID to pre-fill the form
    axios
      .get(`http://localhost:8000/api/blog/get/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
        setImage(res.data.image); // Set the image URL from the current blog data
      })
      .catch((err) => console.error("Error loading blog:", err));
  }, [id]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const imageUrl = await uploadImageToCloudinary(file);
      console.log("Uploaded image URL:", imageUrl);
      setImageToUpload(imageUrl); // Set the new image URL for uploading
    } catch (err) {
      alert("Image upload failed");
    }
  };

  const handleUpdateBlog = async (e) => {
    e.preventDefault();
    try {
      const blogData = {
        title,
        content,
        image: imageToUpload || image, // If there's a new image, use it; otherwise, use the old one
      };

      const response = await axios.put(`http://localhost:8000/api/blog/update/${id}`, blogData);
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
          placeholder="Enter blog title"
        />
        <textarea
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter blog content"
          rows="8"
        />

        {/* Image Upload Input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
        />

        {/* Preview the uploaded image */}
        {imageToUpload && (
          <div className="mt-4">
            <img src={imageToUpload} alt="Preview" className="rounded shadow max-h-64" />
          </div>
        )}
        {image && !imageToUpload && (
          <div className="mt-4">
            <h4>Current Image:</h4>
            <img src={image} alt="Current" className="rounded shadow max-h-64" />
          </div>
        )}

        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default UpdateBlog;
