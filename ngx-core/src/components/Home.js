import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard'; // Example placeholder
import Users from './Users';
import ActivityLog from './ActivityLog'; // Import ActivityLog
import '../css/home.css';

const Home = () => {
    return (
        <div className="layout-container">
            <div className="sidebar">
                <h2>App Name</h2>
                <nav>
                    <ul>
                        <li>
                            <a href="/home/dashboard">Dashboard</a>
                        </li>
                        <li>
                            <a href="/home/users">Users</a>
                        </li>
                        <li>
                            <a href="/home/activity-log">Activity Log</a> {/* Add Activity Log Link */}
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="main-content">
                <Routes>
                    <Route path="/home/dashboard" element={<Dashboard />} />
                    <Route path="/home/users" element={<Users />} />
                    <Route path="/home/activity-log" element={<ActivityLog />} /> {/* Activity Log Route */}
                </Routes>
            </div>
        </div>
    );
};

export default Home;
