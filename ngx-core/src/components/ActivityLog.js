import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/activityLog.css';

const ActivityLog = () => {
    const [logs, setLogs] = useState([]);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    // Fetch activity logs
    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/app/logs/', {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                setLogs(response.data);
            })
            .catch((err) => setError('Failed to fetch activity logs.'));
    }, [token]);

    return (
        <div className="activity-log-container">
            <h2>Activity Log</h2>
            {error && <p className="error">{error}</p>}

            <table className="activity-table">
                <thead>
                    <tr>
                        <th>Serial No.</th>
                        <th>Action</th>
                        <th>Model</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log, index) => (
                        <tr key={log.id}>
                            <td>{index + 1}</td>
                            <td>{log.action}</td>
                            <td>{log.model_name}</td>
                            <td>{new Date(log.timestamp).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ActivityLog;
