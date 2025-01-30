import React, { useState, useEffect } from 'react';
import '../styles/dashboard.css';  // Import the CSS file

const Dashboard = () => {
    const [clocks, setClocks] = useState([]);

    useEffect(() => {
        const updateTimes = () => {
            const timeZones = [
                { city: "New York", zone: "America/New_York" },
                { city: "London", zone: "Europe/London" },
                { city: "Tokyo", zone: "Asia/Tokyo" },
                { city: "Sydney", zone: "Australia/Sydney" },
                { city: "Paris", zone: "Europe/Paris" },
                { city: "Moscow", zone: "Europe/Moscow" }
            ];

            const updatedClocks = timeZones.map(({ city, zone }) => ({
                city,
                time: new Date().toLocaleString('en-US', { timeZone: zone })
            }));

            setClocks(updatedClocks);
        };

        updateTimes();
        const intervalId = setInterval(updateTimes, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="dashboard-container">
            <h2>🌍 Regional Clocks Dashboard</h2>
            <p>Stay updated with different time zones in real-time!</p>

            <div className="regional-clocks">
                {clocks.map(({ city, time }, index) => (
                    <div className="wall-clock" key={index}>
                        <div className="clock-time">{time}</div>
                        <div className="clock-label">{city}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
