import React from "react";
import "../style/about.css";
import { useNavigate } from "react-router";

export default function About() {
  const navigate = useNavigate()
  return (
    <div className="about-page">
      <div className="about-header">
        <h1>About SkyMart</h1>
        <p>
          We're building the shopping experience of tomorrow — fast, simple,
          and built around what our customers actually need.
        </p>
      </div>

      <div className="team-grid">

        <div className="team-card">
          <span className="avatar avatar-lime">A</span>
          <h3>Aryan Shah</h3>
          <p>Founder & CEO</p>
        </div>

        <div className="team-card">
          <span className="avatar avatar-blue">P</span>
          <h3>Priya Mehta</h3>
          <p>Head of Product</p>
        </div>

        <div className="team-card">
          <span className="avatar avatar-purple">R</span>
          <h3>Rohan Verma</h3>
          <p>Lead Engineer</p>
        </div>

        <div className="team-card">
          <span className="avatar avatar-pink">S</span>
          <h3>Sneha Kapoor</h3>
          <p>Design Director</p>
        </div>

      </div>

      <div className="cta-card">
        <h2>Ready to shop?</h2>
        <p>Explore thousands of products at unbeatable prices.</p>
        <button onClick={() => navigate("/shop")} className="browse-btn">
          Browse Products →
        </button>
      </div>
    </div>
  );
}
