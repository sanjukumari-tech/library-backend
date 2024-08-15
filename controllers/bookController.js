// controllers/bookController.js
const Book = require('../models/Book');

// Add a new book
exports.addBook = async (req, res) => {
  const { title, author, genre, year } = req.body;
  try {
    const book = await Book.create({
      title,
      author,
      genre,
      year,
      userId: req.user._id, // Get the user ID from the logged-in user
    });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all books for the logged-in user
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find({ userId: req.user._id });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book || book.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a book
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book || book.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Book not found or unauthorized' });
    }

    // Update book fields
    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    book.genre = req.body.genre || book.genre;
    book.year = req.body.year || book.year;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book || book.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Book not found or unauthorized' });
    }

    await book.remove();
    res.json({ message: 'Book removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
