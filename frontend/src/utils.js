import axios from 'axios';

// Cloudinary upload function
export const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "blogApp"); // Replace with your Cloudinary preset

  try {
    const response = await axios.post("https://api.cloudinary.com/v1_1/blogApp/image/upload", formData);
    return response.data.secure_url; // This is the URL of the uploaded image
  } catch (err) {
    throw new Error("Image upload failed");
  }
};
