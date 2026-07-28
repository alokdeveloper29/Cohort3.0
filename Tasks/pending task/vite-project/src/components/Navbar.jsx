import React, { useState } from "react";
import { useNavigate } from "react-router";
import "../style/navbar.css";

const Navbar = ({ setActive }) => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("home");

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
          onClick={() => {
            setActiveLink("home");
            navigate("/");
          }}
          className={activeLink === "home" ? "active" : ""}
        >
          Home
        </a>

        <a
          onClick={() => {
            setActiveLink("shop");
            navigate("/shop");
          }}
          className={activeLink === "shop" ? "active" : ""}
        >
          Shop
        </a>

        <a
          onClick={() => {
            setActiveLink("about");
            navigate("/about");
          }}
          className={activeLink === "about" ? "active" : ""}
        >
          About
        </a>
      </nav>
      <div className="nav-right">
        <div className="user-chip">
          <span className="user-avatar">{"A"}</span>
          <span>{"Alok"}</span>
        </div>
        <button
          onClick={() => {
            setActive((prev) => !prev);
          }}
          className="icon-btn cart"
        >
          🖥
        </button>
        <button className="icon-btn logout">⏻</button>
      </div>
    </header>
  );
};

export default Navbar;
