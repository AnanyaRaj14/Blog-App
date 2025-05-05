const express = require('express');
const { createBlogPost, getAllBlogs, getSinglePostById, getLatestBlogs, updatePost, deletePost } = require('../controllers/blogController');
const verifyToken = require('../middleware/authMiddleware.jsx');
const router  = express.Router();

// Protect create, update, delete
router.post('/create', verifyToken, createBlogPost);
router.put('/update/:id', verifyToken, updatePost);
router.delete('/delete/:id', verifyToken, deletePost);


// Public routes
router.get('/getall', getAllBlogs);
router.get('/get/:id', getSinglePostById);
router.get('/latest', getLatestBlogs); 



module.exports = router;