import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../Style/AdminRentedBooks.css';

export const AdminRentedBooks = () => {
  const [rentedBooks, setRentedBooks] = useState([]);
  const [error, setError] = useState('');

  const fetchRentedBooks = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/rent/admin/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('API raw data:', JSON.stringify(res.data, null, 2));

      // 🔥 Accessing correct array from response
      setRentedBooks(res.data.rents);
    } catch (err) {
      console.error('Failed to fetch rented books', err);
      setError('Failed to load rented books');
    }
  };

  useEffect(() => {
    fetchRentedBooks();
  }, []);

  return (
    <div className="admin-rented-container">
      <h2 className="admin-rented-title">Rented Books Overview</h2>
      {error && <p className="admin-rented-error">{error}</p>}

      <div className="admin-rented-table-wrapper">
        <table className="admin-rented-table">
          <thead>
            <tr>
              <th>Book</th>
              <th>Title</th>
              <th>User Name</th>
              <th>User Email</th>
              <th>Payment</th>
              <th>Rented At</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(rentedBooks) && rentedBooks.length > 0 ? (
              rentedBooks.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={item.bookImage}
                      alt={item.bookTitle}
                      className="rented-book-img"
                    />
                  </td>
                  <td>{item.bookTitle}</td>
                  <td>{item.userName}</td>
                  <td>{item.userEmail}</td>
                  <td>{item.paymentStatus}</td>
                  <td>{new Date(item.rentedAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No rented books found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
