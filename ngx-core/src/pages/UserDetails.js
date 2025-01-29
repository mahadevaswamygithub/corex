import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/userDetails.css';

const UserDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [isActive, setIsActive] = useState(false);
    const token = localStorage.getItem('token');

    // Fetch user details
    useEffect(() => {
        if (id) {
            axios
                .get(`http://127.0.0.1:8000/app/users/${id}/`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    setUser(response.data);
                    setIsActive(response.data.is_active);
                })
                .catch((err) => setError('Failed to fetch user details.'));
        }
    }, [id, token]);

    // Handle form changes for editing user
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    // Toggle the is_active status
    const handleToggleActive = () => {
        setIsActive(!isActive);
    };

    // Update user details
    const handleUpdateUser = () => {
        axios
            .put(
                `http://127.0.0.1:8000/app/users/${id}/`,
                { ...user, is_active: isActive },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then(() => {
                navigate('/home/users');
            })
            .catch((err) => setError('Failed to update user.'));
    };

    // Handle delete user
    const handleDeleteUser = () => {
        axios
            .delete(`http://127.0.0.1:8000/app/users/${id}/`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
                navigate('/home/users');
            })
            .catch((err) => setError('Failed to delete user.'));
    };

    return (
        <div className="user-details-container">
            <h2>User Details</h2>
            {error && <p className="error">{error}</p>}
            {user && (
                <div>
                    <div className="user-detail">
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={user.username}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="user-detail">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="user-detail">
                        <label>Is Active:</label>
                        <input
                            type="checkbox"
                            checked={isActive}
                            onChange={handleToggleActive}
                        />
                    </div>
                    <div className="buttons">
                        <button onClick={handleUpdateUser}>Update</button>
                        <button onClick={handleDeleteUser}>Delete</button>
                        <button onClick={() => navigate('/home/users')}>Back to User List</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDetails;
