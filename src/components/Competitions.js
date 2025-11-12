import React from "react";
import "./Competitions.css";

const competitions = [
  { icon: "🎨", title: "Art Fiesta", text: "Paint your imagination in our colorful art fest!" },
  { icon: "🧠", title: "Brain Quest", text: "Quiz battles to test your logic and memory." },
  { icon: "📖", title: "Story Tellers", text: "Spin your stories and share your magic with words." },
  { icon: "💡", title: "Innovation Fair", text: "Build cool ideas and showcase your creativity." },
  { icon: "🎤", title: "Talent Stage", text: "Sing, dance, or act — the spotlight is yours!" },
  { icon: "🌍", title: "Global Gita Challenge", text: "Learn, reflect, and express your wisdom beautifully." },
];

const Competitions = () => {
  return (
    <section className="competitions-section" id="competitions">
      <h2>Let’s Compete & Shine! 🌟</h2>
      <p className="subtitle">
        Exciting challenges for curious minds — from art & storytelling to quiz battles and innovation fairs.
      </p>

      <div className="competitions-container">
        {competitions.map((comp, index) => (
          <div className="competition-card" key={index}>
            <div className="competition-icon">{comp.icon}</div>
            <h3>{comp.title}</h3>
            <p>{comp.text}</p>
            <button className="join-btn">Join Now →</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Competitions;
