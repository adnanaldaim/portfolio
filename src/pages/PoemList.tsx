import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { poems } from "../data/poems";
import { BookOpen, ArrowLeft } from "lucide-react";
import Header from "../components/Header";

const PoemList: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50/80 to-zinc-50/60 dark:from-background-dark dark:to-surface-dark relative overflow-hidden">
      {/* Use the same Header component */}
      <Header />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute top-32 right-32 w-64 h-64 bg-gradient-to-br from-secondary-200/20 to-secondary-100/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-32 w-64 h-64 bg-gradient-to-br from-secondary-100/20 to-secondary-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-20 pt-32 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Back Button - Outside Header */}
          <div className={`mb-8 transform transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <button
              onClick={() => navigate("/")}
              className="group inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-all duration-300 font-medium"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Portfolio</span>
            </button>
          </div>

          <div className="mb-12 text-center">
            <div className={`flex items-center justify-center gap-3 mb-4 transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`} style={{ transitionDelay: '0.2s' }}>
              <div className="p-3 bg-secondary-50 dark:bg-secondary-900/20 rounded-full">
                <BookOpen size={24} className="text-secondary-600 dark:text-secondary-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
                Poetry Collection
              </h2>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {poems.map((poem, idx) => (
              <div
                key={poem.id}
                onClick={() => navigate(`/poems/${idx}`)}
                className={`group cursor-pointer w-full bg-white/80 dark:bg-surface-dark backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-700/50 rounded-2xl px-8 py-8 transition-all duration-500 layered-shadow hover:shadow-strong hover:-translate-y-2 transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${idx * 100 + 400}ms` }}
              >
                <h2 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-neutral-100 text-center group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-all duration-300 transform group-hover:translate-x-2">
                  {poem.title}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoemList;