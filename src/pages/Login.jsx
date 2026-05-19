import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { LockKeyhole, School } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) return <Navigate to="/" replace />;

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(form.email, form.password);
      navigate("/");
    } catch {
      setError("Invalid credentials or disabled account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-panel">
        <div className="brand text-primary mb-4">
          <School size={34} />
          <div>
            <strong>SFMS</strong>
            <span>Secure University Operations</span>
          </div>
        </div>
        <h1 className="h3 mb-2">Sign in</h1>
        <p className="text-secondary mb-4">Access your role-based workspace.</p>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={submit} className="d-grid gap-3">
          <label className="form-label">
            Email
            <input className="form-control mt-1" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </label>
          <label className="form-label">
            Password
            <input className="form-control mt-1" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          </label>
          <button className="btn btn-primary btn-lg d-flex align-items-center justify-content-center gap-2" disabled={loading}>
            <LockKeyhole size={18} /> {loading ? "Signing in..." : "Login"}
          </button>
        </form>
      </section>
    </main>
  );
}
