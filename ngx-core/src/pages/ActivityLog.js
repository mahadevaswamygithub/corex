import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/activityLog.css';

const ActivityLog = () => {
    const [logs, setLogs] = useState([]); // Store logs
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const token = localStorage.getItem('token');

    // Fetch activity logs with pagination
    const fetchLogs = (page = 1) => {
        setLoading(true);
        axios
            .get(`http://127.0.0.1:8000/app/logs/?page=${page}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                console.log("API Response:", response.data); // Debugging

                // Extract logs from API response
                setLogs(response.data.results || []);
                setNextPage(response.data.next);
                setPrevPage(response.data.previous);
                setCurrentPage(page);
            })
            .catch((err) => {
                console.error("Error fetching logs:", err);
                setError('Failed to fetch activity logs.');
                setLogs([]);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    return (
        <div className="activity-log-container">
            <h2>Activity Log</h2>
            {error && <p className="error-message">{error}</p>}
            {loading ? (
                <div className="loading-spinner"></div>
            ) : (
                <>
                    <table className="activity-table">
                        <thead>
                            <tr>
                                <th>Serial</th>
                                <th>Action</th>
                                <th>Model</th>
                                <th>Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.length > 0 ? (
                                logs.map((log, index) => (
                                    <tr key={log.id}>
                                        <td>{index + 1 + (currentPage - 1) * 10}</td>
                                        <td>{log.action}</td>
                                        <td>{log.model_name}</td>
                                        <td>{new Date(log.timestamp).toLocaleString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="no-logs-message">No logs found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    <div className="pagination">
                        <button 
                            onClick={() => fetchLogs(currentPage - 1)} 
                            disabled={!prevPage || loading}
                            className="pagination-button"
                        >
                            Previous
                        </button>
                        <span className="page-indicator">Page {currentPage}</span>
                        <button 
                            onClick={() => fetchLogs(currentPage + 1)} 
                            disabled={!nextPage || loading}
                            className="pagination-button"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ActivityLog;