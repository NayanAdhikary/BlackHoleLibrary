import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Style/Navbar.css';

export const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="logo-link">
          The BlackHole Library
        </Link>
      </div>
      <ul className="menus">
        <li className='books'><Link to="/books">Books</Link></li>
        <li className='reviews'><Link to="/reviews">Reviews</Link></li>

        {!token ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        ) : (
          <>
            <div className="user-profile">
              <li>
                <Link to="/profile">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    alt="User"
                    className="profile-icon"
                  />
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </li>
            </div>
          </>
        )}
      </ul>
    </nav>
  );
};
