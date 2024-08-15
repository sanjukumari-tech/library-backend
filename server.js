// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const router = require('./routes/bookRoutes');

dotenv.config();
connectDB();

const app = express();

// Body Parser Middleware
app.use(express.json());

// Auth Routes
app.use('/api/auth', authRoutes);

// Book Routes
app.use('/api/books',router);  // Use book routes

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
