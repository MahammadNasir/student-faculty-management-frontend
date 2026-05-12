import { useEffect, useState } from "react";
import AsyncAlert from "../components/AsyncAlert.jsx";
import { academicsApi, facultyApi, studentApi } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Marks() {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({ studentUserId: "", subjectId: "", examType: "Internal", score: 0, maxScore: 100 });
  const [message, setMessage] = useState({});

  useEffect(() => {
    academicsApi.subjects().then(({ data }) => setSubjects(data));
    if (user.role === "STUDENT") studentApi.marks(user.userId).then(({ data }) => setRows(data));
  }, [user]);

  async function submit(event) {
    event.preventDefault();
    await facultyApi.marks({ ...form, subjectId: Number(form.subjectId), score: Number(form.score), maxScore: Number(form.maxScore) });
    setMessage({ success: "Marks uploaded." });
  }

  return (
    <section className="row g-4">
      {user.role === "FACULTY" && (
        <div className="col-lg-4">
          <div className="panel">
            <h2 className="h5">Upload Marks</h2>
            <AsyncAlert {...message} />
            <form onSubmit={submit} className="d-grid gap-3">
              <input className="form-control" placeholder="Student User ID" value={form.studentUserId} onChange={(e) => setForm({ ...form, studentUserId: e.target.value })} required />
              <select className="form-select" value={form.subjectId} onChange={(e) => setForm({ ...form, subjectId: e.target.value })} required>
                <option value="">Subject</option>
                {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
              <input className="form-control" placeholder="Exam Type" value={form.examType} onChange={(e) => setForm({ ...form, examType: e.target.value })} required />
              <input className="form-control" type="number" value={form.score} onChange={(e) => setForm({ ...form, score: e.target.value })} required />
              <input className="form-control" type="number" value={form.maxScore} onChange={(e) => setForm({ ...form, maxScore: e.target.value })} required />
              <button className="btn btn-primary">Upload</button>
            </form>
          </div>
        </div>
      )}
      <div className="col-lg-8"><RecordTable rows={rows} /></div>
    </section>
  );
}

function RecordTable({ rows }) {
  return (
    <div className="panel table-responsive">
      <h2 className="h5">Marks</h2>
      <table className="table"><thead><tr><th>Subject</th><th>Exam</th><th>Score</th></tr></thead>
      <tbody>{rows.map((r) => <tr key={r.id}><td>{r.subjectName}</td><td>{r.examType}</td><td>{r.score}/{r.maxScore}</td></tr>)}</tbody></table>
    </div>
  );
}
