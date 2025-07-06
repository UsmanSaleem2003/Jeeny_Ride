import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <Link to="/">Jeeny Rides</Link>
                </div>
                <div className="nav-links">
                    {user ? (
                        <>
                            <Link to="/" className="nav-link">Request Ride</Link>
                            <Link to="/ride-status" className="nav-link">Ride Status</Link>
                            <Link to="/ride-history" className="nav-link">Ride History</Link>
                            <button className="nav-link logout-btn" onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/register" className="nav-link register-btn">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
