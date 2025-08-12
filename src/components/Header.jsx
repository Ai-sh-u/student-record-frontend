import React from "react";

export default function Header({ onLogout }) {
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return (
    <header className="header">
      <div className="welcome">Welcome: <strong>admin</strong></div>
      <div className="date">{today}</div>
      <button className="logout-btn" onClick={onLogout}>Log Out</button>
    </header>
  );
}
