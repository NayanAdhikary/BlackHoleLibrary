import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Style/Home.css';
import heroImage from '../Images/Hero_Image.jpg';
import PriyaSharma from '../Images/PriyaSharma.png';

export const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/books?search=${encodeURIComponent(searchTerm)}`);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSearch();
    };

    return (
        <div className="home">

            {/* 🔍 Search Prompt on Top */}
            <section className="top-search-bar">
                <input
                    type="text"
                    placeholder="What are you looking for today?"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleSearch}>Search</button>
            </section>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero">
                    <h1>Welcome to The BlackHole Library</h1>
                    <p>Your digital gateway to thousands of books and authentic reviews.</p>
                    <Link to="/books" className="cta-btn">Browse Books</Link>
                </div>
                <div className="hero-image">
                    <img src={heroImage} alt="Girl reading a book" />
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="why">
                <h2>Why Choose Us?</h2>
                <div className="why-marquee">
                    <div className="why-track">
                        <div className="why-box">📚 A Wide Collection of Books</div>
                        <div className="why-box">⭐ Real Reviews from Real Readers</div>
                        <div className="why-box">🛒 Easy and Fast Ordering</div>
                        <div className="why-box">🔐 Admin Panel for Secure Book Management</div>
                        <div className="why-box">🌐 24/7 Online Access Anywhere</div>
                        <div className="why-box">⚡ Blazing Fast Interface</div>

                        {/* Duplicate for seamless scroll */}
                        <div className="why-box">📚 A Wide Collection of Books</div>
                        <div className="why-box">⭐ Real Reviews from Real Readers</div>
                        <div className="why-box">🛒 Easy and Fast Ordering</div>
                        <div className="why-box">🔐 Admin Panel for Secure Book Management</div>
                        <div className="why-box">🌐 24/7 Online Access Anywhere</div>
                        <div className="why-box">⚡ Blazing Fast Interface</div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="how-it-works-marquee">
                <marquee behavior="scroll" direction="left" scrollamount="8">
                    <div className="how-steps-track">
                        <div className="how-step-box">1. Sign up & Create your Profile</div>
                        <div className="how-step-box">2. Browse or Search Books</div>
                        <div className="how-step-box">3. Read Reviews & Add to Cart</div>
                        <div className="how-step-box">4. Rent or Buy with a Click</div>
                        <div className="how-step-box">5. Leave Your Own Review</div>
                    </div>
                </marquee>
            </section>
            {/* How It Works */}
            <section className="how-it-works-marquee">
                <h2>📘 How It Works</h2>
                <div className="marquee-wrapper">
                    <div className="marquee-track">
                        <div className="step">1. Sign up & Create your Profile</div>
                        <div className="step">2. Browse or Search Books</div>
                        <div className="step">3. Read Reviews & Add to Cart</div>
                        <div className="step">4. Rent or Buy with a Click</div>
                        <div className="step">5. Leave Your Own Review</div>
                        <div className="step">1. Sign up & Create your Profile</div>
                        <div className="step">2. Browse or Search Books</div>
                        <div className="step">3. Read Reviews & Add to Cart</div>
                        <div className="step">4. Rent or Buy with a Click</div>
                        <div className="step">5. Leave Your Own Review</div>
                    </div>
                </div>
            </section>


            {/* Testimonials */}
            <section className="testimonials">
                <div className="testimonials-body">
                    <h2>What Our Readers Say</h2>
                    <blockquote className="testimonial-quote">“This platform makes it so easy to find books I love!”</blockquote>
                    <span className="testimonial-name">– Priya Sharma</span>
                </div>
                <div className="testimonials-hero">
                    <img src={PriyaSharma} alt="Reader Priya Sharma" />
                </div>
            </section>

            {/* Newsletter */}
            <section className="newsletter">
                <h2>📬 Stay Updated!</h2>
                <p>Subscribe to our newsletter for the latest books, offers & updates.</p>
                <form className="newsletter-form">
                    <input type="email" placeholder="Enter your email" required />
                    <button type="submit" className="cta-btn">Subscribe</button>
                </form>
            </section>

        </div>
    );
};
