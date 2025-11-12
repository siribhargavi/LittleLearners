import React, { useState } from "react";
import "./AuthPage.css";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container">
      <nav className="auth-navbar">
        <div className="logo">🌈 Little Learners</div>
        <div className="auth-links">
          <button onClick={() => setIsLogin(true)} className={isLogin ? "active" : ""}>Login</button>
          <button onClick={() => setIsLogin(false)} className={!isLogin ? "active" : ""}>Sign Up</button>
        </div>
      </nav>

      <div className="auth-body">
        <div className="auth-left">
          <h2>Welcome to a World of Fun Learning 🎨</h2>
          <p>Explore creativity, science, sports, and coding — all in one playful space.</p>
          <img src="/images/learning_kids.svg" alt="learning kids" className="auth-illustration" />
        </div>

        <div className="auth-right">
          <div className="auth-card">
            <h3>{isLogin ? "Login" : "Create Account"}</h3>
            <form>
              {!isLogin && <input type="text" placeholder="Child's Name" required />}
              <input type="email" placeholder="Parent's Email" required />
              <input type="password" placeholder="Password" required />
              {!isLogin && <input type="text" placeholder="Child's Grade (e.g., 2)" />}
              <button type="submit" className="auth-btn">
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </form>

            <div className="auth-divider">or continue with</div>
            <div className="social-buttons">
              <button className="google-btn">Google</button>
              <button className="facebook-btn">Facebook</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
