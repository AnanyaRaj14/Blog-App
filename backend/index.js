const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
require("dotenv").config(); // <== Add this

// import models
// const EmployeeModel = require('./models/Employee');
// const BlogPost = require('./models/BlogPost');

// import routes
const blogRoutes = require('./routes/blogRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('Failed to connect MongoDB', err));


// Use employee routes
app.use('/api/employee',employeeRoutes);
// Use blog routes
app.use('/api/blog', blogRoutes);

// start the server
app.listen(PORT, ()=> console.log(`Server started at PORT:${PORT}`));