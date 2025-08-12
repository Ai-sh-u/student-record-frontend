import React, { useState, useEffect } from "react";
import API from "../api";
import { useNavigate, useParams } from "react-router-dom";

export default function AddEditStudent({ editMode = false }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({ name: "", regno: "", dept: "", email: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      // fetch student and fill form
      API.get("/api/students")
        .then(res => {
          const student = res.data.find(s => s._id === id);
          if (student) setForm({ name: student.name, regno: student.regno, dept: student.dept, email: student.email });
          else alert("Student not found");
        })
        .catch(err => {
          console.error(err);
          alert("Could not load student");
        });
    }
  }, [id]);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (id) {
        // update
        await API.put(`/api/students/${id}`, form);
        alert("Student updated");
      } else {
        // create
        await API.post("/api/students/register", form);
        alert("Student added");
      }
      navigate("/manage");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.error || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-edit">
      <form className="student-form" onSubmit={submit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="regno" placeholder="Roll Number" value={form.regno} onChange={handleChange} required />
        <input name="dept" placeholder="Department" value={form.dept} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <button className="primary" type="submit" disabled={loading}>
          {id ? "Update Student" : "Add Student"}
        </button>
      </form>
    </div>
  );
}
