import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/sidebar.css';

const Sidebar = ({ handleLogout }) => {
    const [isOpen, setIsOpen] = useState(true); // State to track sidebar open/close

    const toggleSidebar = () => {
        setIsOpen(!isOpen); // Toggle the sidebar open/close state
    };

    return (
        <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <div className="sidebar-header">
                <button className="toggle-btn" onClick={toggleSidebar}>
                    {isOpen ? '>' : '<'} {/* Toggle between '>' and '<' */}
                </button>
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/home" end className={({ isActive }) => isActive ? 'active' : ''}>
                            <span className="icon">🏠</span>
                            <span className="text">Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/home/users" className={({ isActive }) => isActive ? 'active' : ''}>
                            <span className="icon">👥</span>
                            <span className="text">Users</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/home/activity-log" className={({ isActive }) => isActive ? 'active' : ''}>
                            <span className="icon">📊</span>
                            <span className="text">Activity Log</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <button className="logout-btn" onClick={handleLogout}>
                <span className="icon">🚪</span>
                <span className="text">Logout</span>
            </button>
        </aside>
    );
};

export default Sidebar;
