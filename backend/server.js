require('dotenv').config({ path: './.env' });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require("../backend/models/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const PORT = 3001;
const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB Atlas using MONGO_URI from .env
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Register Route
app.post('/register', async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ firstname, lastname, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
});




// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    res.json({ message: "Success", email: email });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
