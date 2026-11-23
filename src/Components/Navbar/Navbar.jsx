import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!sessionStorage.getItem('auth-token');
  const email = sessionStorage.getItem('email') || '';
  const username = email.split('@')[0];

  const handleLogout = () => {
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('phone');
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="navbar">
      <Link to="/" className="logo">StayHealthy</Link>
      <div className="nav-links">
        <Link to="/" className="active">Home</Link>
        <Link to="/booking-consultation">Appointments</Link>
        {isLoggedIn ? (
          <>
            <span className="welcome-user">Hi, {username}</span>
            <button onClick={handleLogout} className="login-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login" className="login-btn">Login</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
