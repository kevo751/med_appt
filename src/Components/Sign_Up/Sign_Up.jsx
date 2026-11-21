import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sign_Up.css';

function Sign_Up() {
  const [form, setForm] = useState({ role: '', name: '', phone: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setSuccess('');
  };

  const validate = () => {
    const err = {};
    if (!form.role) err.role = 'Please select a role.';
    if (form.name.trim().length < 2) err.name = 'Name must be at least 2 characters.';
    if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) err.phone = 'Phone number must be 10 digits.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = 'Please enter a valid email.';
    if (form.password.length < 8) err.password = 'Password must be at least 8 characters.';
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length === 0) setSuccess('Account details look good!');
  };

  const handleReset = () => {
    setForm({ role: '', name: '', phone: '', email: '', password: '' });
    setErrors({});
    setSuccess('');
  };

  return (
    <div className="form-container">
      <p className="eyebrow">Welcome to StayHealthy</p>
      <h1>Create your account</h1>

      <form onSubmit={handleSubmit} onReset={handleReset} noValidate>
        <label htmlFor="role">Role</label>
        <select id="role" name="role" value={form.role} onChange={handleChange}>
          <option value="" disabled>Select your role</option>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
          <option value="admin">Admin</option>
        </select>
        {errors.role && <div className="error" style={{ color: 'red' }}>{errors.role}</div>}

        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={form.name} onChange={handleChange} placeholder="Enter your full name" />
        {errors.name && <div className="error" style={{ color: 'red' }}>{errors.name}</div>}

        <label htmlFor="phone">Phone Number</label>
        <input type="tel" id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="0123456789" />
        {errors.phone && <div className="error" style={{ color: 'red' }}>{errors.phone}</div>}

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
        {errors.email && <div className="error" style={{ color: 'red' }}>{errors.email}</div>}

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" value={form.password} onChange={handleChange} placeholder="Create a secure password" />
        {errors.password && <div className="error" style={{ color: 'red' }}>{errors.password}</div>}
        <small>Use at least 8 characters.</small>

        <div className="button-row">
          <button type="submit" className="btn submit">Submit</button>
          <button type="reset" className="btn reset">Reset</button>
        </div>
        {success && <div style={{ color: 'green' }}>{success}</div>}
      </form>

      <p className="switch">Already have an account? <Link to="/login">Login</Link></p>
      <p className="switch"><Link to="/">Back to Home</Link></p>
    </div>
  );
}

export default Sign_Up;
