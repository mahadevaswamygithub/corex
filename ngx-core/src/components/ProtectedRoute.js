// components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isTokenExpired } from '../utils/auth';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token || isTokenExpired(token)) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default ProtectedRoute;