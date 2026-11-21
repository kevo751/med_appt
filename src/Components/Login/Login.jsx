import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) err.email = 'Please enter a valid email.';
    if (!password) err.password = 'Please enter your password.';
    else if (password.length < 8) err.password = 'Password must be at least 8 characters.';
    setErrors(err);
    setSuccess(Object.keys(err).length === 0 ? 'Login details look good!' : '');
  };

  return (
    <div className="form-container">
      <p className="eyebrow">Your health, connected</p>
      <h1>Good to see you again</h1>

      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={email}
          onChange={(e) => { setEmail(e.target.value); setErrors({ ...errors, email: '' }); }}
          placeholder="you@example.com" />
        {errors.email && <div className="error" style={{ color: 'red' }}>{errors.email}</div>}

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" value={password}
          onChange={(e) => { setPassword(e.target.value); setErrors({ ...errors, password: '' }); }}
          placeholder="Enter your password" />
        {errors.password && <div className="error" style={{ color: 'red' }}>{errors.password}</div>}

        <div className="button-row">
          <button type="submit" className="btn submit">Login</button>
        </div>
        {success && <div style={{ color: 'green' }}>{success}</div>}
      </form>

      <p className="switch">New to StayHealthy? <Link to="/signup">Sign up for free</Link></p>
      <p className="switch"><Link to="/">Back to Home</Link></p>
    </div>
  );
}

export default Login;
