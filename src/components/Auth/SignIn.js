import React, { useState, useEffect } from "react";
import "../Auth/Auth.css";
import { useNavigate } from "react-router-dom";

const SignIn = ({ setIsLoggedIn }) => {
  const [stars, setStars] = useState([]);
  const navigate = useNavigate();

  // 🌟 Background animation setup
  useEffect(() => {
    const generatedStars = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 2,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 5 + 5,
      opacity: Math.random() * 0.7 + 0.3,
    }));
    setStars(generatedStars);
  }, []);

  // ✅ Handle sign in
  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    const storedUser = JSON.parse(localStorage.getItem("littleLearnerUser"));

    if (!storedUser) {
      alert("No user found! Please sign up first.");
      navigate("/signup");
      return;
    }

    if (storedUser.email === email && storedUser.password === password) {
      // ✅ Successful login
      localStorage.setItem("isLoggedIn", "true");
      if (setIsLoggedIn) setIsLoggedIn(true);

      alert(`Welcome back, ${storedUser.name || storedUser.email}! 🌈`);

      // Redirect to dashboard
      navigate("/dashboard");

      // Force reload once to apply NavbarAfterLogin
      setTimeout(() => window.location.reload(), 300);
    } else {
      alert("Invalid email or password. Please try again!");
    }
  };

  return (
    <div className="auth-container1 signin-container">
      {/* 🌟 Falling Stars */}
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

      {/* 👦 Left Avatar */}
      <div className="avatar-container">
        <img src="/images/avatar.png" alt="avatar" className="avatar" />
        <div className="speech-bubble">Hi !!! 👋 Welcome Little Learner</div>
      </div>

      {/* 🔐 Sign In Card */}
      <div className="auth-card signin-card">
        <h2>Welcome Back! ✨</h2>
        <p>Let’s continue the adventure of learning.</p>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit" className="auth-btn signin-btn">
            Sign In
          </button>
        </form>
        <p className="switch-text">
          New here? <a href="/signup">Join Now</a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
