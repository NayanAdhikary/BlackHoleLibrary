const Book = require("../model/BookModel");

// GET: All Books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch books", error: err.message });
  }
};

// GET: Single Book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch the book", error: err.message });
  }
};

// POST: Create a New Book
exports.createBook = async (req, res) => {
  try {
    console.log("Received Body:", req.body);

    const { title, author, genre, price, description, coverImage, previewPDF } = req.body;

    const newBook = new Book({
      title,
      author,
      genre,
      price,
      description,
      coverImage,
      previewPDF,
    });

    const savedBook = await newBook.save();
    res.status(201).json({ msg: "New book created Successfully", savedBook });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.updateBook = async (req, res) => {

  try {
    const { title, author, genre, price, description, coverImage, previewPDF } = req.body;

    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ msg: "Book not Found" });
    }

    book.title = title || book.title;
    book.author = author || book.author;
    book.genre = genre || book.genre;
    book.price = price || book.price;
    book.description = description || book.description;
    book.coverImage = coverImage || book.coverImage;
    book.previewPDF = previewPDF || book.previewPDF;

    const update = await book.save();

    res.status(200).json({
      msg: "Book updated successfully",
      book: {
        id: update._id,
        title: update.title,
      }
    });
  } catch (error) {
    res
      .status(400)
      .json({
        msg: "Failed to update book",
        error: error.message
      });
  }
};

exports.deleteBook = async (req, res) => {

  try {
    const book = await Book.findById(req.params.id);
    if (!book){
      return res.status(404).json({ msg: "Book not found!" });
    }

    await book.deleteOne();
    res.status(200).json({
      msg:"Book deleted successfully",
      book: {
        id: book._id,
        title: book.title,
      }
    })
  } catch (error) {
    
  }

}