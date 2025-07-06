import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = login(formData.email, formData.password);
        if (!success) {
            setError('Invalid email or password.');
        } else {
            navigate('/');
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2>Welcome Back</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="e.g. bilal@example.com"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="********"
                        />
                    </div>
                    <button type="submit" className="submit-btn">Login</button>
                </form>
                <div className="login-link">
                    Don't have an account? <a href="/register">Register</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
