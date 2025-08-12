import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ManageStudents from "./pages/ManageStudents";
import AddEditStudent from "./pages/AddEditStudent";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("srms_logged") === "true"
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("srms_logged");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="app">
      {isLoggedIn && <Sidebar />}
      <div className="main-area">
        {isLoggedIn && <Header onLogout={handleLogout} />}
        <div className="page-content">
          <Routes>
            <Route path="/login" element={<Login onLogin={() => { localStorage.setItem("srms_logged","true"); setIsLoggedIn(true); navigate("/"); }} />} />
            <Route path="/" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/manage" element={isLoggedIn ? <ManageStudents /> : <Navigate to="/login" />} />
            <Route path="/add" element={isLoggedIn ? <AddEditStudent /> : <Navigate to="/login" />} />
            <Route path="/edit/:id" element={isLoggedIn ? <AddEditStudent editMode={true} /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
