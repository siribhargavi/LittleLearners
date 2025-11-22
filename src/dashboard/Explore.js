import React, { useState } from "react";
import "./Explore.css";
import NavbarAfterLogin from "./NavbarAfterLogin";

// Using the uploaded avatar file path (replace/move if needed for your build)
import fizzo from "../assets/fizzo.png";

const CATEGORIES = [
  { id: "alpha", title: "Alphabet Puzzles", desc: "Match letters, fill gaps & more!", progress: 0.32, stars: 12, badge: "ABC Novice" },
  { id: "math", title: "Math Puzzles", desc: "Counting, patterns & sequences.", progress: 0.48, stars: 21,  badge: null },
  { id: "logic", title: "Logic Puzzles", desc: "Brain teasers for smart kids.", progress: 0.12, stars: 4, badge: null},
  { id: "picture", title: "Picture Puzzles", desc: "Spot the differences & memory games.", progress: 0.68, stars: 35 },
  { id: "animal", title: "Animal Puzzles", desc: "Guess animals, match shadows.", progress: 0.05, stars: 1, badge: null },
  { id: "color", title: "Color Puzzles", desc: "Color match, paint logic & more.", progress: 0.24, stars: 6, badge: null },
];

export default function PuzzleWorld() {
  const [selected, setSelected] = useState(null);

  const onStart = (cat) => {
    // placeholder — plug into your router or puzzle engine
    alert(`Start ${cat.title} — progress ${(cat.progress * 100).toFixed(0)}%`);
    setSelected(cat.id);
  };

  const totalStars = CATEGORIES.reduce((s, c) => s + c.stars, 0);
  const avgProgress = (CATEGORIES.reduce((s, c) => s + c.progress, 0) / CATEGORIES.length);

  return (
    <>
      <NavbarAfterLogin />

      <div className="pw-wrap">

        {/* HERO */}
        <header className="pw-hero">
          <div className="pw-hero-left">
            <div className="pw-avatar-card" aria-hidden>
              <img src={fizzo} alt="Fizzo the Fox" className="pw-avatar" />
            </div>

            <div className="pw-text">
              <h1 className="pw-title">Welcome to Puzzle World!</h1>
              <p className="pw-sub">Solve puzzles → Win stars → Unlock badges → Level up!</p>

              <div className="pw-quick">
                <div className="pw-stat">
                  <div className="stat-label">Total Stars</div>
                  <div className="stat-value">⭐ {totalStars}</div>
                </div>

                <div className="pw-stat">
                  <div className="stat-label">Overall</div>
                  <div className="stat-value">{Math.round(avgProgress * 100)}%</div>
                </div>

                <button className="pw-cta" onClick={() => alert("Jump into today's challenge!")}>Today’s Challenge</button>
              </div>
            </div>
          </div>

          <div className="pw-hero-right">
            <div className="pw-progress-panel">
              <div className="pp-header">My Progress</div>
              <div className="pp-bar">
                <div className="pp-fill" style={{ width: `${Math.round(avgProgress * 100)}%` }} />
              </div>
              <div className="pp-sub">Keep going — unlock a surprise at 50%!</div>
            </div>
          </div>
        </header>

        {/* CATEGORIES GRID */}
        <main className="pw-main">
          <h2 className="pw-section-title">Choose a Puzzle Category</h2>

          <div className="pw-grid">
            {CATEGORIES.map((cat) => (
              <article key={cat.id} className={`pw-card ${selected === cat.id ? "active" : ""}`}>
                <div className="card-top">
                  <h3 className="card-title">{cat.title}</h3>
                  <div className="card-stars">{"⭐".repeat(Math.min(3, Math.ceil(cat.stars / 10)))}</div>
                </div>

                <p className="card-desc">{cat.desc}</p>

                <div className="card-meta">
                  <div className="meta-progress">
                    <div className="meta-bar">
                      <div className="meta-fill" style={{ width: `${Math.round(cat.progress * 100)}%` }} />
                    </div>
                    <div className="meta-percent">{Math.round(cat.progress * 100)}%</div>
                  </div>

                  <div className="meta-badge">
                    {cat.badge ? <span className="badge">{cat.badge}</span> : <span className="badge muted">No badge</span>}
                  </div>
                </div>

                <div className="card-actions">
                  <button className="btn-start" onClick={() => onStart(cat)}>Start</button>
                  <button className="btn-info" onClick={() => alert(`${cat.title}\n\n${cat.desc}`)}>Info</button>
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
