import React, { useState } from 'react'
import api from '../Services/ApiService';
import { useNavigate, Link } from 'react-router-dom';

export const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/login", {
                email,
                password
            })
            localStorage.setItem("user", JSON.stringify(response.data))
            const user = response.data
            if (user.role === "STUDENT") {
                navigate("/student")
            }
            else if (user.role === "FACULTY") {
                navigate("/faculty")
            }
            else if (user.role === "ADMIN") {
                navigate("/admin")
            }
            else if (user.role === "SUPERADMIN") {
                navigate("/superAdmin")
            }
        }
        catch (error) {
            alert(error.message)
        }
    }
    
    return (
        <div className="animated-bg-home" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="glass-panel" style={{ maxWidth: '400px', padding: '40px' }}>
                
                <div className="text-center mb-4">
                    <h2 className="fw-bold m-0" style={{ background: '-webkit-linear-gradient(45deg, #4e54c8, #8f94fb)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Welcome Back
                    </h2>
                    <p className="text-muted mt-2">Login to your account</p>
                </div>

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="form-label fw-bold" style={{ color: '#555' }}>
                            Email Address
                        </label>
                        <input
                            type="email"
                            className="form-control form-control-lg glass-input"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label fw-bold" style={{ color: '#555' }}>
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control form-control-lg glass-input"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    <button
                        type="submit"
                        className="btn btn-primary w-100 shadow"
                        style={{ padding: "12px", borderRadius: "12px", fontWeight: "bold", background: 'linear-gradient(45deg, #4e54c8, #8f94fb)', border: 'none' }}
                    >
                        Login Securely
                    </button>

                    <div className="text-center mt-4">
                        <Link to="/" className="text-muted text-decoration-none">
                            <small>&larr; Back to Home</small>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}