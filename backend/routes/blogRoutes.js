const express = require('express');
// const router = require('router');
// const { Router } = require('express');
const { createBlogPost, getAllBlogs, getSinglePostById, updatePost, deletePost } = require('../controllers/blogController');
const verifyToken = require('../middleware/authMiddleware.jsx');

// const verifyToken = require('../middleware/authMiddleware')


const router  = express.Router();

// Protect create, update, delete
router.post('/create', verifyToken, createBlogPost);
router.put('/update/:id', verifyToken, updatePost);
router.delete('/delete/:id', verifyToken, deletePost);

// Public routes
router.get('/getall', getAllBlogs);
router.get('/:id', getSinglePostById);


module.exports = router;