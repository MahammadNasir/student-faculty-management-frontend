import React, { useEffect, useState } from 'react';
import { Logout } from './logout';
import AddUser from './AddUser';
import './Dashboard.css';

export const SuperAdmin = () => {
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
                        <h1>SuperAdmin Portal</h1>
                        <p>Welcome back, {user?.name || 'Super Administrator'}!</p>
                    </div>
                    <div className="role-badge role-superadmin">
                        {user?.role || 'SUPERADMIN'}
                    </div>
                </div>

                <div className="action-grid">
                    <div className="action-card">
                        <i>🌍</i>
                        <h3>Global Settings</h3>
                    </div>
                    <div className="action-card">
                        <i>🛡️</i>
                        <h3>Security Logs</h3>
                    </div>
                </div>

                <div className="admin-section">
                    <h2>Quick Action: Add User</h2>
                    <AddUser />
                </div>

                <div className="dashboard-footer">
                    <Logout />
                </div>
            </div>
        </div>
    );
};
