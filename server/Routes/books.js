const express = require("express");
const router = express.Router();

// Import controller functions
const {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
} = require("../controllers/bookController");

// Import authentication middleware
const { protect, isAdmin } = require("../middleware/authMiddleware");

// Routes
router.get("/", getAllBooks);              // Public - Get all books
router.get("/:id", getBookById);           // Public - Get a single book
router.post("/", protect, isAdmin, createBook); // Protected - Admin only
router.put("/:id", protect, isAdmin, updateBook);
router.delete("/:id", protect, isAdmin, deleteBook)

module.exports = router;
