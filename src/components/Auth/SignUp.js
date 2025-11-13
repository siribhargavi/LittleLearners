import React, { useState, useEffect } from "react";
import "../Auth/Auth.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [symbolsList, setSymbolsList] = useState([]);
  const navigate = useNavigate();

  const symbols = [
    "A","B","C","D","E","F","G","H","I","J","K","L","M",
    "N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
    "📖","🅰️","🅱️","🧠","🔤","📚","🖍️","✏️","📘","📕",
    "📗","📙","🧩","🎨","🎈","⭐","🌈","💡","🧸","🎵",
    "🪄","🔠","🔢","🧮","✂️","📏","📐","🎓","💫","🪁",
    "🖋️","🧷","🧃","🍎","🐝","🦋","🌸","💛","🪶","💙",
    "💜","🍏","🎠","🪅","🎁","📒","📔","📓","✒️","🔡"
  ];

  // Floating symbols animation setup
  useEffect(() => {
    const generated = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      left: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() * 1.2 + 0.8,
      duration: Math.random() * 10 + 10,
    }));
    setSymbolsList(generated);
  }, []);

  // Save credentials on submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    if (!name || !email || !password) {
      alert("Please fill all fields!");
      return;
    }

    // Save user data to localStorage (mock registration)
    const user = { name, email, password };
    localStorage.setItem("littleLearnerUser", JSON.stringify(user));

    alert(`🎉 Welcome aboard, ${name}! Your account has been created.`);
    navigate("/signin");
  };

  return (
    <div className="auth-container">
      {/* Floating fun symbols */}
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

      {/* Auth card */}
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
