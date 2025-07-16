const Rent = require("../model/rentModel");
const Book = require("../model/bookModel");

exports.rentBook = async (req, res) => {
  try {
    const { bookId, cardNumber, expiryDate, cvv, paymentStatus } = req.body;
    const userId = req.user._id;

    console.log("Incoming Rent Request:", {
      userId,
      bookId,
      cardNumber,
      expiryDate,
      cvv,
      paymentStatus
    });

    if (!bookId || !cardNumber || !expiryDate || !cvv) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const newRent = new Rent({
      userId,
      book: bookId,
      cardNumber,
      expiryDate,
      cvv,
      price: book.price,
      paymentStatus: paymentStatus === "success" ? "paid" : "failed"
    });

    const savedRent = await newRent.save();

    return res.status(200).json({
      message: "Book rented successfully!",
      rent: savedRent,
      accessPDF: book.previewPDF
    });

  } catch (err) {
    console.error("Rent Error:", err.message);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
      stack: err.stack
    });
  }
};

exports.getAllRentedBooks = async (req, res) => {
  try {
    const rents = await Rent.find()
      .populate("userId", "name email")
      .populate("book", "title coverImage")
      .sort({ rentedAt: -1 });

    if (!rents || rents.length === 0) {
      return res.status(404).json({ msg: "No rented records found" });
    }

    const allRents = rents.map(rent => ({
      userName: rent.userId?.name,
      userEmail: rent.userId?.email,
      bookTitle: rent.book?.title,
      bookImage: rent.book?.coverImage,
      price: rent.price,
      paymentStatus: rent.paymentStatus,
      rentedAt: rent.rentedAt || rent.rentDate
    }));

    res.status(200).json({ rents: allRents });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

exports.getUserRentBooks = async (req, res) => {
  try {
    const userId = req.params._id;

    const rents = await Rent.find({ user: userId })
      .populate("book", "title coverImage")
      .sort({ rentedAt: -1 });

    if (!rents || rents.length === 0) {
      return res.status(404).json({
        msg: "No rented books found."
      });
    }

    const rentedBooks = rents.map(rent => ({
      title: rent.book.title,
      coverImage: rent.book.coverImage,
      rentedAt: rent.rentedAt
    }));

    res.status(200).json({ books: rentedBooks })
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};