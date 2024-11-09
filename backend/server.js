require('dotenv').config({ path: './.env' });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require("../backend/models/user"); // Adjust path if necessary


const PORT = 3001;

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB Atlas using MONGO_URI from .env
console.log('Mongo URI:', process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

app.post('/register', (req, res) => {
  console.log('Request body:', req.body);
  UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => {
      if (err.code === 11000) {
        return res.status(400).json({ error: 'A user with the provided email/username already exists' });
      }
      console.error('Error creating user:', err);
      res.status(500).json({ error: err.message });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
