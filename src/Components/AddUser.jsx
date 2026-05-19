import React, { useState } from "react";
import api from "../Services/ApiService";
import AddBioData from "./AddBioData";

const AddUser = ({ allowedRoles = ["STUDENT", "FACULTY", "ADMIN"] }) => {
    const [createdUser, setCreatedUser] = useState(null);

    const [user, setUser] = useState({
        userId: "",
        name: "",
        email: "",
        password: "",
        role: "STUDENT"
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await api.post("/AddUser", user);

            // Store the ID before resetting the form so we can pass it to AddBioData
            const newlyCreatedId = user.response.userId;

            alert("User Added Successfully");

            console.log(response.data);

            setUser({
                userId: "",
                name: "",
                email: "",
                password: "",
                role: "STUDENT"
            });

            // Trigger the transition to the Bio Data form
            setCreatedUser({ userId: newlyCreatedId, role: user.role })

        } catch (error) {

            console.log(error);

            alert("Failed To Add User");
        }
    };

    return (
        <div style={{ padding: "10px", maxWidth: "600px", margin: "0 auto" }}>
            {createdUser ? (
                <AddBioData
                    userId={createdUser.userId}
                    userRole={createdUser.role}
                    onComplete={() => setCreatedUser(null)}
                />
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold" style={{ color: '#eee' }}>
                                User ID
                            </label>
                            <input
                                type="text"
                                name="userId"
                                value={user.userId}
                                onChange={handleChange}
                                className="form-control glass-input"
                                placeholder="Enter User ID"
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold" style={{ color: '#eee' }}>
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                className="form-control glass-input"
                                placeholder="Enter Name"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold" style={{ color: '#eee' }}>
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            className="form-control glass-input"
                            placeholder="Enter Email"
                            required
                        />
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold" style={{ color: '#eee' }}>
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                className="form-control glass-input"
                                placeholder="Enter Password"
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-4">
                            <label className="form-label fw-bold" style={{ color: '#eee' }}>
                                Role
                            </label>
                            <select
                                name="role"
                                value={user.role}
                                onChange={handleChange}
                                className="form-select glass-input"
                            >
                                {allowedRoles.includes("STUDENT") && <option value="STUDENT">Student</option>}
                                {allowedRoles.includes("FACULTY") && <option value="FACULTY">Faculty</option>}
                                {allowedRoles.includes("ADMIN") && <option value="ADMIN">Admin</option>}
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100 shadow-sm"
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
                        + Create User
                    </button>
                </form>
            )}
        </div>
    );
};

export default AddUser;