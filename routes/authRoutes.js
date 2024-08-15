// routes/authRoutes.js
const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');
const protect = require('../middlewares/authMiddleware');
const apiLimiter = require('../middlewares/rateLimiter');

const router = express.Router();

router.post('/register', apiLimiter, registerUser);
router.post('/login', apiLimiter, loginUser);
router.get('/logout', logoutUser);

// Protected route example
router.get('/home', protect, (req, res) => {
  res.json({ message: `Welcome, ${req.user.username}!` });
});

module.exports = router;
