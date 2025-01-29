import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeLayout from './components/HomeLayout';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import ActivityLog from './pages/ActivityLog';
import Login from './pages/Login';
import UserDetails from './pages/UserDetails';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<HomeLayout />}>
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
