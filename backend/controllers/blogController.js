const BlogPostModel = require('../models/BlogPost');
const EmployeeModel = require('../models/Employee');


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

        const newPost = await BlogPostModel.create({ title, content, author, image });
        return res.status(201).json({ newPost, message: 'Blog created successfully.' });

    } catch (err) {
        return res.status(500).json({ message: 'Error creating blog.', error: err.message });
    }
};

// get all blogs
const getAllBlogs = async (req, res) => {
    try {
      const posts = await BlogPostModel.find({})
        console.log(posts);
      return res.status(200).json(posts);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching posts.', error: err.message });
    }
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
            console.log(post);
            return res.status(200).json(post);
        })
        .catch((err) =>
            res.status(500).json({ message: 'Error fetching post.', error: err.message })
        );
};

// Get latest blogs (with pagination
const getLatestBlogs = async (req, res) => {
    try {
      const { page = 1, limit = 6 } = req.query;
      const pageNumber = parseInt(page);
      const pageSize = parseInt(limit);
  
      const blogs = await BlogPostModel.find()
        .sort({ createdAt: -1 })
        .limit(pageSize)
        .skip((pageNumber - 1) * pageSize)
        .populate("author", "fullName");
  
      const totalBlogs = await BlogPostModel.countDocuments();
  
      const hasMore = pageNumber * pageSize < totalBlogs;
  
      res.status(200).json({ blogs, hasMore });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
};
  
  
  
 // Update blog (POST)
const updatePost = (req, res) => {
    const { id } = req.params;
    const { title, content, image } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required.' });
    }

    BlogPostModel.findByIdAndUpdate(
        id,
        { title, content, image, updatedAt: Date.now() },
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
    // if (req.user.role !== "ADMIN") {
    //     return res.status(403).json({ message: "Only admins can delete posts." });
    // }

    console.log(id);


    BlogPostModel.findByIdAndDelete(id)
        .then((deletedPost) => {
            if (!deletedPost) {
                return res.status(404).json({ message: 'Post not found.' });
            }
           return res.status(200).json({ message: 'Post deleted successfully.' });
        })
        .catch((err) =>
            res.status(500).json({ message: 'Error deleting post.', error: err.message })
        );
};

module.exports = { createBlogPost, getAllBlogs, getSinglePostById, getLatestBlogs, updatePost, deletePost };
