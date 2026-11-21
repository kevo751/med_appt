import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
  return (
    <div className="form-container">
      <p className="eyebrow">Your health, connected</p>
      <h1>Good to see you again</h1>

      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="you@example.com" required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Enter your password" required />

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
