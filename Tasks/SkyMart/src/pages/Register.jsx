import React, { useState } from "react";
import "../style/form.css";
import { useNavigate } from "react-router";
import { Link } from "react-router";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const username = formData.get("username")?.trim();
    const email = formData.get("email")?.trim();
    const password = formData.get("password")?.trim();
    const confirmPassword = formData.get("confirm Password")?.trim();

    if (!username || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const user = {
      username,
      email,
      password,
    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Registration Successful!");
    navigate("/");

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
          <h2>Create Account</h2>
          <p className="signin-subtext">
            Fill in your details to create an account
          </p>

          <form onSubmit={handleRegister}>
            <div className="input-group">
              <span className="input-icon">👤</span>
              <input
                type="text"
                name="username"
                placeholder="Full Name"
                required={true}
              />
            </div>

            <div className="input-group">
              <span className="input-icon">✉</span>
              <input
                required={true}
                type="email"
                name="email"
                placeholder="Email address"
              />
            </div>

            <div className="input-group">
              <span className="input-icon">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                required={true}
              />
              <span
                className="toggle-eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁"}
              </span>
            </div>

            <div className="input-group">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirm Password"
                required={true}
              />
            </div>

            <button type="submit" className="signin-btn">
              Create Account →
            </button>
          </form>

          <p className="signup-text">
            Already have an account?{" "}
            <span className="accent-link" onClick={() => navigate("/")}>
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
