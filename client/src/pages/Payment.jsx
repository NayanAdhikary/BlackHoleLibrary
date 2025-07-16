import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Style/Payment.css';

export const Payment = () => {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);
    const [cardInfo, setCardInfo] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/books/${bookId}`)
            .then(res => setBook(res.data))
            .catch(err => {
                console.error("Failed to load book:", err);
                setMessage("Failed to load book details.");
            });
    }, [bookId]);

    const handleChange = e => {
        setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
    };

    const handlePayment = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Please login to continue.");
            navigate('/login');
            return;
        }

        const { cardNumber, expiryDate, cvv } = cardInfo;

        // ✅ Basic frontend validation
        if (!cardNumber || !expiryDate || !cvv) {
            setMessage("Please fill in all fields.");
            return;
        }

        if (cardNumber.length !== 16 || !/^\d{2}\/\d{2}$/.test(expiryDate) || cvv.length !== 3) {
            setMessage("Invalid card details");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(
                'http://localhost:5000/api/rent',
                {
                    bookId: book._id,
                    cardNumber: cardNumber.trim(),
                    expiryDate: expiryDate.trim(),
                    cvv: cvv.trim(),
                    paymentStatus: "success"
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (res.status === 200 || res.status === 201) {
                setMessage("✅ Payment successful! Opening your book...");
                setTimeout(() => {
                    if (book.previewPDF) {
                        window.open(book.previewPDF, '_blank');
                    }
                }, 1500);
            }
        } catch (error) {
            console.error("Payment failed:", error);
            setMessage(error.response?.data?.message || "Payment failed.");
        } finally {
            setLoading(false);
        }
    };

    if (!book) return <p className="loading">Loading payment details...</p>;

    return (
        <div className="payment-page">
            <h1>Book Payment</h1>
            <div className="payment-card">
                <img src={book.coverImage} alt={book.title} className="book-image" />
                <div className="payment-info">
                    <h2>{book.title}</h2>
                    <p><strong>Price:</strong> ₹{book.price}</p>

                    <input
                        type="text"
                        name="cardNumber"
                        placeholder="Card Number"
                        value={cardInfo.cardNumber}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="expiryDate"
                        placeholder="Expiry Date (MM/YY)"
                        value={cardInfo.expiryDate}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="cvv"
                        placeholder="CVV"
                        value={cardInfo.cvv}
                        onChange={handleChange}
                    />

                    <button onClick={handlePayment} disabled={loading}>
                        {loading ? "Processing..." : "Pay Now"}
                    </button>

                    {message && (
                        <p
                            className="payment-msg"
                            style={{ color: message.includes("success") ? "green" : "red" }}
                        >
                            {message}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};
