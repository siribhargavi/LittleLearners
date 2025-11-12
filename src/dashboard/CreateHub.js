import React, { useState } from "react";
import "./CreateHub.css";

export default function CreateHub() {
  const [type, setType] = useState("Drawing");
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const handleUpload = (e) => setFile(e.target.files[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`🎉 Your ${type} has been submitted for review!`);
    setText("");
    setFile(null);
  };

  return (
    <div className="create-container">
      <div className="create-header">
        <h2>🎨 Create Hub</h2>
        <p>Express your imagination through art, stories, and crafts!</p>
      </div>

      <div className="create-selector">
        {["Drawing", "Story", "Craft", "Poem"].map((t) => (
          <button
            key={t}
            className={type === t ? "active" : ""}
            onClick={() => setType(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <form className="create-form" onSubmit={handleSubmit}>
        {type !== "Drawing" && type !== "Craft" && (
          <textarea
            placeholder={`Write your ${type.toLowerCase()} here...`}
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        )}

        {(type === "Drawing" || type === "Craft") && (
          <div className="upload-zone">
            <label htmlFor="file-upload">
              {file ? file.name : "Click to upload your creation 🎨"}
            </label>
            <input id="file-upload" type="file" onChange={handleUpload} />
          </div>
        )}

        <button type="submit" className="submit-btn">
          🚀 Publish
        </button>
      </form>

      <div className="community-section">
        <h3>🌟 Community Creations</h3>
        <div className="community-grid">
          <div className="community-card">
            <img src="/images/kid_art1.jpg" alt="art" />
            <p>“My Rainbow Garden” – Aarav (6 yrs)</p>
          </div>
          <div className="community-card">
            <img src="/images/kid_art2.jpg" alt="art" />
            <p>“Happy Earth Day” – Mira (7 yrs)</p>
          </div>
          <div className="community-card">
            <img src="/images/kid_art3.jpg" alt="art" />
            <p>“Robots of Tomorrow” – Vihaan (8 yrs)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
