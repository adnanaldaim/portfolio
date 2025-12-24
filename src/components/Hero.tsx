import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const textRef = useRef<HTMLHeadingElement>(null);
  const [displayText, setDisplayText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const words = ['Engineer', 'Developer'];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
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

  // Typewriter effect
  useEffect(() => {
    const currentWord = words[currentWordIndex];
    
    const handleTyping = () => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.substring(0, displayText.length + 1));
          setTypingSpeed(100 + Math.random() * 100); // Vary typing speed for natural feel
        } else {
          // Finished typing, wait then start deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(currentWord.substring(0, displayText.length - 1));
          setTypingSpeed(50 + Math.random() * 50); // Faster deleting
        } else {
          // Finished deleting, move to next word
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          setTypingSpeed(500); // Pause before starting next word
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentWordIndex, typingSpeed, words]);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50/80 to-purple-50/60 dark:from-background-dark dark:to-surface-dark">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-200/30 to-accent-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-secondary-200/30 to-tertiary-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-accent-100/20 to-primary-100/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-primary-50/20 to-accent-50/10 dark:from-background-dark dark:to-surface-dark z-0"></div>
      
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-primary-600 dark:text-primary-400 font-medium mb-4 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-100">
            Hello, I'm Adnan
          </h2>
          
          <h1 
            ref={textRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-neutral-800 dark:text-neutral-100 mb-8 leading-tight animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-300"
          >
            <span className="block mb-2">Senior Full‑Stack </span>
            <span className="block min-h-[1.2em] items-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400">
                {displayText}
                <span className="animate-pulse text-primary-600 dark:text-primary-400">|</span>
              </span>
            </span>
            <span className="block text-2xl md:text-3xl lg:text-4xl mt-6 text-neutral-600 dark:text-neutral-300 font-normal">
                6+ years building scalable .NET/ABP.IO applications, AI integrations, and enterprise SaaS platforms
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 mb-8 max-w-2xl animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-500">
            I build intelligent, scalable applications that merge modern .NET development with AI capabilities. Specializing in Azure OpenAI integrations and ABP.IO frameworks to create future-proof SaaS products that outperform competitors.
          </p>
          
          <div className="flex justify-center animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-700">
            <a 
              href="#contact" 
              className="group px-8 py-3 text-center bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-medium hover:shadow-strong relative overflow-hidden"
            >
              <span className="relative z-10">Get In Touch</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-secondary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden lg:block">
        <button 
          onClick={scrollToAbout}
          className="group p-3 rounded-full bg-white/80 dark:bg-surface-dark backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-1 shadow-soft hover:shadow-medium border border-neutral-200/50 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-600"
          aria-label="Scroll down"
        >
          <ArrowDown size={20} className="text-primary-600 dark:text-primary-400 group-hover:animate-pulse" />
        </button>
      </div>
    </section>
  );
};

export default Hero;