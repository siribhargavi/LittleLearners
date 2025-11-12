import React, { useState, useEffect } from "react";
import "../Auth/Auth.css";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [stars, setStars] = useState([]);
  const [symbols, setSymbols] = useState([]);
  const navigate = useNavigate();

  // Generate falling stars
  useEffect(() => {
    const generatedStars = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 2,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 5 + 5,
      opacity: Math.random() * 0.7 + 0.3
    }));
    setStars(generatedStars);

    // Generate floating alphabets & emojis
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ✨🧠📚✏️🔤";
    const generatedSymbols = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      char: chars[Math.floor(Math.random() * chars.length)],
      left: Math.random() * 100,
      size: Math.random() * 24 + 16,
      delay: Math.random() * 5
    }));
    setSymbols(generatedSymbols);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Signed in successfully!");
    navigate("/");
  };

  return (
    <div className="auth-container1 signin-container">
      {/* Falling Stars */}
      {stars.map((s) => (
        <span
          key={s.id}
          className="falling-star"
          style={{
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            opacity: s.opacity,
          }}
        />
      ))}

      {/* Floating symbols */}
      {symbols.map((s) => (
        <span
          key={s.id}
          className="floating-symbol"
          style={{
            left: `${s.left}%`,
            fontSize: `${s.size}px`,
            animationDelay: `${s.delay}s`
          }}
        >
          {s.char}
        </span>
      ))}

      {/* Left Avatar */}
      <div className="avatar-container">
        <img src="/images/avatar.png" alt="avatar" className="avatar" />
        <div className="speech-bubble">Hi !!! 👋 Welcome Little Learner</div>
      </div>

      {/* Sign In Card */}
      <div className="auth-card signin-card">
        <h2>Welcome Back! ✨</h2>
        <p>Let’s continue the adventure of learning.</p>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit" className="auth-btn signin-btn">Sign In</button>
        </form>
        <p className="switch-text">
          New here? <a href="/signup">Join Now</a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
