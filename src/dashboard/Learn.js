import React, { useEffect, useState } from "react";
import "./Learn.css";
import NavbarAfterLogin from "./NavbarAfterLogin";
import lionImg from "../assets/lion.png";

/* Sample data */
const sampleVideos = [
  { id: 1, title: "Counting Fun (1-20)", length: "4:32", thumb: lionImg },
  { id: 2, title: "Shapes & Patterns", length: "3:15", thumb: lionImg },
  { id: 3, title: "Story: The Little Star", length: "6:10", thumb: lionImg },
];

const sampleFlashcards = [
  { id: 1, front: "A", back: "A for Apple 🍎" },
  { id: 2, front: "B", back: "B for Ball 🎾" },
  { id: 3, front: "5", back: "Five - 5️⃣" },
];

const sampleWorksheets = [
  { id: 1, title: "Count & Color (1-10)", difficulty: "3+", pdf: lionImg },
  { id: 2, title: "Match the Shapes", difficulty: "4+", pdf: lionImg },
];

const sampleStories = [
  { id: 1, title: "Cub's Star Adventure", blurb: "A short interactive tale about finding stars." },
  { id: 2, title: "The Lost Balloon", blurb: "A gentle story about friends helping each other." },
];

const sampleAnimations = [
  { id: 1, title: "Sparkle Loop", src: lionImg },
  { id: 2, title: "Cub Wave", src: lionImg },
];

export default function Learn() {
  const [flashIndex, setFlashIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  /* ⭐ Lion Cub Wandering Animation */
  useEffect(() => {
    const cub = document.getElementById("learn-lion-cub");
    if (!cub) return;

    function moveCub() {
      const minX = 5, maxX = 75;
      const minY = 8, maxY = 65;

      const x = Math.random() * (maxX - minX) + minX;
      const y = Math.random() * (maxY - minY) + minY;

      cub.style.transform = `translate(${x}vw, ${y}vh)`;
    }

    moveCub(); // initial position

    const interval = setInterval(moveCub, 2000);

    return () => clearInterval(interval);
  }, []);

  const nextFlash = () => {
    setFlipped(false);
    setFlashIndex((i) => (i + 1) % sampleFlashcards.length);
  };

  const prevFlash = () => {
    setFlipped(false);
    setFlashIndex((i) => (i - 1 + sampleFlashcards.length) % sampleFlashcards.length);
  };

  return (
    <>
      <NavbarAfterLogin />

      {/* 🦁 LION CUB */}
      <img src={lionImg} id="learn-lion-cub" alt="lion cub mascot" />

      <div className="learn-wrap">
        {/* HERO SECTION */}
        <header className="learn-hero">
          <h1 className="learn-title">Learn & Play</h1>
          <p className="learn-sub">
            Videos • Flashcards • Worksheets • Stories • Animations • Printables
          </p>

          <div className="learn-cta-row">
            <button className="cta-primary">Today's Challenge</button>
            <button className="cta-ghost">My Progress</button>
          </div>
        </header>

        <main className="learn-main">

          {/* Videos Section */}
          <section className="module">
            <div className="module-head">
              <h2>Videos</h2>
              <p className="module-sub">Short, friendly videos ideal for ages 5–15.</p>
            </div>

            <div className="videos-row">
              {sampleVideos.map(v => (
                <div key={v.id} className="video-card" onClick={() => alert(`Play: ${v.title}`)}>
                  <div className="video-thumb" style={{ backgroundImage: `url(${v.thumb})` }} />
                  <div className="video-meta">
                    <div className="video-title">{v.title}</div>
                    <div className="video-length">{v.length}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Flashcards */}
          <section className="module">
            <div className="module-head">
              <h2>Flashcards</h2>
              <p className="module-sub">Tap the card to flip!</p>
            </div>

            <div className="flashcard-area">
              <div
                className={`flashcard ${flipped ? "flipped" : ""}`}
                onClick={() => setFlipped(!flipped)}
              >
                <div className="flash-front">{sampleFlashcards[flashIndex].front}</div>
                <div className="flash-back">{sampleFlashcards[flashIndex].back}</div>
              </div>

              <div className="flash-controls">
                <button className="ghost-btn" onClick={prevFlash}>Prev</button>
                <button className="ghost-btn" onClick={nextFlash}>Next</button>
              </div>
            </div>
          </section>

          {/* Worksheets */}
          <section className="module">
            <div className="module-head">
              <h2>Practice Worksheets</h2>
            </div>

            <div className="worksheets-row">
              {sampleWorksheets.map(w => (
                <div key={w.id} className="worksheet-card">
                  <h4>{w.title}</h4>
                  <p>For ages {w.difficulty}</p>
                  <div className="worksheet-actions">
                    <a className="download-btn" href={w.pdf} target="_blank" rel="noreferrer">Download</a>
                    <button className="start-btn">Start</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Stories */}
          <section className="module">
            <div className="module-head">
              <h2>Story Lessons</h2>
            </div>

            <div className="stories-grid">
              {sampleStories.map(s => (
                <div key={s.id} className="story-card">
                  <h4>{s.title}</h4>
                  <p>{s.blurb}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Animations */}
          <section className="module">
            <div className="module-head">
              <h2>Animations & Illustrations</h2>
            </div>

            <div className="anim-grid">
              {sampleAnimations.map(a => (
                <div key={a.id} className="anim-card">
                  <div className="anim-thumb" style={{ backgroundImage: `url(${a.src})` }} />
                  <div className="anim-title">{a.title}</div>
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>
    </>
  );
}
