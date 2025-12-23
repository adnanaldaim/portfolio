import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { poems } from "../data/poems";
import { ArrowLeft } from "lucide-react";
import Header from "../components/Header";

const PoemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const idx = Number(id);
  const poem = poems[idx];
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  if (!poem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Poem not found</h2>
          <button onClick={() => navigate('/poems')} className="btn btn-primary mt-2">Back to List</button>
        </div>
      </div>
    );
  }

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
        <div className="w-full max-w-3xl mx-auto">
          {/* Back Button - Outside Header */}
          <div className={`mb-8 transform transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <button
              onClick={() => navigate("/poems")}
              className="group inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-all duration-300 font-medium"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Poems</span>
            </button>
          </div>

          <div className="bg-white/80 dark:bg-surface-dark backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-700/50 rounded-2xl px-8 py-12 md:px-16 md:py-16 layered-shadow hover:shadow-strong transition-all duration-500">
            <div className={`mb-8 text-center transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`} style={{ transitionDelay: '0.2s' }}>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
                {poem.title}
              </h2>
            </div>
            
            <div className={`max-w-2xl mx-auto transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`} style={{ transitionDelay: '0.4s' }}>
              <div className="space-y-6">
                {poem.content.map((line, lineIndex) => (
                  <p
                    key={lineIndex}
                    className={
                      line === ""
                        ? "h-7"
                        : "text-lg md:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed font-light text-center"
                    }
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoemDetail;