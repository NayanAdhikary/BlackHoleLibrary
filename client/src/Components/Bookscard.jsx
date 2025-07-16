// src/Components/Bookscard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/Bookscard.css';

export const BooksCard = ({ book }) => {
  const navigate = useNavigate();

  const handleShowDetails = () => {
    navigate(`/books/${book._id}`);
  };

  return (
    <div className="book-card">
      <img src={book.coverImage} alt={book.title} />
      <div className="book-info">
        <h3>{book.title}</h3>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Genre:</strong> {book.genre}</p>
        <p><strong>Price:</strong> ₹{book.price}</p>
        <button className="show-book-btn" onClick={handleShowDetails}>
          Show Book
        </button>
      </div>
    </div>
  );
};
