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
router.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });

  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
}); 

module.exports = router;
