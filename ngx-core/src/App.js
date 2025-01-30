// App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomeLayout from './components/HomeLayout';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import ActivityLog from './pages/ActivityLog';
import Login from './pages/Login';
import UserDetails from './pages/UserDetails';
import { isTokenExpired, getTokenExpiryTime } from './utils/auth';

// ProtectedRoute component to check authentication
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token || isTokenExpired(token)) {
        localStorage.removeItem('token'); // Clear expired token
        return <Navigate to="/" />; // Redirect to login page
    }
    return children;
};

function App() {
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const expiryTime = getTokenExpiryTime(token);
            if (expiryTime) {
                const timeUntilExpiry = expiryTime - Date.now();
                if (timeUntilExpiry > 0) {
                    // Set a timer to log out the user when the token expires
                    const timer = setTimeout(() => {
                        localStorage.removeItem('token');
                        window.location.href = '/';
                    }, timeUntilExpiry);

                    return () => clearTimeout(timer); // Clear the timer on component unmount
                } else {
                    // Token is already expired, log out immediately
                    localStorage.removeItem('token');
                    window.location.href = '/';
                }
            }
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <HomeLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Dashboard />} />
                    <Route path="users" element={<Users />} />
                    <Route path="users/:id" element={<UserDetails />} />
                    <Route path="activity-log" element={<ActivityLog />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;