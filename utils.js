import axios from 'axios';

// Cloudinary configuration
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/<blogApp>/upload';
const CLOUDINARY_UPLOAD_PRESET = '<your-upload-preset>';

/**
 * Uploads a file to Cloudinary and returns the uploaded file's URL.
 * @param {File} file - The file object to upload.
 * @returns {Promise<string>} - The URL of the uploaded file.
 */
// export const uploadToCloudinary = async (file) => {
//   try {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

//     const response = await axios.post(CLOUDINARY_URL, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     return response.data.secure_url;
//   } catch (error) {
//     console.error('Cloudinary upload error:', error);
//     throw new Error('File upload failed.');
//   }
// };
