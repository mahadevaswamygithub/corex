import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import '../css/layout.css';

const Layout = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    return (
        <div className="layout-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <h2>My App</h2>
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/home" end>
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/home/users">Users</NavLink>
                        </li>
                        <li>
                            <NavLink to="/home/activity-log">Activity Log</NavLink>
                        </li>
                        <li>
                            <NavLink to="/home/tables">Tables</NavLink>
                        </li>
                    </ul>
                </nav>
                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
