import { useEffect, useState } from "react";
import StatCard from "../components/StatCard.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { academicsApi, studentApi, usersApi } from "../services/api.js";

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ users: "-", departments: "-", subjects: "-", assignments: "-" });

  useEffect(() => {
    async function load() {
      const [departments, subjects] = await Promise.all([academicsApi.departments(), academicsApi.subjects()]);
      let users = { data: [] };
      let assignments = { data: [] };
      if (user.role === "SUPERADMIN") users = await usersApi.all();
      if (["STUDENT", "FACULTY"].includes(user.role)) assignments = await studentApi.assignments(user.userId);
      setStats({ users: users.data.length || "-", departments: departments.data.length, subjects: subjects.data.length, assignments: assignments.data.length || "-" });
    }
    load().catch(() => {});
  }, [user]);

  const roleCopy = {
    SUPERADMIN: "Create admins, govern users, and keep access clean.",
    ADMIN: "Manage departments, subjects, faculty, and student records.",
    FACULTY: "Upload attendance, marks, and assignments for your students.",
    STUDENT: "Track your profile, attendance, marks, and assignments."
  };

  return (
    <section className="d-grid gap-4">
      <div className="hero-band">
        <div>
          <p className="eyebrow">Role Dashboard</p>
          <h2>{roleCopy[user.role]}</h2>
        </div>
      </div>
      <div className="row g-3">
        <div className="col-md-3"><StatCard label="Users" value={stats.users} tone="primary" /></div>
        <div className="col-md-3"><StatCard label="Departments" value={stats.departments} tone="success" /></div>
        <div className="col-md-3"><StatCard label="Subjects" value={stats.subjects} tone="warning" /></div>
        <div className="col-md-3"><StatCard label="Assignments" value={stats.assignments} tone="info" /></div>
      </div>
    </section>
  );
}
