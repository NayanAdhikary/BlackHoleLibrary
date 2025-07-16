const express = require("express");
const { addReview, getReviewsByBook } = require("../controllers/reviewController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, addReview);

router.get("/book/all", getReviewsByBook)

module.exports = router;