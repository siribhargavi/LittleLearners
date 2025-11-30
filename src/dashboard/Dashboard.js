import React, { useEffect, useState } from "react";
import NavbarAfterLogin from "./NavbarAfterLogin";
import "./Dashboard.css";

export default function Dashboard() {
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("littleLearnerUser"));
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";

    setIsLoggedIn(loggedIn);

    if (storedUser && storedUser.name) {
      setUserName(storedUser.name);
    } else {
      setUserName("Little Learner");
    }

    // Redirect if not logged in
    if (!loggedIn) {
      window.location.href = "/signin";
    }
  }, []);

  if (!isLoggedIn) return null;

  return (
    <div className="dashboard-container">

      <div className="dashboard-body">
        {/* Sidebar - Interest Zones */}
        <aside className="sidebar">
          <ul>
<li>
  <a href="/art-and-craft" className="nav-link" style={{ textDecoration: 'none' }}>
    🎨 Art & Craft
  </a>
</li>

            <li>💻 Coding</li>
            <li>🤖 Robotics</li>
            <li>📚 Books</li>
            <li>🏃 Sports</li>
            <li>🔬 Science Lab</li>
            <li>🏆 Competitions</li>
            <li>📈 Progress</li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <h2>Hi {userName} 👋</h2>
          <p>Welcome back! Let’s make today a fun learning adventure.</p>

          {/* Class Selector */}
          <div className="class-selector">
            {["Nursery", "LKG", "UKG", "Class 1", "Class 2"].map((cls) => (
              <button key={cls} className="class-chip">
                {cls}
              </button>
            ))}
          </div>

          {/* Core Subjects */}
          <h3 className="section-title">📚 Core Subjects</h3>

          <div className="card-grid subjects-grid">
<div
  className="dash-card subject"
  onClick={() => window.location.href = "/nursery-math"}
  style={{ cursor: "pointer" }}
>
  🔢 Math
</div>
            <div className="dash-card subject">🌍 EVS / Science</div>
            <div className="dash-card subject">🧠 GK</div>
            <div className="dash-card subject">🎵 Rhymes</div>
            <div className="dash-card subject">📘 Stories</div>
            <div className="dash-card subject">🗣️ Languages</div>
            <div className="dash-card subject">📖 Archana</div>
            <div className="dash-card subject">🙏 Sadacharam</div>
            
          </div>
        </main>
      </div>
    </div>
  );
}
