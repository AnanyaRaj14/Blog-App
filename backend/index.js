const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
require("dotenv").config(); 

// import routes
const blogRoutes = require('./routes/blogRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('Failed to connect MongoDB', err));

// Use routes
app.use('/api/employee',employeeRoutes);
app.use('/api/blog', blogRoutes);

// Handle 404 (Not Found) errors
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});
  
// Global error handling middleware (for unexpected errors)
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
});

// start the server
app.listen(PORT, ()=> console.log(`Server started at http://localhost:${PORT}`));
