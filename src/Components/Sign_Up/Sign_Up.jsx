import React from 'react';
import { Link } from 'react-router-dom';
import './Sign_Up.css';

function Sign_Up() {
  return (
    <div className="form-container">
      <p className="eyebrow">Welcome to StayHealthy</p>
      <h1>Create your account</h1>

      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="role">Role</label>
        <select id="role" name="role" defaultValue="" required>
          <option value="" disabled>Select your role</option>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
          <option value="admin">Admin</option>
        </select>

        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" placeholder="Enter your full name" required />

        <label htmlFor="phone">Phone Number</label>
        <input type="tel" id="phone" name="phone" placeholder="+1 (555) 000-0000" required />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="you@example.com" required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Create a secure password" minLength={8} required />
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
