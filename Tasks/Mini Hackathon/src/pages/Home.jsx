import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import { useState } from "react";

const SubmissionCard = () => {
  const navigate = useNavigate();
  return (
    <div className="submission-container">
      <div className="logo">🚀</div>

      <h1>Redux Toolkit Mini Hackathon</h1>
      <p className="subtitle">Submission Document</p>

      <div className="card" onClick={() => navigate("/todo")}>
        <h3>📄 PROJECT</h3>
        <p>View Project</p>
      </div>

      <div
        className="card"
        onClick={() =>
          window.open(
            "https://github.com/alokdeveloper29/Cohort3.0/tree/main/Tasks/Mini%20Hackathon/README.md",
            "_blank",
          )
        }
      >
        <h3>📄 README</h3>
        <p>README Link</p>
      </div>

      <div
        className="card"
        onClick={() =>
          window.open(
            "https://www.linkedin.com/posts/alok-kumar-19769b415_reactjs-reduxtoolkit-redux-activity-7487874320384434176-BxC0?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAGmkfEMBhJz_0k9M2eQU_vFD9uC4QX1NCXE&utm_campaign=whatsapp",
            "_blank",
          )
        }
      >
        <h3>💼 LinkedIn Post</h3>
        <p>LinkedIn Link</p>
      </div>

      <div
        className="card"
        onClick={() =>
          window.open(
            "https://github.com/alokdeveloper29/Cohort3.0/tree/main/Tasks/Mini%20Hackathon",
            "_blank",
          )
        }
      >
        <h3>💻 GitHub Repository</h3>
        <p>View Repository</p>
      </div>

      <div className="card">
        <h3>🧑‍💻 Submitted By</h3>
        <p>Alok</p>
      </div>

      <footer>Made with ❤️ by Alok</footer>
    </div>
  );
};

export default SubmissionCard;
