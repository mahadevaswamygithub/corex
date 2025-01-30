import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import '../styles/header.css';

const Header = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        // Fetch current user info
        axios
            .get('http://127.0.0.1:8000/app/users/user-profile/', {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                setUser(response.data);
            })
            .catch((err) => {
                setError('Failed to fetch user details.');
            });
    }, [token]);

    const toggleDropdown = () => {
        console.log('Dropdown clicked');
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <header className="header">
            <h2>CoreX</h2>
            {error && <p className="error">{error}</p>}
            <div className="user-info">
                {user ? (
                    <>
                        <div className="user-icon" onClick={toggleDropdown}>
                            {user.profile_picture ? (
                                <img
                                    src={user.profile_picture}
                                    alt="User Profile"
                                />
                            ) : (
                                <FontAwesomeIcon icon={faUserCircle} size="2x" />
                            )}
                        </div>
                        <div className={`dropdown ${isDropdownOpen ? 'show' : ''}`}>
                            <span><strong>Username:</strong> {user.username}</span>
                            <span><strong>Email:</strong> {user.email}</span>
                        </div>
                    </>
                ) : (
                    <p>Loading user info...</p>
                )}
            </div>
        </header>
    );
};

export default Header;