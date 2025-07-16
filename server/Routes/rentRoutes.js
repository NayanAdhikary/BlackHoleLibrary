const express = require("express");
const router = express.Router();
const { protect, isAdmin } = require("../middleware/authMiddleware");
const { 
    rentBook,
    getUserRentBooks,
    getAllRentedBooks
 } = require("../controllers/rentController");

router.post("/", protect, rentBook);
router.get("/myrents", protect, getUserRentBooks);


//admin routes
router.get("/admin/all", protect, isAdmin, getAllRentedBooks)
module.exports = router;