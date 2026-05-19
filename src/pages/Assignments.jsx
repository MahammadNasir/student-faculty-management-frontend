import { useEffect, useState } from "react";
import AsyncAlert from "../components/AsyncAlert.jsx";
import { academicsApi, facultyApi, studentApi } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Assignments() {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({ subjectId: "", title: "", description: "", dueDate: "", fileUrl: "" });
  const [message, setMessage] = useState({});

  async function loadAssignments() {
    const { data } = await studentApi.assignments(user.userId);
    setRows(data);
  }

  useEffect(() => {
    academicsApi.subjects().then(({ data }) => setSubjects(data));
    loadAssignments();
  }, []);

  async function submit(event) {
    event.preventDefault();
    await facultyApi.assignments({ ...form, subjectId: Number(form.subjectId) });
    setForm({ subjectId: "", title: "", description: "", dueDate: "", fileUrl: "" });
    setMessage({ success: "Assignment uploaded." });
    await loadAssignments();
  }

  return (
    <section className="row g-4">
      {user.role === "FACULTY" && (
        <div className="col-lg-4">
          <div className="panel">
            <h2 className="h5">Upload Assignment</h2>
            <AsyncAlert {...message} />
            <form onSubmit={submit} className="d-grid gap-3">
              <select className="form-select" value={form.subjectId} onChange={(e) => setForm({ ...form, subjectId: e.target.value })} required>
                <option value="">Subject</option>
                {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
              <input className="form-control" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              <textarea className="form-control" rows="4" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
              <input className="form-control" type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
              <input className="form-control" placeholder="Cloudinary secure URL" value={form.fileUrl} onChange={(e) => setForm({ ...form, fileUrl: e.target.value })} />
              <button className="btn btn-primary">Upload</button>
            </form>
          </div>
        </div>
      )}
      <div className="col-lg-8">
        <div className="panel">
          <h2 className="h5">Assignments</h2>
          <div className="row g-3">
            {rows.map((a) => (
              <div className="col-md-6" key={a.id}>
                <article className="assignment-card">
                  <span>{a.subjectName}</span>
                  <h3>{a.title}</h3>
                  <p>{a.description}</p>
                  <small>Due {a.dueDate || "open"}</small>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
