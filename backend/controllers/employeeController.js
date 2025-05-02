const EmployeeModel = require("../models/Employee");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Signup Controller
const userSignup = async (req, res) => {
    try {
      const { fullName, email, password } = req.body;
  
      // Check if user already exists
      const existingUser = await EmployeeModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10); // 10 = salt rounds

      // Create new user
      const newUser = await EmployeeModel.create({ 
        fullName, 
        email, 
        password:hashedPassword,
     });
        console.log("User created:", newUser);
  
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ message: "Something went wrong during signup." });
    }
  };

// user login with jwt
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await EmployeeModel.findOne({ email });

      if (!user) {
          return res.status(401).json({ message: "Invalid credentials" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
          return res.status(401).json({ message: "Invalid credentials" });
      }

      // create JWT
      const token = jwt.sign(
          { id: user._id, role: user.role, Name: user.fullName, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
      );
      console.log(token, user);
      res.json({ message: "Login successful", token, user: { fullName: user.fullName, email: user.email, role: user.role } });
  } catch (error) {
      res.status(500).json({ message: "Login failed", error: error.message });
  }
};

module.exports = {userLogin, userSignup};