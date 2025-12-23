import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from './Projects';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <a 
      href={project.link || '#'} 
      className="block group grid md:grid-cols-2 gap-8 items-center hover:bg-white/80 dark:hover:bg-neutral-800/50 rounded-2xl p-8 transition-all duration-300 cursor-pointer border border-neutral-200/50 dark:border-neutral-700/50 layered-shadow hover-shadow-lift backdrop-blur-sm"
    >
      <div className="order-1 md:order-1">
        <div className="aspect-[16/9] rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </div>

      <div className="order-2 md:order-2">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-sm font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
            {project.title}
          </h3>
          
          <p className="text-neutral-600 dark:text-neutral-400">
            {project.description}
          </p>

          <div className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium">
            View Project 
            <ArrowUpRight 
              size={18} 
              className="transform transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" 
            />
          </div>
        </div>
      </div>
    </a>
  );
};

export default ProjectCard;