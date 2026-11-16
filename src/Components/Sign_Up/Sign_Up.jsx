
import { useState } from 'react';
import './Sign_Up.css';

function Sign_Up() {
    const [formData, setFormData] = useState({
        role: '',
        name: '',
        phone: '',
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

        if (!formData.role) {
            newErrors.role = 'Please select a role.';
        }

        if (formData.name.trim().length < 2) {
            newErrors.name = 'Please enter your full name.';
        }

        if (!/^\+?[0-9\s()-]{7,20}$/.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number.';
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address.';
        }

        if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters.';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            alert('Your form has passed validation!');
        }
    }

    return (
        <div className="form-container">
            <p className="eyebrow">Welcome to StayHealthy</p>
            <h1>Create your account</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="role">Role</label>
                <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                >
                    <option value="">Select your role</option>
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                    <option value="admin">Admin</option>
                </select>
                {errors.role && <small>{errors.role}</small>}

                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                />
                {errors.name && <small>{errors.name}</small>}

                <label htmlFor="phone">Phone Number</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                />
                {errors.phone && <small>{errors.phone}</small>}

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
                    placeholder="Create a secure password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <small>Use at least 8 characters.</small>
                {errors.password && <small>{errors.password}</small>}

                <div className="button-row">
                    <button type="submit" className="btn submit">
                        Submit
                    </button>
                    <button
                        type="reset"
                        className="btn reset"
                        onClick={() => {
                            setFormData({
                                role: '',
                                name: '',
                                phone: '',
                                email: '',
                                password: ''
                            });
                            setErrors({});
                        }}
                    >
                        Reset
                    </button>
                </div>
            </form>

            <p className="switch">
                Already have an account? <a href="/login">Login</a>
            </p>

            <p className="switch">
                <a href="/">Back to Home</a>
            </p>
        </div>
    );
}

export default Sign_Up;
