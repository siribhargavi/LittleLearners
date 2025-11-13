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

    // ✅ Redirect if not logged in
    if (!loggedIn) {
      window.location.href = "/signin";
    }
  }, []);

  if (!isLoggedIn) return null; // Don’t render dashboard until verified

  return (
    <div className="dashboard-container">
      {/* ✅ Show only after-login navbar */}
      <NavbarAfterLogin />

      {/* Main Dashboard Layout */}
      <div className="dashboard-body">
        {/* Sidebar */}
        <aside className="sidebar">
          <ul>
            <li>📘 My Class</li>
            <li>🤖 Robotics</li>
            <li>💻 Coding</li>
            <li>🎨 Art & Craft</li>
            <li>🏃 Sports</li>
            <li>📚 Books</li>
            <li>🔬 Science Lab</li>
            <li>🏆 My Competitions</li>
            <li>📈 Progress</li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <h2>Hi {userName} 👋</h2>
          <p>Welcome back! Let’s make today a fun learning adventure.</p>

          <div className="card-grid">
            <div className="dash-card learn">
              <h3>📖 Learn</h3>
              <p>Explore worksheets, charts, and subjects.</p>
              <button>Go</button>
            </div>

            <div className="dash-card create">
              <h3>🎨 Create</h3>
              <p>Draw, write, or craft something amazing!</p>
              <button>Start</button>
            </div>

            <div className="dash-card compete">
              <h3>🏆 Compete</h3>
              <p>Join fun competitions and win badges.</p>
              <button>View</button>
            </div>

            <div className="dash-card club">
              <h3>🧠 Clubs</h3>
              <p>Join reading or science clubs with friends.</p>
              <button>Join</button>
            </div>

            <div className="dash-card progress">
              <h3>📈 Progress</h3>
              <p>Track your daily learning streak and growth.</p>
              <button>Check</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
