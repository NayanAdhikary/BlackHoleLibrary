const mongoose = require("mongoose");

const rentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true  // ✅ MUST be userId
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true
  },
  cardNumber: {
    type: String,
    required: true
  },
  expiryDate: {
    type: String,
    required: true
  },
  cvv: {
    type: String,
    required: true
  },
  rentDate: {
    type: Date,
    default: Date.now
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"], // ✅ Fix this too (see below)
    default: "paid"
  }
});

module.exports = mongoose.models.Rent || mongoose.model("Rent", rentSchema);
