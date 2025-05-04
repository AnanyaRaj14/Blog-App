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
    <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900 py-12 px-6">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 text-center mb-6">
          Edit Your Blog
        </h2>
        <form onSubmit={handleUpdateBlog} className="space-y-6">
          {/* Blog Title */}
          <div>
            {/* <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Blog Title</label> */}
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your blog title"
            />
          </div>

          {/* Blog Content */}
          <div>
            {/* <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Blog Content</label> */}
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog content here"
              rows="6"
            />
          </div>

          {/* Image Upload Input */}
          <div>
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
            />
          </div>

          {/* Image Preview */}
          <div className="mt-4">
            {imageToUpload && (
              <div>
                <h4 className="text-lg text-gray-700 dark:text-gray-300 mb-2">New Image Preview</h4>
                <img src={imageToUpload} alt="Preview" className="rounded-lg shadow-md max-h-64 mx-auto" />
              </div>
            )}
            {image && !imageToUpload && (
              <div>
                <h4 className="text-lg text-gray-700 dark:text-gray-300 mb-2">Current Image</h4>
                <img src={image} alt="Current" className="rounded-lg shadow-md max-h-64 mx-auto" />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
          type="submit"
          className="w-full py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow hover:from-blue-700 hover:to-purple-700 transition duration-300"
        >
          Update Blog
        </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlog;
