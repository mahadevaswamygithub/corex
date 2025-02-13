import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/addUser.css';

const AddUser = () => {
    const [user, setUser] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    // Handle input changes
    const handleInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleAddUser = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        axios
            .post(
                'http://127.0.0.1:8000/app/users/',
                user,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then(() => {
                setSuccess('User added successfully!');
                setTimeout(() => navigate('/home/users'), 1500); // Redirect after success
            })
            .catch(() => setError('Failed to add user.'));
    };

    return (
        <div className="add-user-container">
            <h2>Add New User</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            <form onSubmit={handleAddUser} className="add-user-form">
                <input type="text" name="username" placeholder="Username" value={user.username} onChange={handleInputChange} required />
                <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleInputChange} required />
                <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleInputChange} required />
                
                <div className="buttons">
                    <button type="submit">Add User</button>
                    <button type="button" className="cancel-btn" onClick={() => navigate('/home/users')}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AddUser;
