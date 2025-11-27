import React from "react";
import "./Compete.css";
import bear from "../assets/bear.png"; // your downloaded bear cub

export default function Compete() {
  return (
    <>

      <div className="compete-wrap">

        {/* 🐻 BEAR CUB ANIMATION */}
        <img src={bear} alt="bear" className="bear-cub" />

        {/* HERO */}
        <section className="compete-hero">
          <h1 className="compete-title">Competitions</h1>
          <p className="compete-sub">
            Join fun challenges → Earn points → Become the daily champion!
          </p>
        </section>

        {/* CATEGORY ROW */}
        <div className="compete-grid">

          {/* A */}
          <div className="compete-card">
            <h3>A – Speed Spell</h3>
            <p>Spell words fast! Earn stars for accuracy & speed.</p>
            <button className="join-btn">Join Challenge</button>
          </div>

          {/* B */}
          <div className="compete-card">
            <h3>B – Brain Boost</h3>
            <p>Logic, riddles & quick thinking tasks for all ages.</p>
            <button className="join-btn">Start Now</button>
          </div>

          {/* C */}
          <div className="compete-card">
            <h3>C – Creative Clash</h3>
            <p>Drawing, storytelling & creativity-based competitions.</p>
            <button className="join-btn">Participate</button>
          </div>

        </div>
      </div>
    </>
  );
}
