import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
<footer className="footer" id="contact">
      <div className="footer-top">
        

        <div className="footer-col links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#competitions">Competitions</a></li>
            <li><a href="#games">Games</a></li>
            <li><a href="#blog">Blog</a></li>
          </ul>
        </div>

        <div className="footer-col connect">
          <h4>Connect With Us</h4>
          <div className="socials">
            <a href="#" title="Facebook" className="facebook">
              <FaFacebookF />
            </a>
            <a href="#" title="Instagram" className="instagram">
              <FaInstagram />
            </a>
            <a href="#" title="YouTube" className="youtube">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © 2025 <b>Little Learners</b> 🌼 | Crafted with 💖 and curiosity.
      </div>
    </footer>
  );
};

export default Footer;
