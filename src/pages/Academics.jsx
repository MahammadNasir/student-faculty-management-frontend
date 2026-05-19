import { useEffect, useState } from "react";
import AsyncAlert from "../components/AsyncAlert.jsx";
import { academicsApi } from "../services/api.js";

export default function Academics() {
  const [departments, setDepartments] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [dept, setDept] = useState({ code: "", name: "" });
  const [subject, setSubject] = useState({ code: "", name: "", semester: 1, departmentId: "", facultyUserId: "" });
  const [message, setMessage] = useState({});

  async function load() {
    const [d, s] = await Promise.all([academicsApi.departments(), academicsApi.subjects()]);
    setDepartments(d.data);
    setSubjects(s.data);
  }
  useEffect(() => { load().catch(() => setMessage({ error: "Unable to load academics." })); }, []);

  async function saveDepartment(event) {
    event.preventDefault();
    await academicsApi.saveDepartment(dept);
    setDept({ code: "", name: "" });
    await load();
  }

  async function saveSubject(event) {
    event.preventDefault();
    await academicsApi.saveSubject({ ...subject, semester: Number(subject.semester), departmentId: Number(subject.departmentId) });
    setSubject({ code: "", name: "", semester: 1, departmentId: "", facultyUserId: "" });
    await load();
  }

  return (
    <section className="row g-4">
      <div className="col-lg-4 d-grid gap-4">
        <div className="panel">
          <h2 className="h5">Department</h2>
          <AsyncAlert {...message} />
          <form onSubmit={saveDepartment} className="d-grid gap-3">
            <input className="form-control" placeholder="Code" value={dept.code} onChange={(e) => setDept({ ...dept, code: e.target.value })} required />
            <input className="form-control" placeholder="Name" value={dept.name} onChange={(e) => setDept({ ...dept, name: e.target.value })} required />
            <button className="btn btn-primary">Save Department</button>
          </form>
        </div>
        <div className="panel">
          <h2 className="h5">Subject</h2>
          <form onSubmit={saveSubject} className="d-grid gap-3">
            <input className="form-control" placeholder="Code" value={subject.code} onChange={(e) => setSubject({ ...subject, code: e.target.value })} required />
            <input className="form-control" placeholder="Name" value={subject.name} onChange={(e) => setSubject({ ...subject, name: e.target.value })} required />
            <input className="form-control" type="number" min="1" placeholder="Semester" value={subject.semester} onChange={(e) => setSubject({ ...subject, semester: e.target.value })} required />
            <select className="form-select" value={subject.departmentId} onChange={(e) => setSubject({ ...subject, departmentId: e.target.value })} required>
              <option value="">Department</option>
              {departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
            <input className="form-control" placeholder="Faculty User ID" value={subject.facultyUserId} onChange={(e) => setSubject({ ...subject, facultyUserId: e.target.value })} />
            <button className="btn btn-primary">Save Subject</button>
          </form>
        </div>
      </div>
      <div className="col-lg-8 d-grid gap-4">
        <List title="Departments" rows={departments} columns={["code", "name"]} />
        <List title="Subjects" rows={subjects} columns={["code", "name", "semester", "departmentName", "facultyName"]} />
      </div>
    </section>
  );
}

function List({ title, rows, columns }) {
  return (
    <div className="panel table-responsive">
      <h2 className="h5">{title}</h2>
      <table className="table align-middle">
        <thead><tr>{columns.map((c) => <th key={c}>{c}</th>)}</tr></thead>
        <tbody>{rows.map((row) => <tr key={row.id}>{columns.map((c) => <td key={c}>{row[c] || "-"}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}
