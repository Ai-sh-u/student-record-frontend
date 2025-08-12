import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">SRMS</div>
      <nav className="nav">
        <NavLink to="/" className="nav-link">Dashboard</NavLink>
        <NavLink to="/manage" className="nav-link">Manage Students</NavLink>
        <NavLink to="/add" className="nav-link">Add Student</NavLink>
      </nav>
      <div className="time-card">
        <div>Time:</div>
        <div id="clock">{new Date().toLocaleTimeString()}</div>
      </div>
    </aside>
  );
}
