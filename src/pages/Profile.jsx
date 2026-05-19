import { useEffect, useState } from "react";
import AsyncAlert from "../components/AsyncAlert.jsx";
import { biodataApi, usersApi } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [passwordForm, setPasswordForm] = useState({ newPassword: "", confirmPassword: "" });
  const [message, setMessage] = useState({});

  useEffect(() => {
    if (user.role === "STUDENT") biodataApi.student(user.userId).then(({ data }) => setProfile(data)).catch(() => {});
    if (user.role === "FACULTY") biodataApi.faculty(user.userId).then(({ data }) => setProfile(data)).catch(() => {});
  }, [user]);

  async function changePassword(event) {
    event.preventDefault();
    setMessage({});

    if (passwordForm.newPassword.length < 8) {
      setMessage({ error: "Password must be at least 8 characters." });
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage({ error: "Passwords do not match." });
      return;
    }

    try {
      await usersApi.resetPassword(user.userId, passwordForm.newPassword);
      setMessage({ success: "Password updated successfully." });
      setPasswordForm({ newPassword: "", confirmPassword: "" });
    } catch (err) {
      setMessage({ error: err.response?.data?.message || "Unable to update password." });
    }
  }

  return (
    <section className="panel">
      <h2 className="h5">Profile</h2>
      <div className="profile-head">
        <img src={profile?.imageUrl || "https://placehold.co/120x120?text=SFMS"} alt="" />
        <div>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <span className="badge text-bg-primary">{user.role}</span>
        </div>
      </div>
      {profile ? (
        <dl className="profile-grid">
          {Object.entries(profile).map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{String(value ?? "-")}</dd></div>)}
        </dl>
      ) : (
        <p className="text-secondary mb-0">No biodata has been added for this account yet.</p>
      )}

      <div className="mt-4">
        <h2 className="h5">Change Password</h2>
        <form onSubmit={changePassword} className="d-grid gap-3">
          <AsyncAlert {...message} />
          <input
            className="form-control"
            type="password"
            placeholder="New password"
            value={passwordForm.newPassword}
            minLength="8"
            onChange={(event) => setPasswordForm({ ...passwordForm, newPassword: event.target.value })}
            required
          />
          <input
            className="form-control"
            type="password"
            placeholder="Confirm password"
            value={passwordForm.confirmPassword}
            onChange={(event) => setPasswordForm({ ...passwordForm, confirmPassword: event.target.value })}
            required
          />
          <button className="btn btn-primary">Update Password</button>
        </form>
      </div>
    </section>
  );
}
