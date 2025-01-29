import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/users.css';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const token = localStorage.getItem('token');

    // Fetch users with pagination
    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/app/users/?page=${page}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                setUsers(response.data.results);
                setTotalPages(Math.ceil(response.data.count / 10)); // Assuming 10 users per page
            })
            .catch((err) => setError('Failed to fetch users.'));
    }, [page, token]);

    return (
        <div className="users-container">
            <h2>Users</h2>
            {error && <p className="error">{error}</p>}
            <table className="users-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                                <Link to={`/home/users/${user.id}`}>
                                    <button>View Details</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>Prev</button>
                <span>Page {page} of {totalPages}</span>
                <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default Users;
