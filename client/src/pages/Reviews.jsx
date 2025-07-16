import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Style/Reviews.css';

export const Reviews = () => {
  const [books, setBooks] = useState([]);
  const [selectedBookName, setSelectedBookName] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  const userId = JSON.parse(localStorage.getItem('user'))?._id; // Assuming user is stored in localStorage

  useEffect(() => {
    axios.get("http://localhost:5000/api/books")
      .then(res => setBooks(res.data))
      .catch(err => console.log("Error fetching books:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedBook = books.find(book => book.title === selectedBookName);

    if (!selectedBook) {
      setMessage("Please select a valid book.");
      return;
    }

    try {
      const reviewData = {
        userId,
        bookId: selectedBook._id,
        rating,
        comment
      };

      const res = await axios.post("http://localhost:5000/api/reviews", reviewData);
      setMessage("Review submitted successfully!");
      setRating('');
      setComment('');
      setSelectedBookName('');
    } catch (error) {
      console.error(error);
      setMessage("Failed to submit review.");
    }
  };

  return (
    <div className="reviews-page">
      <h1>Submit a Book Review</h1>
      <form className="review-form" onSubmit={handleSubmit}>
        <select
          value={selectedBookName}
          onChange={(e) => setSelectedBookName(e.target.value)}
          required
        >
          <option value="">Select a book</option>
          {books.map(book => (
            <option key={book._id} value={book.title}>
              {book.title}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Rating (1 to 5)"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />

        <textarea
          placeholder="Your comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />

        <button type="submit">Submit Review</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};
