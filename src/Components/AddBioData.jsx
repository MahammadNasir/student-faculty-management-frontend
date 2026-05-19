import React, { useState } from 'react';
import api from '../Services/ApiService';

export const AddBioData = ({ userId, userRole, onComplete }) => {
    const [bioData, setBioData] = useState({
        id: userId,
        name: "",
        department: "",
        batch: "",
        section: "",
        phone: "",
        address: ""
    });

    const handleChange = (e) => {
        setBioData({
            ...bioData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Dynamically build endpoint based on role
            let endpoint = "/addBioData"; // default
            if (userRole === "STUDENT") endpoint = "/addStudentBioData";
            else if (userRole === "FACULTY") endpoint = "/addFacultyBioData";
            else if (userRole === "ADMIN") endpoint = "/addAdminBioData";

            await api.post(endpoint, bioData);
            alert("Bio Data Added Successfully");
            onComplete(); // Go back to AddUser form
        } catch (error) {
            console.error(error);
            alert("Failed to add Bio Data");
        }
    };

    return (
        <div style={{ padding: "10px", maxWidth: "600px", margin: "0 auto" }}>
            <div className="mb-4 text-center">
                <h3 style={{ color: '#eee' }}>Complete Profile Setup</h3>
                <p style={{ color: '#bbb' }}>Please add bio data for User ID: {userId}</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold" style={{ color: '#eee' }}>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={bioData.name}
                            onChange={handleChange}
                            className="form-control glass-input"
                            placeholder="Enter Name"
                            required
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold" style={{ color: '#eee' }}>Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            value={bioData.phone}
                            onChange={handleChange}
                            className="form-control glass-input"
                            placeholder="Enter Phone Number"
                            required
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold" style={{ color: '#eee' }}>Department</label>
                        <input
                            type="text"
                            name="department"
                            value={bioData.department}
                            onChange={handleChange}
                            className="form-control glass-input"
                            placeholder="e.g. Computer Science"
                            required
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold" style={{ color: '#eee' }}>Batch</label>
                        <input
                            type="text"
                            name="batch"
                            value={bioData.batch}
                            onChange={handleChange}
                            className="form-control glass-input"
                            placeholder="e.g. 2024"
                            required
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold" style={{ color: '#eee' }}>Section</label>
                        <input
                            type="text"
                            name="section"
                            value={bioData.section}
                            onChange={handleChange}
                            className="form-control glass-input"
                            placeholder="e.g. A"
                            required
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold" style={{ color: '#eee' }}>Department</label>
                        <input
                            type="text"
                            name="department"
                            value={bioData.department}
                            onChange={handleChange}
                            className="form-control glass-input"
                            placeholder="e.g. Computer Science"
                            required
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="form-label fw-bold" style={{ color: '#eee' }}>Address</label>
                    <textarea
                        name="address"
                        value={bioData.address}
                        onChange={handleChange}
                        className="form-control glass-input"
                        placeholder="Enter Address"
                        rows="3"
                        required
                    ></textarea>
                </div>

                <div className="d-flex gap-3">
                    <button
                        type="button"
                        className="btn btn-outline-light w-50 shadow-sm"
                        style={{ borderRadius: "12px", padding: "12px" }}
                        onClick={onComplete}
                    >
                        Skip for Now
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary w-50 shadow-sm"
                        style={{
                            borderRadius: "12px",
                            fontWeight: "bold",
                            background: "rgba(255, 255, 255, 0.2)",
                            border: "1px solid rgba(255,255,255,0.3)",
                            color: "#fff",
                            padding: "12px"
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)" }}
                        onMouseOut={(e) => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)" }}
                    >
                        Save Bio Data
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBioData;
