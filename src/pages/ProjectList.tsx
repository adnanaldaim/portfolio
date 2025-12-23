import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Calendar, ExternalLink, Github, Code2, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import Header from '../components/Header';
import { allProjects } from '../data/projects';
import { getTagColor } from '../data/tagColors';

const ProjectList: React.FC = () => {
  const navigate = useNavigate();
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const openCaseStudy = (project: any) => {
    navigate(`/case-study/${project.id}`);
  };

  const openDemo = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  
  // Scroll to top and reset animations when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    setVisibleProjects([]); // Reset visible projects for animation
  }, []);

  // Animate in on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    // Add a small delay to allow scroll and reset before observing
    const observerTimeout = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = projectRefs.current.findIndex(ref => ref === entry.target);
              if (index !== -1 && !visibleProjects.includes(index)) {
                setVisibleProjects(prev => [...prev, index]);
              }
            }
          });
        },
        { 
          threshold: 0.3,
          rootMargin: '-20px 0px -20px 0px'
        }
      );

      projectRefs.current.forEach((ref) => {
        if (ref) observer.observe(ref);
      });

      // Cleanup
      return () => {
        projectRefs.current.forEach((ref) => {
          if (ref) observer.unobserve(ref);
        });
      };
    }, 200); // Short delay to allow scroll reset
    return () => clearTimeout(observerTimeout);
  }, [visibleProjects]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50/80 to-zinc-50/60 dark:from-background-dark dark:to-surface-dark relative overflow-hidden">
        {/* Use the same Header component */}
        <Header />

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-32 right-32 w-64 h-64 bg-gradient-to-br from-slate-200/20 to-gray-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-32 left-32 w-64 h-64 bg-gradient-to-br from-zinc-200/20 to-slate-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 lg:px-16 py-20 pt-32 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Back Button - Outside Header */}
            <div className={`mb-8 transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <button
                onClick={() => navigate('/')}
                className="group inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-all duration-300 font-medium"
              >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to Portfolio</span>
              </button>
            </div>

            {/* Header */}
            <div className="mb-12">
              <div className="text-center">
                <div className={`flex items-center justify-center gap-3 mb-4 transform transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`} style={{ transitionDelay: '0.2s' }}>
                  <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-full">
                    <Code2 size={24} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
                    Complete Project Collection
                  </h2>
                </div>
                <p className={`text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto transform transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`} style={{ transitionDelay: '0.4s' }}>
                  A comprehensive collection of projects showcasing various technologies and development approaches.
                </p>
              </div>
            </div>

            {/* Projects Grid */}
            <div className="space-y-8">
              {allProjects.map((project, index) => (
                <div
                  key={index}
                  ref={(el) => (projectRefs.current[index] = el)}
                  className={`group bg-white/80 dark:bg-surface-dark backdrop-blur-sm rounded-2xl overflow-hidden border border-neutral-200/50 dark:border-neutral-700/50 layered-shadow hover:shadow-strong transition-all duration-700 hover:-translate-y-2 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } flex flex-col lg:flex transform ${
                    visibleProjects.includes(index)
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-12 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Project Image */}
                  <div className="lg:w-1/2 relative overflow-hidden">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 scale-105 group-hover:scale-100"
                      />
                    </div>
                    
                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-neutral-800 text-sm font-medium rounded-lg transform transition-all duration-300 group-hover:scale-105">
                          {project.category}
                        </span>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-neutral-800 text-sm font-medium rounded-lg transform transition-all duration-300 group-hover:scale-105">
                          <Calendar size={14} />
                          {project.year}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-center">
                    <div className="space-y-4">
                      {/* Title */}
                      <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-all duration-300 transform group-hover:translate-x-2">
                        {project.title}
                      </h2>
                      
                      {/* Description */}
                      <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed transform transition-all duration-300 group-hover:translate-x-2" style={{ transitionDelay: '0.1s' }}>
                        {project.description}
                      </p>

                      {/* Technology Tags */}
                      <div className="flex flex-wrap gap-2 transform transition-all duration-300 group-hover:translate-x-2" style={{ transitionDelay: '0.2s' }}>
                        {project.tags.map((tech, techIndex) => (
                            <span 
                            key={techIndex} 
                            className={`tech-tag px-3 py-1.5 text-sm font-medium rounded-lg border ${getTagColor(tech)}`}
                            >
                            {tech}
                            </span>
                        ))}
                      </div>

                      {/* Project Links */}
                      <div className="flex flex-wrap gap-3 pt-4 transform transition-all duration-300 group-hover:translate-x-2" style={{ transitionDelay: '0.3s' }}>
                        {project.link ? (
                          <button
                            onClick={() => openDemo(project.link!)}
                            className="group/btn flex-1 inline-flex items-center gap-2 text-secondary-600 dark:text-secondary-400 hover:text-secondary-700 dark:hover:text-secondary-300 font-medium transition-all duration-300 transform hover:translate-x-2"
                          >
                            <ExternalLink size={16} className="group-hover/btn:animate-pulse" />
                            Live demo
                          </button>
                        ) : project.caseStudy ? (
                          <button
                            onClick={() => openCaseStudy(project)}
                            className="group/btn flex-1 inline-flex items-center gap-2 text-secondary-600 dark:text-secondary-400 hover:text-secondary-700 dark:hover:text-secondary-300 font-medium transition-all duration-300 transform hover:translate-x-2"
                          >
                            <FileText size={16} className="group-hover/btn:animate-pulse" />
                            Read case study
                          </button>
                        ) : (
                          <div className="flex-1"></div>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-soft hover:shadow-medium"
                          >
                            <Github size={16} />
                            Source Code
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Back to Main Projects */}
            <div className={`text-center mt-16 transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`} style={{ transitionDelay: '0.8s' }}>
              <button
                onClick={() => navigate('/#projects')}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-secondary-600 hover:bg-secondary-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-medium hover:shadow-strong relative overflow-hidden"
              >
                <span className="relative z-10">View Featured Projects</span>
                <div className="absolute inset-0 bg-gradient-to-r from-secondary-700 to-tertiary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ProjectList;