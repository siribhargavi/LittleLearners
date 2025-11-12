import React from "react";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="top-navbar">
        <div className="logo">🌟 Little Learners</div>
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Explore</a>
          <a href="#">Learn</a>
          <a href="#">Create</a>
          <a href="#">Compete</a>
          <a href="#">Clubs</a>
        </div>
        <div className="user-profile">
          <img src="/images/avatar.png" alt="user" />
        </div>
      </nav>

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
          <h2>Hi Aarav 👋</h2>
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
