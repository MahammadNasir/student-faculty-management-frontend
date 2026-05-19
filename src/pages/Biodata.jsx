import { useEffect, useState } from "react";
import AsyncAlert from "../components/AsyncAlert.jsx";
import { academicsApi, biodataApi } from "../services/api.js";

export default function Biodata() {
  const [departments, setDepartments] = useState([]);
  const [student, setStudent] = useState({ userId: "", fatherName: "", motherName: "", dob: "", gender: "", address: "", phone: "", emergencyContact: "", bloodGroup: "", departmentId: "", year: 1, section: "", imageUrl: "" });
  const [faculty, setFaculty] = useState({ userId: "", qualification: "", experience: 0, specialization: "", departmentId: "", imageUrl: "" });
  const [message, setMessage] = useState({});

  useEffect(() => { academicsApi.departments().then(({ data }) => setDepartments(data)); }, []);

  async function saveStudent(event) {
    event.preventDefault();
    await biodataApi.saveStudent({ ...student, departmentId: Number(student.departmentId), year: Number(student.year) });
    setMessage({ success: "Student biodata saved." });
  }

  async function saveFaculty(event) {
    event.preventDefault();
    await biodataApi.saveFaculty({ ...faculty, departmentId: Number(faculty.departmentId), experience: Number(faculty.experience) });
    setMessage({ success: "Faculty biodata saved." });
  }

  return (
    <section className="row g-4">
      <div className="col-12"><AsyncAlert {...message} /></div>
      <div className="col-lg-7">
        <BiodataForm title="Student Biodata" data={student} setData={setStudent} onSubmit={saveStudent} departments={departments}
          fields={["userId", "fatherName", "motherName", "dob", "gender", "address", "phone", "emergencyContact", "bloodGroup", "year", "section", "imageUrl"]} />
      </div>
      <div className="col-lg-5">
        <BiodataForm title="Faculty Biodata" data={faculty} setData={setFaculty} onSubmit={saveFaculty} departments={departments}
          fields={["userId", "qualification", "experience", "specialization", "imageUrl"]} />
      </div>
    </section>
  );
}

function BiodataForm({ title, data, setData, onSubmit, departments, fields }) {
  return (
    <div className="panel">
      <h2 className="h5">{title}</h2>
      <form onSubmit={onSubmit} className="row g-3">
        {fields.map((field) => (
          <div className="col-md-6" key={field}>
            <input className="form-control" placeholder={field} type={field === "dob" ? "date" : field === "year" || field === "experience" ? "number" : "text"} value={data[field]} onChange={(e) => setData({ ...data, [field]: e.target.value })} required={["userId", "fatherName", "motherName", "qualification", "specialization"].includes(field)} />
          </div>
        ))}
        <div className="col-md-6">
          <select className="form-select" value={data.departmentId} onChange={(e) => setData({ ...data, departmentId: e.target.value })} required>
            <option value="">Department</option>
            {departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </div>
        <div className="col-12"><button className="btn btn-primary">Save</button></div>
      </form>
    </div>
  );
}
