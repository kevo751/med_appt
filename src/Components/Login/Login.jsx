import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { API_URL } from '../../../config';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showerr, setShowerr] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('auth-token')) navigate('/');
  }, [navigate]);

  const login = async (e) => {
    e.preventDefault();
    setShowerr('');
    const err = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) err.email = 'Please enter a valid email.';
    if (password.length < 8) err.password = 'Password must be at least 8 characters.';
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();

      if (json.authtoken) {
        sessionStorage.setItem('auth-token', json.authtoken);
        sessionStorage.setItem('email', email);
        navigate('/');
        window.location.reload();
      } else if (json.errors) {
        setShowerr(json.errors.map((er) => er.msg).join(' '));
      } else {
        setShowerr(json.error || 'Login failed. Please try again.');
      }
    } catch {
      setShowerr('Cannot reach the server. Make sure "node index" is running.');
    }
  };

  const errStyle = { color: 'red', fontSize: '0.85rem' };

  return (
    <div className="form-container">
      <p className="eyebrow">Your health, connected</p>
      <h1>Good to see you again</h1>

      <form onSubmit={login} noValidate>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={email}
          onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        {errors.email && <div style={errStyle}>{errors.email}</div>}

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" value={password}
          onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
        {errors.password && <div style={errStyle}>{errors.password}</div>}
        {showerr && <div style={errStyle}>{showerr}</div>}

        <div className="button-row">
          <button type="submit" className="btn submit">Login</button>
        </div>
      </form>

      <p className="switch">New to StayHealthy? <Link to="/signup">Sign up for free</Link></p>
      <p className="switch"><Link to="/">Back to Home</Link></p>
    </div>
  );
}

export default Login;
