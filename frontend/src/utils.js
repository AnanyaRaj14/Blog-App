import axios from "axios";
// cloudinary fun
export const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "blogApp"); 
  
    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/blogApp/image/upload", formData);
      return response.data.secure_url;
    } catch (err) {
      console.error("Cloudinary upload error:", err.response?.data || err.message);
      throw new Error("Image upload failed");
    }
  };
  