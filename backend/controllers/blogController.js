const BlogPostModel = require('../models/BlogPost');
const EmployeeModel = require('../models/Employee');
// const cloudinary = require('cloudinary').v2;


// cloudinary.config({ 
//     cloud_name: 'blogApp', 
//     api_key: '958773492987471', 
//     api_secret: '6fo-BfciWSOcXAG1Vz8nNl7v5Fg'
//   });

// Create any blog (POST)
const createBlogPost = async (req, res) => {
    const { title, content, author, image } = req.body;

    if (!title || !content || !author) {
        return res.status(400).json({ message: 'Title, content, and author are required.' });
    }

    try {
        const authorExists = await EmployeeModel.findById(author);
        if (!authorExists) {
            return res.status(404).json({ message: 'Author not found.' });
        }

        const newPost = await BlogPostModel.create({ title, content, author });
        return res.status(201).json({ newPost, message: 'Blog created successfully.' });

    } catch (err) {
        return res.status(500).json({ message: 'Error creating blog.', error: err.message });
    }
};

// Get all blogs (GET)
const getAllBlogs = (req, res) => {
    BlogPostModel.find()
        .populate('author', 'fullName email') // optional: to populate author details
        .sort({ createdAt: -1 })
        .then((posts) => res.json(posts))
        .catch((err) =>
            res.status(500).json({ message: 'Error fetching posts.', error: err.message })
        );
};

// Get single blog by ID (GET)
const getSinglePostById = (req, res) => {
    const { id } = req.params;
    BlogPostModel.findById(id)
        .populate('author', 'fullName email') // optional
        .then((post) => {
            if (!post) {
                return res.status(404).json({ message: 'Post not found.' });
            }
            return res.json(post);
        })
        .catch((err) =>
            res.status(500).json({ message: 'Error fetching post.', error: err.message })
        );
};

// Update blog (PUT)
const updatePost = (req, res) => {
    const { id } = req.params;
    const { title, content, author } = req.body;

    if (!title || !content || !author) {
        return res.status(400).json({ message: 'Title, content, and author are required.' });
    }

    BlogPostModel.findByIdAndUpdate(
        id,
        { title, content, author, updatedAt: Date.now() },
        { new: true }
    )
        .then((updatedPost) => {
            if (!updatedPost) {
                return res.status(404).json({ message: 'Post not found.' });
            }
            res.json({ updatedPost, message: 'Post updated successfully.' });
        })
        .catch((err) =>
            res.status(500).json({ message: 'Error updating post.', error: err.message })
        );
};

// Delete blog (DELETE)
const deletePost = (req, res) => {
    const { id } = req.params;

    // Optional role-based restriction
    if (req.user.role !== "ADMIN") {
        return res.status(403).json({ message: "Only admins can delete posts." });
    }


    BlogPostModel.findByIdAndDelete(id)
        .then((deletedPost) => {
            if (!deletedPost) {
                return res.status(404).json({ message: 'Post not found.' });
            }
            res.json({ message: 'Post deleted successfully.' });
        })
        .catch((err) =>
            res.status(500).json({ message: 'Error deleting post.', error: err.message })
        );
};

module.exports = { createBlogPost, getAllBlogs, getSinglePostById, updatePost, deletePost };
