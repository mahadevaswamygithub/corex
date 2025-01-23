import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/users.css';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ username: '', email: '', password: '' });
    const [editUser, setEditUser] = useState(null);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    // Fetch users
    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/app/users/', {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                setUsers(response.data);
            })
            .catch((err) => setError('Failed to fetch users.'));
    }, [token]);

    // Handle input changes for adding/editing
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (editUser) {
            setEditUser({ ...editUser, [name]: value });
        } else {
            setNewUser({ ...newUser, [name]: value });
        }
    };

    // Add user
    const handleAddUser = () => {
        axios
            .post('http://127.0.0.1:8000/app/users/', newUser, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                setUsers([...users, response.data]);
                setNewUser({ username: '', email: '', password: '' });
            })
            .catch((err) => setError('Failed to add user.'));
    };

    // Edit user
    const handleUpdateUser = () => {
        axios
            .put(`http://127.0.0.1:8000/app/users/${editUser.id}/`, editUser, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                setUsers(users.map((user) => (user.id === editUser.id ? response.data : user)));
                setEditUser(null);
            })
            .catch((err) => setError('Failed to update user.'));
    };

    // Delete user
    const handleDeleteUser = (id) => {
        axios
            .delete(`http://127.0.0.1:8000/app/users/${id}/`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
                setUsers(users.filter((user) => user.id !== id));
            })
            .catch((err) => setError('Failed to delete user.'));
    };

    return (
        <div className="users-container">
            <h2>Users</h2>
            {error && <p className="error">{error}</p>}

            {/* Add User Form */}
            <div className="add-user">
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={newUser.username}
                    onChange={handleInputChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={newUser.password}
                    onChange={handleInputChange}
                />
                <button onClick={handleAddUser}>Add User</button>
            </div>

            {/* User List */}
            <ul className="user-list">
                {users.map((user) => (
                    <li key={user.id}>
                        <div>
                            <strong>{user.username}</strong> - {user.email}
                        </div>
                        <div>
                            <button onClick={() => setEditUser(user)}>Edit</button>
                            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Edit User Form */}
            {editUser && (
                <div className="edit-user">
                    <h3>Edit User</h3>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={editUser.username}
                        onChange={handleInputChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={editUser.email}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleUpdateUser}>Update</button>
                    <button onClick={() => setEditUser(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default Users;
