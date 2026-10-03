import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import "../style/navbar.css";
import Login from "../pages/Login";

const Navbar = ({ setActive }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const savedUser = JSON.parse(localStorage.getItem("user"));
  if(!savedUser){
    <Login />
    return
  }

  return (
    
    <header className="navbar">
      <div className="brand">
        <span className="brand-icon">⚡</span>
        <h1>
          Sky <span className="accent">Mart</span>
        </h1>
      </div>

      <nav className="nav-links">
        <a
          onClick={() => navigate("/home")}
          className={location.pathname === "/home" ? "active" : ""}
        >
          Home
        </a>
        <a
          onClick={() => navigate("/shop")}
          className={location.pathname === "/shop" ? "active" : ""}
        >
          Shop
        </a>
        <a
          onClick={() => navigate("/about")}
          className={location.pathname === "/about" ? "active" : ""}
        >
          About
        </a>
      </nav>
      <div className="nav-right">
        <div className="user-chip">
          <span className="user-avatar">
            {savedUser?.username?.charAt(0).toUpperCase()}
          </span>
          <span>{savedUser.username}</span>
        </div>
        <button
          onClick={() => {
            setActive((prev) => !prev);
          }}
          className="icon-btn cart"
        >
          🛒
        </button>
        <button
          onClick={() => {
            const confirmLogout = confirm("Are you sure you want to logout?");

            if (confirmLogout) {
              localStorage.removeItem("user");
              navigate("/")
            }
          }}
          className="icon-btn logout"
        >
          ⏻
        </button>
      </div>
    </header>
  );
};

export default Navbar;
