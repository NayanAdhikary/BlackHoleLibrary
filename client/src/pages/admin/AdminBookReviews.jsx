import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../Style/AdminBookReviews.css';

export const AdminBookReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [error, serError] = useState('');

    const fetchReviews = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get("http://localhost:5000/api/reviews/book/all", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setReviews(res.data.reviews)
        } catch (error) {
            console.log("Failed to fetch reviews", err);
            serError("Failed to load reviews");
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    return (
        <div className='admin-reviews-container'>
            <h2 className='admin-reviews-title'>
                All Book Reviews
            </h2>
            {error && <p className='admin-reviews-error'>{error}</p>}

            <div className='admin-reviews-table-wrapper'>
                <table className='admin-reviews-table'>
                    <thead>
                        <tr>
                            <th>Book Title</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Rating</th>
                            <th>Comment</th>
                            <th>Recived At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(reviews) && reviews.length > 0 ? (
                            reviews.map((review, index) => (
                                <tr key={index}>
                                    <td>{review.bookId?.title || 'N/A'}</td>
                                    <td>{review.userId?.name || 'N/A'}</td>
                                    <td>{review.userId?.email || 'N/A'}</td>
                                    <td>{review.rating}</td>
                                    <td>{review.comment}</td>
                                    <td>{new Date(review.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">No reviews found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};