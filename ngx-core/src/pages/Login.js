// pages/Login.js
import React, { useState } from 'react';
import api from '../utils/api';
import { getTokenExpiryTime } from '../utils/auth';
import '../styles/login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        api
            .post('token/', { username, password })
            .then((response) => {
                localStorage.setItem('token', response.data.access);
                const expiryTime = getTokenExpiryTime(response.data.access);
                if (expiryTime) {
                    const timeUntilExpiry = expiryTime - Date.now();
                    setTimeout(() => {
                        localStorage.removeItem('token');
                        window.location.href = '/';
                    }, timeUntilExpiry);
                }
                window.location.href = '/home';
            })
            .catch(() => setError('Invalid credentials. Please try again.'));
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;