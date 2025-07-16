const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    price: Number,
    description: String,
    coverImage: String,
    previewPDF: String,
});

module.exports = mongoose.models.Book || mongoose.model("Book", bookSchema);