
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div className="navbar">
            <Link to="/" className="logo">
                StayHealthy
            </Link>

            <div className="nav-links">
                <Link to="/" className="active">
                    Home
                </Link>

                <Link to="/appointments">
                    Appointments
                </Link>

                <Link to="/signup">
                    Sign Up
                </Link>

                <Link to="/login" className="login-btn">
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Navbar;
