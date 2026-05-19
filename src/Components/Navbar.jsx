import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light navbar-glass fixed-top">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    EduPortal
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Features</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Contact</a>
                        </li>
                        <li className="nav-item ms-lg-3 mt-3 mt-lg-0">
                            <Link to="/login" className="btn btn-primary px-4 shadow-sm" style={{ borderRadius: '50px' }}>
                                Login
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}