const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: false  
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee', // Assuming the employee (user) is the author
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, 
  {
    timestamps: true, // Enable Mongoose timestamps, which automatically adds createdAt and updatedAt
  }
);

BlogPostSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPost;
