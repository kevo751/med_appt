import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <div className="navbar">
      <Link to="/" className="logo">StayHealthy</Link>
      <div className="nav-links">
        <Link to="/" className="active">Home</Link>
        <a href="#appointments">Appointments</a>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login" className="login-btn">Login</Link>
      </div>
    </div>
  );
}

export default Navbar;
