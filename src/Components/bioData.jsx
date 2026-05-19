import React from 'react'

export const BioData = ({ user, onBack }) => {
    return (
        <div className="biodata-container" style={{ padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.2)' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="m-0" style={{ fontWeight: 'bold' }}>My Bio Data</h2>
                {onBack && (
                    <button className="btn btn-sm btn-outline-light" onClick={onBack} style={{ borderRadius: '50px', padding: '5px 15px' }}>
                        &larr; Back
                    </button>
                )}
            </div>
            
            {user ? (
                <ul className="list-group list-group-flush bg-transparent">
                    <li className="list-group-item bg-transparent text-white border-light d-flex justify-content-between">
                        <strong>ID Number:</strong> <span>{user.id}</span>
                    </li>
                    <li className="list-group-item bg-transparent text-white border-light d-flex justify-content-between">
                        <strong>Full Name:</strong> <span>{user.name}</span>
                    </li>
                    <li className="list-group-item bg-transparent text-white border-light d-flex justify-content-between">
                        <strong>Email Address:</strong> <span>{user.email}</span>
                    </li>
                    <li className="list-group-item bg-transparent text-white border-light d-flex justify-content-between">
                        <strong>Role:</strong> <span><span className="badge bg-primary">{user.role}</span></span>
                    </li>
                </ul>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    )
}
