const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { purchaseBook } = require("../controllers/purchaseController");

// Simulated purchase route
router.post("/:id", protect, purchaseBook);

module.exports = router;
