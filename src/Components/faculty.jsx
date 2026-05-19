import React, { useEffect, useState } from 'react';
import { Logout } from './logout';
import './Dashboard.css';

export const Faculty = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <div className="dashboard-container">
            <div className="glass-panel">
                <div className="dashboard-header">
                    <div className="dashboard-title">
                        <h1>Faculty Portal</h1>
                        <p>Welcome back, {user?.name || 'Faculty Member'}!</p>
                    </div>
                    <div className="role-badge role-faculty">
                        {user?.role || 'FACULTY'}
                    </div>
                </div>

                <div className="action-grid">
                    <div className="action-card">
                        <i>👨‍🏫</i>
                        <h3>My Classes</h3>
                    </div>
                    <div className="action-card">
                        <i>📊</i>
                        <h3>Grading</h3>
                    </div>
                    <div className="action-card">
                        <i>📋</i>
                        <h3>Attendance</h3>
                    </div>
                    <div className="action-card">
                        <i>💬</i>
                        <h3>Messages</h3>
                    </div>
                </div>

                <div className="dashboard-footer">
                    <Logout />
                </div>
            </div>
        </div>
    );
};