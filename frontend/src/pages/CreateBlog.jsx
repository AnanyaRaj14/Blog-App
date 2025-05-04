import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { AppContext } from "../components/context/Appcontext";
// import { uploadImageToCloudinary } from "../utils"; // Corrected import

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(""); // State to hold image URL
  const { user } = useContext(AppContext); // Getting user from context
  const navigate = useNavigate();

  const handleCreateBlog = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("User not logged in or missing author ID.");
      return;
    }

    try {
      console.log(user);
      const response = await axios.post(
        "http://localhost:8000/api/blog/create", // Adjust this URL to your API
        {
          title,
          content,
          image, // Send the image URL along with other blog data
          author: user.id, // Send the author's ObjectId
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`, // Include token for authentication
          },
        }
      );

      console.log(response.data);
      if (response.data.message === "Blog created successfully") {
        alert("Blog created successfully!");
        navigate("/myblogs"); 
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      alert(
        "Failed to create blog: " +
        (error.response?.data?.message || error.message)
      );
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "blogApp");
    data.append("cloud_name", "dvjf5bvsw");
  
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dvjf5bvsw/image/upload", {
        method: "POST",
        body: data,
      });
  
      const uploadedImageURL = await res.json();
      console.log(uploadedImageURL.url); // Cloudinary image URL
  
      // Now set the image URL in the state
      setImage(uploadedImageURL.url); // Set the image URL to state
      alert("Image uploaded successfully!");
    } catch (err) {
      alert("Image upload failed");
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

        {/* Image Upload Input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
        />

        {/* Preview the uploaded image */}
        {image && (
          <div className="mt-4">
            <img src={image} alt="Preview" className="rounded shadow max-h-64" />
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow hover:from-blue-700 hover:to-purple-700 transition duration-300"
        >
          🚀 Publish Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
