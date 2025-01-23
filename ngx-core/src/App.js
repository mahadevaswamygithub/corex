import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import ActivityLog from './components/ActivityLog';
import Tables from './components/Tables';
import Login from './components/Login';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="users" element={<Users />} />
                    <Route path="activity-log" element={<ActivityLog />} />
                    <Route path="tables" element={<Tables />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
