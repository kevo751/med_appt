
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        const newErrors = {};

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address.';
        }

        if (formData.password.trim() === '') {
            newErrors.password = 'Please enter your password.';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            alert('Login form has passed validation!');
        }
    }

    return (
        <div className="form-container">
            <p className="eyebrow">Your health, connected</p>
            <h1>Good to see you again</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <small>{errors.email}</small>}

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                />
                {errors.password && <small>{errors.password}</small>}

                <div className="button-row">
                    <button type="submit" className="btn submit">
                        Login
                    </button>
                </div>
            </form>

            <p className="switch">
                New to StayHealthy? <Link to="/signup">Sign up for free</Link>
            </p>

            <p className="switch">
                <Link to="/">Back to Home</Link>
            </p>
        </div>
    );
}

export default Login;
