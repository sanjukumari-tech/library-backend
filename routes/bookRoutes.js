// routes/bookRoutes.js
const express = require('express');
const {
  addBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook
} = require('../controllers/bookController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

// Add a new book
router.post('/', protect, addBook);

// Get all books for logged-in user
router.get('/', protect, getBooks);

// Get a specific book by ID
router.get('/:id', protect, getBookById);

// Update a specific book
router.put('/:id', protect, updateBook);

// Delete a specific book
router.delete('/:id', protect, deleteBook);

module.exports = router;
