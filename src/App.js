import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CreateHub from './dashboard/CreateHub';
import Dashboard from './dashboard/Dashboard';
import LearnHub from './dashboard/LearnHub';
import AuthPage from './components/Auth/AuthPage';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import ExploreCards from './components/ExploreCards';
import Footer from './components/Footer';
import Competitions from './components/Competitions';
import HeroSection from './components/HeroSection';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToHash() {
  const { pathname, hash } = useLocation();
  
  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, hash]);

  return null;
}


function App() {
  return (
    <Router>
      <div className="app-container">
          <ScrollToHash />

        <Navbar />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected / dashboard routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/learn" element={<LearnHub />} />
          <Route path="/create" element={<CreateHub />} />
          <Route path="/explore" element={<ExploreCards />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/competitions" element={<Competitions />} />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
