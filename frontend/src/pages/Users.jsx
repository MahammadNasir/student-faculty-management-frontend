import { useEffect, useState } from "react";
import AsyncAlert from "../components/AsyncAlert.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { usersApi } from "../services/api.js";

export default function Users() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ userId: "", name: "", email: "", password: "", role: "STUDENT" });
  const [message, setMessage] = useState({});

  async function load() {
    if (user.role !== "SUPERADMIN") return;
    const { data } = await usersApi.all();
    setUsers(data);
  }

  useEffect(() => { load().catch(() => setMessage({ error: "Unable to load users." })); }, [user.role]);

  async function create(event) {
    event.preventDefault();
    setMessage({});
    if (form.password.length < 8) {
      setMessage({ error: "Password must be at least 8 characters." });
      return;
    }
    try {
      await usersApi.create(form);
      setForm({ userId: "", name: "", email: "", password: "", role: "STUDENT" });
      await load();
      setMessage({ success: "User created with a BCrypt-hashed password." });
    } catch (err) {
      const fields = err.response?.data?.fields;
      const fieldMessage = fields
        ? Object.entries(fields).map(([field, text]) => `${field}: ${text}`).join(" ")
        : "";
      setMessage({ error: fieldMessage || err.response?.data?.message || "User creation failed." });
    }
  }

  async function toggle(user) {
    await usersApi.setEnabled(user.userId, !user.enabled);
    await load();
  }

  async function resetPassword(user) {
    const newPassword = window.prompt(`Enter a new password for ${user.name} (${user.userId}):`);
    if (newPassword === null) return;
    if (newPassword.length < 8) {
      setMessage({ error: "Password must be at least 8 characters." });
      return;
    }
    try {
      await usersApi.resetPassword(user.userId, newPassword);
      setMessage({ success: `Password reset for ${user.name}.` });
    } catch (err) {
      setMessage({ error: err.response?.data?.message || "Password reset failed." });
    }
  }

  return (
    <section className="row g-4">
      <div className="col-lg-4">
        <div className="panel">
          <h2 className="h5">Create User</h2>
          <AsyncAlert {...message} />
          <form onSubmit={create} className="d-grid gap-3">
            <input className="form-control" placeholder="User ID" value={form.userId} onChange={(e) => setForm({ ...form, userId: e.target.value })} required />
            <input className="form-control" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <input className="form-control" placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <input className="form-control" placeholder="Password, minimum 8 characters" type="password" minLength="8" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            <select className="form-select" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              {(user.role === "SUPERADMIN" ? ["ADMIN", "FACULTY", "STUDENT"] : ["FACULTY", "STUDENT"]).map((role) => <option key={role}>{role}</option>)}
            </select>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
      {user.role === "SUPERADMIN" && (
      <div className="col-lg-8">
        <div className="panel table-responsive">
          <h2 className="h5">All Users</h2>
          <table className="table align-middle">
            <thead><tr><th>User ID</th><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.userId}>
                  <td>{u.userId}</td><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td>
                  <td><span className={`badge ${u.enabled ? "text-bg-success" : "text-bg-secondary"}`}>{u.enabled ? "Enabled" : "Disabled"}</span></td>
                  <td className="d-flex gap-2">
                    <button className="btn btn-sm btn-outline-primary" onClick={() => toggle(u)}>{u.enabled ? "Disable" : "Enable"}</button>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => resetPassword(u)}>Reset Password</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      )}
    </section>
  );
}
