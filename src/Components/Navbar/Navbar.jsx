import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const isLoggedIn = !!sessionStorage.getItem('auth-token');
  const email = sessionStorage.getItem('email') || '';
  const username = sessionStorage.getItem('name') || email.split('@')[0];

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
        <Link to="/reviews">Reviews</Link>
        {isLoggedIn ? (
          <>
            <div style={{ position: 'relative' }}>
              <span
                className="welcome-user"
                style={{ cursor: 'pointer' }}
                onClick={() => setShowMenu(!showMenu)}
              >
                Welcome, {username} ▾
              </span>
              {showMenu && (
                <div
                  style={{
                    position: 'absolute', top: '30px', right: 0, background: '#fff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)', borderRadius: '8px',
                    display: 'flex', flexDirection: 'column', minWidth: '150px', zIndex: 1000,
                  }}
                >
                  <Link to="/profile" style={{ padding: '10px 15px' }} onClick={() => setShowMenu(false)}>Your Profile</Link>
                  <Link to="/reports" style={{ padding: '10px 15px' }} onClick={() => setShowMenu(false)}>Your Reports</Link>
                </div>
              )}
            </div>
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
