import React, { useState } from "react";
import { useNavigate } from "react-router";
import "../style/form.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const email = formData.get("email");
    const password = formData.get("password");

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      alert("No account found. Please register first.");
      return;
    }

    if (
      password.trim() !== savedUser.password.trim() ||
      email.trim() !== savedUser.email.trim()
    ) {
      alert("Unauthorized! Invalid email or password.");
      return;
    }

    alert("Login Successful!");
    navigate("/home");

    e.target.reset();
  };

  return (
    <div className="login-page">
      <div className="left-panel">
        <div className="brand">
          <span className="brand-icon">⚡</span>
          <h1>
            Sky <span className="accent">Mart</span>
          </h1>
        </div>

        <span className="welcome-tag">WELCOME BACK</span>
        <h2 className="headline">
          Shop the future.
          <br />
          <span className="accent">Today.</span>
        </h2>
        <p className="subtext">
          Thousands of products, lightning-fast delivery, and prices that make
          your wallet happy.
        </p>

        <div className="stats">
          <div className="stat-box">
            <span className="stat-value">20K+</span>
            <span className="stat-label">Products</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">50K+</span>
            <span className="stat-label">Users</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">4.9★</span>
            <span className="stat-label">Rating</span>
          </div>
        </div>
      </div>

      <div className="right-panel">
        <div className="signin-card">
          <h2>Sign in</h2>
          <p className="signin-subtext">Enter your credentials to continue</p>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <span className="input-icon">✉</span>
              <input
                required={true}
                name="email"
                type="email"
                placeholder="Email address"
              />
            </div>

            <div className="input-group">
              <span className="input-icon">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required={true}
                name="password"
              />
              <span
                className="toggle-eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁"}
              </span>
            </div>

            <button type="submit" className="signin-btn">
              Sign in →
            </button>
          </form>

          <p className="signup-text">
            Don't have an account?{" "}
            <span className="accent-link" onClick={() => navigate("/register")}>
              Create one
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
