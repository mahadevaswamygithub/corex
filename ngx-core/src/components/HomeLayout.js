import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import '../styles/homeLayout.css';

const HomeLayout = () => {
    const [user, setUser] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user')); // assuming user details are stored in localStorage
        setUser(storedUser);
    }, []);

    return (
        <div className="layout-container">
            <Header user={user} handleLogout={handleLogout} />
            <div className="main-content">
                <Sidebar handleLogout={handleLogout} />
                <main className="content">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default HomeLayout;
