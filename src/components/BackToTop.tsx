import React, { useState, useEffect } from 'react';
import { ArrowUp, ChevronUp } from 'lucide-react';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      
      setScrollProgress(Math.min(Math.max(scrollPercent, 0), 100));
      
      // Show button when user scrolls down 400px (after hero section)
      if (scrollTop > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Check if modal is open by checking body overflow style
    const checkModalState = () => {
      setIsModalOpen(document.body.style.overflow === 'hidden');
    };

    // Create a MutationObserver to watch for changes to body style
    const observer = new MutationObserver(checkModalState);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['style']
    });

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    checkModalState(); // Initial check
    updateScrollProgress(); // Initial progress calculation

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      observer.disconnect();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Hide button when modal is open
  const shouldShow = isVisible && !isModalOpen;

  // Calculate stroke dash array for circular progress
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div className={`fixed bottom-8 right-8 z-50 transition-all duration-500 ease-out ${
      shouldShow 
        ? 'opacity-100 translate-y-0 pointer-events-auto scale-100' 
        : 'opacity-0 translate-y-8 pointer-events-none scale-75'
    }`}>
      <div className="relative group">
        {/* Outer glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        
        {/* Main button container */}
        <button
          onClick={scrollToTop}
          className="relative w-14 h-14 bg-white/90 dark:bg-surface-dark/90 backdrop-blur-md text-primary-600 dark:text-primary-400 rounded-full border border-neutral-200/50 dark:border-neutral-700/50 layered-shadow hover:shadow-strong transition-all duration-500 transform group overflow-hidden hover:-translate-y-2 hover:scale-110 active:scale-95"
          aria-label={`Back to top (${Math.round(scrollProgress)}% scrolled)`}
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 dark:from-primary-900/20 dark:via-secondary-900/20 dark:to-accent-900/20 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-full"></div>
          
          {/* Progress ring background */}
          <svg 
            className="absolute inset-1 w-12 h-12 transform -rotate-90" 
            viewBox="0 0 48 48"
          >
            {/* Background circle */}
            <circle
              cx="24"
              cy="24"
              r={radius}
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="opacity-20"
            />
            {/* Progress circle */}
            <circle
              cx="24"
              cy="24"
              r={radius}
              stroke="url(#progressGradient)"
              strokeWidth="2.5"
              fill="none"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-300 ease-out drop-shadow-sm"
            />
            {/* Gradient definition */}
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgb(79, 70, 229)" />
                <stop offset="50%" stopColor="rgb(124, 58, 237)" />
                <stop offset="100%" stopColor="rgb(20, 184, 166)" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Inner content container */}
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            {/* Dual arrow design */}
            <div className="relative">
              {/* Primary arrow */}
              <ChevronUp 
                size={20} 
                className="transform transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-0.5 group-active:scale-90" 
              />
              {/* Secondary arrow for depth */}
              <ChevronUp 
                size={16} 
                className="absolute top-1 left-1/2 transform -translate-x-1/2 opacity-30 group-hover:opacity-60 transition-all duration-300 group-hover:-translate-y-1" 
              />
            </div>
          </div>
          
          {/* Ripple effect on click */}
          <div className="absolute inset-0 rounded-full bg-primary-400/30 scale-0 group-active:scale-150 transition-transform duration-300 ease-out"></div>
        </button>

        {/* Progress percentage tooltip */}
        {/* <div className={`absolute bottom-full right-0 mb-3 px-3 py-1.5 bg-neutral-900/90 dark:bg-neutral-100/90 text-white dark:text-neutral-900 text-xs font-medium rounded-lg backdrop-blur-sm transition-all duration-300 ${
          scrollProgress > 10 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}>
          <span>{Math.round(scrollProgress)}%</span>
          
          <div className="absolute top-full right-3 w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-neutral-900/90 dark:border-t-neutral-100/90"></div>
        </div> */}

        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-primary-400/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1000 ${
                i === 0 ? 'top-2 right-2 group-hover:animate-ping' :
                i === 1 ? 'bottom-3 left-3 group-hover:animate-pulse' :
                'top-3 left-2 group-hover:animate-bounce'
              }`}
              style={{ 
                animationDelay: `${i * 200}ms`,
                animationDuration: `${1000 + i * 200}ms`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BackToTop;