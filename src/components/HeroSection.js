import React, { useState, useEffect } from "react";
import "./HeroSection.css";

const images = [
  "/images/image1.webp",
  "/images/image2.webp",
  "/images/image3.webp",
  "/images/image5.webp",
  "/images/image6.webp",
 
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // start fade-out
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade(true); // fade-in new image
      }, 500); // half of the transition duration
    }, 3000); // change image every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="hero">
        {/* Text on Left */}
        <div className="hero-text">
          <h1>Learning, Creating and Growing Together 🌈</h1>
          <p>
            <b>
              A joyful hub where children explore, play, and discover — beyond
              the classroom.
            </b>
          </p>
          <div className="hero-buttons">
            <button className="cta-btn">Start the Adventure</button>
          </div>
        </div>

        {/* Image on Right */}
        <div className="hero-image">
          <img
            src={images[currentIndex]}
            alt="Little Learners"
            className={fade ? "fade-in" : "fade-out"}
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
  <h2>Where Every Curiosity Finds Its Wings 🦋</h2>
  <p>
    At <b>Little Learners</b>, we believe every child is a bundle of wonder — eager to explore,
    question, and create. Our playful world brings learning to life through stories, games,
    colors, and imagination. 🌈
  </p>
  <p>
    From rhymes that spark laughter to activities that build curiosity, we make every moment
    a joyful discovery. Here, learning isn’t a task — it’s an adventure that grows along
    with your child. ✨
  </p>
</section>

    </>
  );
};

export default HeroSection;
