import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sign_Up.css';
import { API_URL } from '../../../config';

function Sign_Up() {
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showerr, setShowerr] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    const err = {};
    if (!role) err.role = 'Please select a role.';
    if (name.trim().length < 4) err.name = 'Name must be at least 4 characters.';
    if (!/^\d{10}$/.test(phone)) err.phone = 'Phone number must be exactly 10 digits.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) err.email = 'Please enter a valid email.';
    if (password.length < 8) err.password = 'Password must be at least 8 characters.';
    return err;
  };

  const register = async (e) => {
    e.preventDefault();
    setShowerr('');
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, name, email, password, phone }),
      });
      const json = await response.json();

      if (json.authtoken) {
        sessionStorage.setItem('auth-token', json.authtoken);
        sessionStorage.setItem('name', name);
        sessionStorage.setItem('phone', phone);
        sessionStorage.setItem('email', email);
        navigate('/');
        window.location.reload();
      } else if (Array.isArray(json.error)) {
        setShowerr(json.error.map((er) => er.msg).join(' '));
      } else {
        setShowerr(json.error || 'Sign up failed. Please try again.');
      }
    } catch {
      setShowerr('Cannot reach the server. Make sure "node index" is running.');
    }
  };

  const reset = () => {
    setRole(''); setName(''); setPhone(''); setEmail(''); setPassword('');
    setErrors({}); setShowerr('');
  };

  const errStyle = { color: 'red', fontSize: '0.85rem' };

  return (
    <div className="form-container">
      <p className="eyebrow">Welcome to StayHealthy</p>
      <h1>Create your account</h1>

      <form onSubmit={register} onReset={reset} noValidate>
        <label htmlFor="role">Role</label>
        <select id="role" name="role" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="" disabled>Select your role</option>
          <option value="Patient">Patient</option>
          <option value="Doctor">Doctor</option>
          <option value="Admin">Admin</option>
        </select>
        {errors.role && <div style={errStyle}>{errors.role}</div>}

        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" />
        {errors.name && <div style={errStyle}>{errors.name}</div>}

        <label htmlFor="phone">Phone Number</label>
        <input type="tel" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0123456789" />
        {errors.phone && <div style={errStyle}>{errors.phone}</div>}

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        {errors.email && <div style={errStyle}>{errors.email}</div>}
        {showerr && <div style={errStyle}>{showerr}</div>}

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a secure password" />
        {errors.password && <div style={errStyle}>{errors.password}</div>}
        <small>Use at least 8 characters.</small>

        <div className="button-row">
          <button type="submit" className="btn submit">Submit</button>
          <button type="reset" className="btn reset">Reset</button>
        </div>
      </form>

      <p className="switch">Already have an account? <Link to="/login">Login</Link></p>
      <p className="switch"><Link to="/">Back to Home</Link></p>
    </div>
  );
}

export default Sign_Up;
