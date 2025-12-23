import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import WorkExperience from './components/WorkExperience';
// import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import ProjectList from './pages/ProjectList';
import PoemList from './pages/PoemList';
import PoemDetail from './pages/PoemDetail';
import CaseStudy from './pages/CaseStudy';
import './index.css';

function App() {
  const location = useLocation();

  useEffect(() => {
    document.title = 'Adnan Ali';

    // Always apply saved theme on mount
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // No saved preference, use system
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', isDark);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    if (location.state && (location.state as any).scrollTo) {
      const section = (location.state as any).scrollTo;
      const el = document.getElementById(section);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100); // slight delay to ensure DOM is ready
      }
    }
  }, [location]);

  return (
    <div className="relative">
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-background-light dark:bg-background-dark text-neutral-900 dark:text-neutral-100 relative z-10">
              <Header />
              <main>
                <Hero />
                <About />
                <WorkExperience />
                {/* <Skills /> */}
                <Projects />
                <Contact />
              </main>
              <Footer />
              <BackToTop />
            </div>
          }
        />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/poems" element={<PoemList />} />
        <Route path="/poems/:id" element={<PoemDetail />} />
        <Route path="/case-study/:projectId" element={<CaseStudy />} />
      </Routes>
    </div>
  );
}

export default App;