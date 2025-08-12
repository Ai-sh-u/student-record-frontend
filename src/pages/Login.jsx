import React, { useState } from "react";
import "./../styles.css";

export default function Login({ onLogin }) {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // default admin credentials
  const defaultId = "admin123";
  const defaultPass = "password123";

  const submit = (e) => {
    e.preventDefault();

    if (loginId === defaultId && password === defaultPass) {
      setError("");
      onLogin();
      return;
    }

    // If you later implement backend auth, replace with API call
    setError("Invalid credentials. Use admin123 / password123");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Student Record Management System</h2>
        <form onSubmit={submit}>
          <label>Login ID</label>
          <input value={loginId} onChange={(e) => setLoginId(e.target.value)} placeholder="Enter Login ID" required />
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" required />
          {error && <div className="error">{error}</div>}
          <button className="login-btn" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
