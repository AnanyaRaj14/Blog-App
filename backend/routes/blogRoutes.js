const express = require('express');
const { createBlogPost, getAllBlogs, getSinglePostById, getLatestBlogs, updatePost, deletePost } = require('../controllers/blogController');
const verifyToken = require('../middleware/authMiddleware.jsx');
const router = express.Router();

// Protect create, update, delete
router.post('/create', createBlogPost);
router.post('/update/:id', updatePost);
router.delete('/delete/:id', deletePost);
router.get('/latest', verifyToken, getLatestBlogs);

// Public routes
router.get('/getall', getAllBlogs);
router.get('/get/:id', getSinglePostById);




module.exports = router;