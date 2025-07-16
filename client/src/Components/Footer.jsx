import React from 'react';
import '../Style/Footer.css';

export const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-section">
          <h4>📘 About</h4>
          <p>About Us</p>
          <p>Privacy Policy</p>
          <p>Terms & Conditions</p>
        </div>
        <div className="footer-section">
          <h4>📖 Guidelines</h4>
          <p>How it works</p>
          <p>Reader Rights</p>
          <p>Community Rules</p>
        </div>
        <div className="footer-section">
          <h4>💼 Services</h4>
          <p>Book Reviews</p>
          <p>Online Orders</p>
          <p>Admin Tools</p>
        </div>
        <div className="footer-section">
          <h4>📞 Contact</h4>
          <p>Email Support</p>
          <p>Help Desk</p>
          <h4>⬇ Available on</h4>
          <div className="app-links">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Google_Play_Store_badge_EN.svg/512px-Google_Play_Store_badge_EN.svg.png" alt="Play Store" />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} The BlackHole Library. All rights reserved.</p>
        <div className="social-icons">
          <i className="fa-brands fa-facebook"></i>
          <i className="fa-brands fa-x-twitter"></i>
          <i className="fa-brands fa-youtube"></i>
          <i className="fa-brands fa-instagram"></i>
        </div>
      </div>
    </footer>
  );
};
