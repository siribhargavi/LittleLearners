import React, { useState } from "react";
import "./LearnHub.css";

export default function LearnHub() {
  const [selectedClass, setSelectedClass] = useState("Nursery");
  const [selectedSubject, setSelectedSubject] = useState("Math");

  const subjects = ["Math", "Science", "English", "GK"];
  const classes = ["Nursery", "LKG", "UKG", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5"];

  const topics = {
    Math: ["Numbers", "Shapes", "Patterns", "Addition", "Subtraction"],
    Science: ["Animals", "Plants", "Seasons", "Space", "Water"],
    English: ["Alphabets", "Rhymes", "Stories", "Grammar", "Comprehension"],
    GK: ["Our Country", "Festivals", "Famous People", "Sports", "Inventions"]
  };

  return (
    <div className="learn-container">
      <div className="learn-header">
        <h2>📚 Learn Hub</h2>
        <p>Explore fun lessons, videos, and worksheets — concept by concept!</p>
      </div>

      <div className="learn-filters">
        <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
          {classes.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
          {subjects.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="topic-grid">
        {topics[selectedSubject].map((topic) => (
          <div key={topic} className="topic-card">
            <h3>{topic}</h3>
            <p>Interactive lessons, videos & practice sheets</p>
            <div className="topic-buttons">
              <button>📄 Worksheet</button>
              <button>🎬 Video</button>
              <button>🧩 Quiz</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
