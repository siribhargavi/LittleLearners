import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // ✅ still from src/assets
import "./NavbarAfterLogin.css";

const NavbarAfterLogin = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Learner");
 const handleLogoClick = () => {
    navigate("/dashboard");
  };
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("littleLearnerUser"));
    if (storedUser && storedUser.name) {
      setUserName(storedUser.name.split(" ")[0]);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("littleLearnerUser");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar-after">
      {/* Left: Logo */}
      <div className="nav-left" onClick={() => navigate("/dashboard")}>
        <img src={logo} alt="Little Learners" className="nav-logo" onClick={handleLogoClick}
 />
      </div>

      {/* Center Links */}
      <ul className="nav-links-after">
        <li onClick={() => navigate("/dashboard")}>Home</li>
<li onClick={() => navigate("/puzzle-world")}>Explore</li>
        <li onClick={() => navigate("/learn")}>Learn</li>
        <li>Create</li>
        <li>Compete</li>
        <li>Progress</li>
      </ul>

      {/* Right: User Profile */}
      <div className="nav-right">
        <div className="user-info">
          <img src="/images/avatar.png" alt="user avatar" className="nav-avatar" />
          <span className="user-name">Hi, {userName} 👋</span>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavbarAfterLogin;
