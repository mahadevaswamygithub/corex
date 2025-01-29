import React from 'react';
import '../css/navbar.css';

const Navbar = ({ user, onLogout }) => {
    return (
        <div className="navbar">
            <h1 className="navbar-title">User Dashboard</h1>
            <div className="navbar-user">
                <span>{user.username}</span>
                <button onClick={onLogout} className="logout-button">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Navbar;
