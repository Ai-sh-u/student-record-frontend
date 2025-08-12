import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await API.get("/api/students");
      setStudents(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch students. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const deleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await API.delete(`/api/students/${id}`);
      setStudents(prev => prev.filter(s => s._id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed.");
    }
  };

  return (
    <div className="manage">
      <h2>Manage Students</h2>
      <div className="table-wrap">
        <table className="student-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Reg No</th>
              <th>Department</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5">Loading...</td></tr>
            ) : students.length === 0 ? (
              <tr><td colSpan="5">No students found</td></tr>
            ) : (
              students.map(s => (
                <tr key={s._id}>
                  <td>{s.name}</td>
                  <td>{s.regno}</td>
                  <td>{s.dept}</td>
                  <td>{s.email}</td>
                  <td>
                    <button className="action edit" onClick={() => navigate(`/edit/${s._id}`)}>Edit</button>
                    <button className="action del" onClick={() => deleteStudent(s._id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
