import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import { BooksCard } from '../Components/Bookscard';
import '../Style/Books.css';

export const Books = () => {
  const [books, setBooks] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState("All");

  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery().get('search');

  useEffect(() => {
    axios.get("http://localhost:5000/api/books")
      .then(res => setBooks(res.data))
      .catch(err => console.log(err));
  }, []);

  const categories = ["All", "Fiction", "Non-Fiction", "Sci-Fi", "History", "Biography", "Detective Fiction"];

  // 🔍 Search filter: only show books matching search query
  const searchFilteredBooks = query
    ? books.filter(book =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase()) ||
        book.price.toString().includes(query.toLowerCase())
      )
    : null;

  // 📚 Category-based filtering (only if no search query)
  const categoryFilteredBooks = filteredCategory === "All"
    ? books
    : books.filter(book => book.genre.toLowerCase() === filteredCategory.toLowerCase());

  const finalBooks = query ? searchFilteredBooks : categoryFilteredBooks;

  return (
    <div className="books-page">
      <h1>Explore Our Collection</h1>

      {/* Hide filters if searching */}
      {!query && (
        <div className="category-filters">
          {categories.map((category, index) => (
            <button
              key={index}
              className={filteredCategory === category ? "active" : ""}
              onClick={() => setFilteredCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      <div className="book-list">
        {finalBooks && finalBooks.length > 0 ? (
          finalBooks.map(book => <BooksCard key={book._id} book={book} />)
        ) : (
          <p>No books found for your search or category.</p>
        )}
      </div>
    </div>
  );
};
