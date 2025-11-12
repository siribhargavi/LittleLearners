import React from "react";
import HeroSection from "./HeroSection";
import ExploreCards from "./ExploreCards";
import Competitions from "./Competitions";

const Home = () => {
  return (
    <div className="home-container">
      <HeroSection />
      <ExploreCards />
      <Competitions/>
    </div>
  );
};

export default Home;
