import React from 'react'

import { useNavigate } from 'react-router-dom';

export const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("user"); // Clear the user session
        navigate("/login"); // Redirect to login page
    };

    return (
        <div>
            <form onSubmit={handleLogout}>
                <button type="submit" className="btn btn-danger">Logout</button>
            </form>
        </div>
    )
}
