import React, { useState, useEffect } from "react";
import "../Auth/Auth.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [symbolsList, setSymbolsList] = useState([]);
  const navigate = useNavigate();

  const symbols = [
    // Alphabets A–Z
    "A","B","C","D","E","F","G","H","I","J","K","L","M",
    "N","O","P","Q","R","S","T","U","V","W","X","Y","Z",

    // Fun learning emojis
    "📖","🅰️","🅱️","🧠","🔤","📚","🖍️","✏️","📘","📕",
    "📗","📙","🧩","🎨","🎈","⭐","🌈","💡","🧸","🎵",
    "🪄","🔠","🔢","🧮","✂️","📏","📐","🎓","💫","🪁",
    "🖋️","🧷","🧃","🍎","🐝","🦋","🌸","💛","🪶","💙",
    "💜","🍏","🎠","🪅","🎁","📒","📔","📓","✒️","🔡"
  ];

  useEffect(() => {
    const generated = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      left: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() * 1.2 + 0.8,
      duration: Math.random() * 8 + 8,
    }));
    setSymbolsList(generated);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registration successful (mock)!");
    navigate("/signin");
  };

  return (
    <div className="auth-container">
      {/* 🌈 Floating symbols */}
      {symbolsList.map((s) => (
        <span
          key={s.id}
          className="floating-symbol"
          style={{
            left: `${s.left}%`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            fontSize: `${s.size}rem`,
          }}
        >
          {s.symbol}
        </span>
      ))}

      {/* 🧩 Auth card */}
      <div className="auth-card">
        <h2>Join Little Learners 🌟</h2>
        <p>Fun. Creative. Inspiring. Let’s Gooo..</p>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Full Name" required />
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit" className="auth-btn">Start the Adventure</button>
        </form>
        <p className="switch-text">
          Already have an account? <a href="/signin">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
