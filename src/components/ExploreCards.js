import React from "react";
import "./ExploreCards.css";

const cards = [
  { icon: "📚", title: "Learn Zone", text: "Discover lessons through playful stories and animated concepts!" },
  { icon: "🧩", title: "Brain Games", text: "Boost logic and curiosity with puzzles, coding, and riddles!" },
  { icon: "📖", title: "Reading Club", text: "Step into worlds of fantasy, facts, and interactive stories!" },
  { icon: "👨‍👩‍👧", title: "Parent Zone", text: "Track progress, get insights, and guide your little explorer!" },
];

const ExploreCards = () => {
  return (
<section className="cards-section" id="explorecards">
      <h2>✨ Explore What’s Inside ✨</h2>
      <p className="cards-subtitle">
        Dive into a world where learning feels like adventure, and every click opens a new door to discovery!
      </p>

      <div className="cards-container">
        {cards.map((card, index) => (
          <div className="card fade-in-card" key={index} style={{ animationDelay: `${index * 0.2}s` }}>
            <div className="card-icon">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
            <button className="explore-btn">Start Exploring →</button>
          </div>
        ))}
      </div>

      <div className="floating-stars"></div>
    </section>
  );
};

export default ExploreCards;
