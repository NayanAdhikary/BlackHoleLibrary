import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../Style/AdminBooks.css';

export const AdminBooks = () => {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    title: '', author: '', genre: '', price: '', coverImage: '', previewPDF: '', description: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/books");
      setBooks(res.data);
    } catch (err) {
      console.error("Failed to fetch books", err);
      setError("Failed to fetch books");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddBook = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/books", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFormData({ title: '', author: '', genre: '', price: '', coverImage: '', previewPDF: '', description: '' });
      fetchBooks();
    } catch (err) {
      console.error("Add book failed", err);
      setError("Failed to add book");
    }
  };

  const handleEditBook = (book) => {
    setFormData({
      title: book.title,
      author: book.author,
      genre: book.genre,
      price: book.price,
      description: book.description,
      coverImage: book.coverImage,
      previewPDF: book.previewPDF || ''
    });
    setEditingId(book._id);
  };

  const handleUpdateBook = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/books/${editingId}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFormData({ title: '', author: '', genre: '', price: '', coverImage: '', previewPDF: '', description: '' });
      setEditingId(null);
      fetchBooks();
    } catch (err) {
      console.error("Update book failed", err);
      setError("Failed to update book");
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBooks();
    } catch (err) {
      console.error("Delete book failed", err);
      setError("Failed to delete book");
    }
  };

  return (
    <div className="admin-books-container">
      <h2 className="admin-books-title">Manage Books</h2>

      <div className="admin-books-form">
        <input name="title" placeholder="Book Title" value={formData.title} onChange={handleChange} className="admin-books-input" />
        <input name="author" placeholder="Author" value={formData.author} onChange={handleChange} className="admin-books-input" />
        <input name="genre" placeholder="Genre" value={formData.genre} onChange={handleChange} className="admin-books-input" />
        <input name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="admin-books-input" />
        <input name="coverImage" placeholder="Cover Image URL" value={formData.coverImage} onChange={handleChange} className="admin-books-input" />
        <input name="previewPDF" placeholder="Preview PDF URL" value={formData.previewPDF} onChange={handleChange} className="admin-books-input" />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="admin-books-textarea" />

        {editingId ? (
          <button onClick={handleUpdateBook} className="admin-books-button update">Update Book</button>
        ) : (
          <button onClick={handleAddBook} className="admin-books-button add">Add Book</button>
        )}
      </div>

      {error && <p className="admin-books-error">{error}</p>}

      <div className="admin-books-table-wrapper">
        <table className="admin-books-table">
          <thead>
            <tr>
              <th>Cover</th>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Price</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book._id}>
                <td>{book.coverImage ? <img src={book.coverImage} alt={book.title} className="admin-books-img" /> : 'No Image'}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.price}</td>
                <td>{book.description?.slice(0, 100)}...</td>
                <td>
                  <button onClick={() => handleEditBook(book)} className="admin-books-button edit">Edit</button>
                  <button onClick={() => handleDeleteBook(book._id)} className="admin-books-button delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
