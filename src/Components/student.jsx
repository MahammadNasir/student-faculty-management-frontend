import React, { useEffect, useState } from 'react';
import { Logout } from './logout';
import { BioData } from './bioData';
import './Dashboard.css';

export const Student = () => {
    const [user, setUser] = useState(null);
    const [showBioData, setShowBioData] = useState(false);

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
                        <h1>Student Portal</h1>
                        <p>Welcome back, {user?.name || 'Student'}!</p>
                    </div>
                    <div className="role-badge role-student">
                        {user?.role || 'STUDENT'}
                    </div>
                </div>

                {!showBioData ? (
                    <div className="action-grid">
                        <div className="action-card">
                            <i>📚</i>
                            <h3>My Courses</h3>
                        </div>
                        <div className="action-card" onClick={() => setShowBioData(true)} style={{ cursor: 'pointer' }}>
                            <i>👤</i>
                            <h3>Bio Data</h3>
                        </div>
                        <div className="action-card">
                            <i>📝</i>
                            <h3>View Grades</h3>
                        </div>
                        <div className="action-card">
                            <i>📅</i>
                            <h3>Schedule</h3>
                        </div>
                        <div className="action-card">
                            <i>👤</i>
                            <h3>Profile</h3>
                        </div>
                    </div>
                ) : (
                    <div className="mb-4">
                        <BioData user={user} onBack={() => setShowBioData(false)} />
                    </div>
                )}

                <div className="dashboard-footer">
                    <Logout />
                </div>
            </div>
        </div>
    );
};
