import { useEffect, useState } from "react";
import AsyncAlert from "../components/AsyncAlert.jsx";
import { academicsApi, facultyApi, studentApi } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Attendance() {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({ studentUserId: "", subjectId: "", attendanceDate: new Date().toISOString().slice(0, 10), present: true });
  const [message, setMessage] = useState({});

  useEffect(() => {
    academicsApi.subjects().then(({ data }) => setSubjects(data));
    if (user.role === "STUDENT") studentApi.attendance(user.userId).then(({ data }) => setRows(data));
  }, [user]);

  async function submit(event) {
    event.preventDefault();
    await facultyApi.attendance({ ...form, subjectId: Number(form.subjectId) });
    setMessage({ success: "Attendance uploaded." });
  }

  return (
    <section className="row g-4">
      {user.role === "FACULTY" && (
        <div className="col-lg-4">
          <div className="panel">
            <h2 className="h5">Upload Attendance</h2>
            <AsyncAlert {...message} />
            <form onSubmit={submit} className="d-grid gap-3">
              <input className="form-control" placeholder="Student User ID" value={form.studentUserId} onChange={(e) => setForm({ ...form, studentUserId: e.target.value })} required />
              <select className="form-select" value={form.subjectId} onChange={(e) => setForm({ ...form, subjectId: e.target.value })} required>
                <option value="">Subject</option>
                {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
              <input className="form-control" type="date" value={form.attendanceDate} onChange={(e) => setForm({ ...form, attendanceDate: e.target.value })} required />
              <label className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={form.present} onChange={(e) => setForm({ ...form, present: e.target.checked })} />
                <span className="form-check-label">Present</span>
              </label>
              <button className="btn btn-primary">Upload</button>
            </form>
          </div>
        </div>
      )}
      <div className="col-lg-8">
        <RecordTable title="Attendance" rows={rows} columns={["attendanceDate", "subjectName", "present"]} />
      </div>
    </section>
  );
}

function RecordTable({ title, rows, columns }) {
  return (
    <div className="panel table-responsive">
      <h2 className="h5">{title}</h2>
      <table className="table"><thead><tr>{columns.map((c) => <th key={c}>{c}</th>)}</tr></thead>
      <tbody>{rows.map((r) => <tr key={r.id}>{columns.map((c) => <td key={c}>{String(r[c])}</td>)}</tr>)}</tbody></table>
    </div>
  );
}
