import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Navbar.css";


const Navbar = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/"); // ✅ Go to home
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" }); // ✅ Smooth scroll to top
    }, 100);
  };

  return (
<nav className="navbar">
  <div className="logo-container" onClick={handleLogoClick}>
    <img src={logo} alt="Little Learners Logo" className="site-logo" />
  </div>

  <ul className="nav-links">
    <li><a href="/#about" className="nav-link">About</a></li>
    <li><a href="/#explorecards" className="nav-link">Features</a></li>
    <li><a href="/#competitions" className="nav-link">Competitions</a></li>
    <li><a href="/#contact" className="nav-link">Contact</a></li>
  </ul>

  <div className="auth-buttons">
    <button className="signin" onClick={() => navigate("/signin")}>Sign In</button>
    <button className="join-btn" onClick={() => navigate("/signup")}>Join Now</button>
  </div>

  <div className="bee"></div>
</nav>

  );
};

export default Navbar;
