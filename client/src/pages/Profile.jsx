import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Style/Profile.css';

export const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [rentedBooks, setRentedBooks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError("Token not found. Please log in.");
      return;
    }

    // Fetch user profile
    axios.get('http://localhost:5000/api/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      if (res.data?.user) {
        setUser(res.data.user);
      } else if (res.data?.name) {
        setUser(res.data);
      } else {
        setError("Unexpected profile format.");
      }
    })
    .catch(err => {
      console.error("Error fetching profile:", err);
      setError("Failed to load profile.");
    });

    // Fetch rented books
    axios.get('http://localhost:5000/api/rent/myrents', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      if (Array.isArray(res.data.books)) {
        setRentedBooks(res.data.books);
      } else {
        setRentedBooks([]);
      }
    })
    .catch(err => {
      console.error("Error fetching rented books:", err);
      setRentedBooks([]);
    });

  }, []);

  if (error) {
    return (
      <div className="profile-page">
        <h2>{error}</h2>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-page">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <h1>Your Profile</h1>
      <div className="profile-card">
        <div className="profile-row"><span className="label">Name:</span><span>{  user.name}</span></div>
        <div className="profile-row"><span className="label">Phone:</span><span>{  user.phone}</span></div>
        <div className="profile-row"><span className="label">Email:</span><span>{  user.email}</span></div>
      </div>

      <h2>Your Rented Books</h2>
      {rentedBooks.length === 0 ? (
        <p>You haven't rented any books yet.</p>
      ) : (
        <div className="rented-book-grid">
          {rentedBooks.map((book, index) => (
            <div key={index} className="rented-book-card">
              <img src={book.coverImage} alt={book.title} />
              <p>{book.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
