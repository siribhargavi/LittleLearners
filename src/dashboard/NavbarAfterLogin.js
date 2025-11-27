import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "./NavbarAfterLogin.css";

const NavbarAfterLogin = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("Learner");
  const [avatar, setAvatar] = useState("/images/avatar.png"); // default avatar

  const handleLogoClick = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("littleLearnerUser"));

    // Set name
    if (storedUser?.name) {
      setUserName(storedUser.name.split(" ")[0]);
    }

    // Set avatar
    const savedAvatar = localStorage.getItem("kidAvatar");
    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("littleLearnerUser");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("kidAvatar"); // clear avatar
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar-after">
      
      {/* Left: Logo */}
      <div className="nav-left" onClick={() => navigate("/dashboard")}>
        <img
          src={logo}
          alt="Little Learners"
          className="nav-logo"
          onClick={handleLogoClick}
        />
      </div>

      {/* Center Links */}
      <ul className="nav-links-after">
        <li onClick={() => navigate("/dashboard")}>Home</li>
        <li onClick={() => navigate("/puzzle-world")}>Explore</li>
        <li onClick={() => navigate("/learn")}>Learn</li>
        <li onClick={() => navigate("/create")}>Create</li>
        <li onClick={() => navigate("/compete")}>Compete</li>
        <li onClick={() => navigate("/progress")}>Progress</li>
      </ul>

      {/* Right: User Profile */}
      <div className="nav-right">
        <div className="user-info" onClick={() => navigate("/profile")}>
          <img src={avatar} alt="user avatar" className="nav-avatar" />

          <span className="user-name">
            {userName} ✨


          </span>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavbarAfterLogin;
