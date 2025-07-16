import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Style/BookDetails.css';

export const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/books/${id}`)
      .then(res => setBook(res.data))
      .catch(err => console.error("Error fetching book: ", err));
  }, [id]);

  const handleRentNow = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to rent the book.');
      navigate('/login');
      return;
    }
    navigate(`/payment/${book._id}`);
  };

  if (!book) return <p className="loading">Loading book details...</p>;

  return (
    <div className="book-details-wrapper">
      <div className="card">
        <img src={book.coverImage} alt={book.title} className="book-image" />
        <div className="bd"></div>
        <div className="info">
          <h2 className="book-title">{book.title}</h2>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Genre:</strong> {book.genre}</p>
          <p><strong>Price:</strong> ₹{book.price}</p>
          <p className="book-description">{book.description}</p>

          <button className="rent-button" onClick={handleRentNow}>
            Rent Now
          </button>
        </div>
      </div>
    </div>
  );
};
