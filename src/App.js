import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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

function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  const location = useLocation();
  const showNavbar = location.pathname !== '/dashboard';

  return (
    <div className="app-container">
      <ScrollToHash />
      {showNavbar && <Navbar />}

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
  );
}

export default App;
