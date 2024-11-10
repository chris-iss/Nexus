const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {

    const user = new User({ firstname, lastname, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
    
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Login user
//const jwt = require('jsonwebtoken'); // Make sure you have this at the top

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare the hashed password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // If login is successful, respond with success message and token
    res.json({ message: "Success", token: "your_generated_token_here" });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});
 

module.exports = router;
