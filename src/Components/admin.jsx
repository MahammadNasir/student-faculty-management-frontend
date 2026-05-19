import React, { useEffect, useState } from 'react';
import { Logout } from './logout';
import AddUser from './AddUser';
import './Dashboard.css';

export const Admin = () => {
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
                        <h1>Admin Portal</h1>
                        <p>Welcome back, {user?.name || 'Administrator'}!</p>
                    </div>
                    <div className="role-badge role-admin">
                        {user?.role || 'ADMIN'}
                    </div>
                </div>

                <div className="action-grid">
                    <div className="action-card">
                        <i>👥</i>
                        <h3>User Directory</h3>
                    </div>
                    <div className="action-card">
                        <i>📈</i>
                        <h3>System Reports</h3>
                    </div>
                    <div className="action-card">
                        <i>⚙️</i>
                        <h3>Settings</h3>
                    </div>
                    <div className="action-card">
                        <i>🔔</i>
                        <h3>Notifications</h3>
                    </div>
                </div>

                <div className="admin-section mt-4">
                    <h2>Quick Action: Add User</h2>
                    <AddUser allowedRoles={["STUDENT", "FACULTY"]} />
                </div>

                <div className="dashboard-footer">
                    <Logout />
                </div>
            </div>
        </div>
    );
};
