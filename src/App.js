import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import NavbarAfterLogin from './dashboard/NavbarAfterLogin';
import Home from './components/Home';
import CreateHub from './dashboard/CreateHub';
import Dashboard from './dashboard/Dashboard';
import LearnHub from './dashboard/LearnHub';
import AuthPage from './components/Auth/AuthPage';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import ExploreCards from './components/ExploreCards';
import PuzzleWorld from './dashboard/Explore';
import Footer from './components/Footer';
import Competitions from './components/Competitions';
import HeroSection from './components/HeroSection';
import ArtAndCraft from './dashboard/ArtAndCraft';
import Compete from './dashboard/Compete';
import Progress from './dashboard/Progress';
import Profile from './dashboard/Profile';

function ScrollToHash() {
  const { pathname, hash } = useLocation();

  React.useEffect(() => {
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

  // Show NavbarAfterLogin only on protected/dashboard pages
  const protectedPages = [
    '/dashboard',
    '/learn',
    '/create',
    '/explore',
    '/compete',
    '/progress',
    '/art-and-craft',
    '/competitions',
  ];
  const showNavbarAfterLogin = protectedPages.includes(location.pathname);



  // Show Navbar (normal) only on public pages
  const publicPages = ['/', '/signin', '/signup', '/auth'];
  const showNavbar = publicPages.includes(location.pathname);
      const showFooter = publicPages.includes(location.pathname);


  return (
    <div className="app-container">
      <ScrollToHash />

      {showNavbar && <Navbar />}
      {showNavbarAfterLogin && <NavbarAfterLogin />}

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/auth" element={<AuthPage />} />

        {/* Protected / dashboard routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/puzzle-world" element={<PuzzleWorld />} />

        <Route path="/learn" element={<LearnHub />} />
        <Route path="/create" element={<CreateHub />} />
        <Route path="/explore" element={<ExploreCards />} />
        <Route path="/compete" element={<Compete />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/competitions" element={<Competitions />} />
        <Route path="/art-and-craft" element={<ArtAndCraft />} />
      </Routes>

      {showFooter && <Footer />}
    </div>
  );
}

export default App;
