const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Admin = require("../models/Admin");

// Register User
exports.registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user already exists
    const userExists = await User.findOne({ email }); // Await the promise
    if (userExists) return res.status(400).json({ msg: "User already exists" });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the new user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Server error" });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Server error" });
  }
};

// Logout User
exports.logoutUser = (req, res) => {
  res.json({ msg: "User logged out successfully" });
};

// Register HR
exports.registerAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user already exists
    const adminExists = await Admin.findOne({ email }); // Await the promise
    if (adminExists)
      return res.status(400).json({ msg: "admin already exists" });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the new user
    const newAdmin = new Admin({ email, password: hashedPassword });
    await newAdmin.save();
   
    res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Server error" });
  }
};

// Login Admin
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ msg: "Invalid credentials" });

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Server error" });
  }
};

// Logout User
exports.logoutAdmin = (req, res) => {
  res.json({ msg: "User logged out successfully" });
};
