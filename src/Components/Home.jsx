import React from 'react'
import { Navbar } from './Navbar'
import { Link } from 'react-router-dom'
import { Footer } from './Footer'

export const Home = () => {

    return (
        <>
            <Navbar />
            
            {/* HERO SECTION */}
            <section className="hero-section animated-bg-home">
                <div className="container mt-5">
                    <h1 className="fw-bold mb-4">
                        Smart Student & Faculty Management System
                    </h1>
                    <p className="lead mb-5 mx-auto" style={{ maxWidth: '700px', opacity: '0.9' }}>
                        A beautiful, seamless, and secure way to manage students, faculty, attendance,
                        assignments, and academic records efficiently.
                    </p>
                    <div className="d-flex justify-content-center gap-4">
                        <Link className="btn btn-light btn-lg px-5 shadow-sm" style={{ borderRadius: '50px', fontWeight: 'bold', color: '#4e54c8' }} to="/login">
                            Get Started
                        </Link>
                        <Link className="btn btn-outline-light btn-lg px-5" style={{ borderRadius: '50px', borderWidth: '2px', fontWeight: 'bold' }} to="/login" >
                            Login Portal
                        </Link>
                    </div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section className="feature-section">
                <div className="container">
                    <h2 className="text-center fw-bold mb-5" style={{ color: '#333' }}>
                        Powerful Features
                    </h2>

                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="feature-card">
                                <div className="mb-3 fs-1">🎓</div>
                                <h4 className="fw-bold mb-3" style={{ color: '#4e54c8' }}>
                                    Student Management
                                </h4>
                                <p className="text-muted">
                                    Manage student profiles, academic records and performance with a beautiful intuitive interface.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="feature-card">
                                <div className="mb-3 fs-1">👨‍🏫</div>
                                <h4 className="fw-bold mb-3" style={{ color: '#4e54c8' }}>
                                    Faculty Hub
                                </h4>
                                <p className="text-muted">
                                    Organize faculty schedules, departments and course details without the hassle.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="feature-card">
                                <div className="mb-3 fs-1">✅</div>
                                <h4 className="fw-bold mb-3" style={{ color: '#4e54c8' }}>
                                    Live Attendance
                                </h4>
                                <p className="text-muted">
                                    Track attendance digitally with real-time updates and automated reporting.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="feature-card">
                                <div className="mb-3 fs-1">📚</div>
                                <h4 className="fw-bold mb-3" style={{ color: '#4e54c8' }}>
                                    Assignment Portal
                                </h4>
                                <p className="text-muted">
                                    Upload, track, and grade assignments in one centralized, secure location.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="feature-card">
                                <div className="mb-3 fs-1">🔒</div>
                                <h4 className="fw-bold mb-3" style={{ color: '#4e54c8' }}>
                                    Secure Authentication
                                </h4>
                                <p className="text-muted">
                                    Enterprise-grade JWT secure login for all roles and permissions.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="feature-card">
                                <div className="mb-3 fs-1">📈</div>
                                <h4 className="fw-bold mb-3" style={{ color: '#4e54c8' }}>
                                    Rich Analytics
                                </h4>
                                <p className="text-muted">
                                    Analyze academic performance using stunning dashboards and clear reports.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* STATISTICS SECTION */}
            <section className="animated-bg-home" style={{ padding: '80px 20px', boxShadow: 'inset 0 10px 20px rgba(0,0,0,0.1)' }}>
                <div className="container">
                    <div className="row text-center g-4">
                        <div className="col-md-3">
                            <h1 className="fw-bold display-4">5k+</h1>
                            <p className="fs-5 opacity-75">Students</p>
                        </div>
                        <div className="col-md-3">
                            <h1 className="fw-bold display-4">250+</h1>
                            <p className="fs-5 opacity-75">Faculty</p>
                        </div>
                        <div className="col-md-3">
                            <h1 className="fw-bold display-4">50+</h1>
                            <p className="fs-5 opacity-75">Courses</p>
                        </div>
                        <div className="col-md-3">
                            <h1 className="fw-bold display-4">20+</h1>
                            <p className="fs-5 opacity-75">Departments</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="text-center" style={{ padding: '100px 20px', background: '#fff' }}>
                <div className="container">
                    <h2 className="fw-bold mb-4" style={{ color: '#333', fontSize: '2.5rem' }}>
                        Ready to elevate your campus?
                    </h2>
                    <p className="lead text-muted mb-5">
                        Join the modern era of academic management today.
                    </p>
                    <Link className="btn btn-primary btn-lg px-5 shadow" style={{ borderRadius: '50px', background: 'linear-gradient(45deg, #4e54c8, #8f94fb)', border: 'none' }} to="/login">
                        Log In Now
                    </Link>
                </div>
            </section>

            <Footer />
        </>
    )
}
