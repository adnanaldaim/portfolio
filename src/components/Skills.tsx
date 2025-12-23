import React, { useState } from 'react';
import { Code, Database, Globe, Wrench, Star, ExternalLink } from 'lucide-react';

interface Skill {
  name: string;
  level: 'Expert' | 'Advanced' | 'Intermediate';
  icon?: string;
  color: string;
  description?: string;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
  color: string;
}

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  const skillCategories: SkillCategory[] = [
    {
      title: "Frontend Development",
      icon: <Globe size={24} />,
      color: "from-blue-500 to-cyan-500",
      skills: [
        { name: 'React', level: 'Expert', color: 'bg-blue-500', description: 'Building complex SPAs with hooks, context, and performance optimization' },
        { name: 'TypeScript', level: 'Expert', color: 'bg-blue-600', description: 'Type-safe development with advanced patterns and generics' },
        { name: 'Next.js', level: 'Advanced', color: 'bg-gray-800', description: 'SSR, SSG, API routes, and full-stack applications' },
        { name: 'Tailwind CSS', level: 'Expert', color: 'bg-teal-500', description: 'Utility-first styling with custom design systems' },
        { name: 'Vue.js', level: 'Advanced', color: 'bg-green-500', description: 'Component-based architecture with Composition API' },
        { name: 'JavaScript', level: 'Expert', color: 'bg-yellow-500', description: 'ES6+, async programming, and modern web APIs' }
      ]
    },
    {
      title: "Backend & Database",
      icon: <Database size={24} />,
      color: "from-green-500 to-emerald-500",
      skills: [
        { name: 'Node.js', level: 'Advanced', color: 'bg-green-600', description: 'RESTful APIs, microservices, and server-side applications' },
        { name: 'Express.js', level: 'Advanced', color: 'bg-gray-700', description: 'Middleware, routing, and API development' },
        { name: 'PostgreSQL', level: 'Advanced', color: 'bg-blue-700', description: 'Complex queries, indexing, and database optimization' },
        { name: 'MongoDB', level: 'Intermediate', color: 'bg-green-700', description: 'Document-based storage and aggregation pipelines' },
        { name: 'Python', level: 'Advanced', color: 'bg-yellow-600', description: 'Data processing, automation, and backend services' },
        { name: 'GraphQL', level: 'Intermediate', color: 'bg-pink-500', description: 'Schema design and efficient data fetching' }
      ]
    },
    {
      title: "Tools & DevOps",
      icon: <Wrench size={24} />,
      color: "from-purple-500 to-pink-500",
      skills: [
        { name: 'Git/GitHub', level: 'Expert', color: 'bg-gray-800', description: 'Version control, branching strategies, and collaboration' },
        { name: 'Docker', level: 'Advanced', color: 'bg-blue-500', description: 'Containerization and multi-stage builds' },
        { name: 'AWS', level: 'Advanced', color: 'bg-orange-500', description: 'EC2, S3, Lambda, and cloud architecture' },
        { name: 'Vercel', level: 'Expert', color: 'bg-black', description: 'Deployment, serverless functions, and edge computing' },
        { name: 'Firebase', level: 'Advanced', color: 'bg-yellow-500', description: 'Authentication, Firestore, and real-time features' },
        { name: 'VS Code', level: 'Expert', color: 'bg-blue-600', description: 'Extensions, debugging, and productivity optimization' }
      ]
    },
    {
      title: "Design & UX",
      icon: <Code size={24} />,
      color: "from-rose-500 to-orange-500",
      skills: [
        { name: 'Figma', level: 'Advanced', color: 'bg-purple-500', description: 'UI/UX design, prototyping, and design systems' },
        { name: 'Responsive Design', level: 'Expert', color: 'bg-teal-600', description: 'Mobile-first approach and cross-device compatibility' },
        { name: 'Accessibility', level: 'Advanced', color: 'bg-indigo-500', description: 'WCAG compliance and inclusive design practices' },
        { name: 'Performance', level: 'Advanced', color: 'bg-red-500', description: 'Core Web Vitals optimization and loading strategies' },
        { name: 'Testing', level: 'Intermediate', color: 'bg-green-600', description: 'Unit testing, integration testing, and E2E testing' },
        { name: 'Animation', level: 'Intermediate', color: 'bg-pink-500', description: 'CSS animations, Framer Motion, and micro-interactions' }
      ]
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Expert': return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
      case 'Advanced': return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20';
      case 'Intermediate': return 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getLevelStars = (level: string) => {
    const count = level === 'Expert' ? 5 : level === 'Advanced' ? 4 : 3;
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={12}
        className={i < count ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}
      />
    ));
  };

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-primary-50/30 to-surface-light dark:from-background-dark dark:to-surface-dark">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            Technical Expertise
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            A comprehensive overview of my technical skills and proficiency levels across different domains of software development.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {skillCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:-translate-y-1 ${
                  activeCategory === index
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : 'bg-white dark:bg-surface-dark text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 layered-shadow'
                }`}
              >
                {category.icon}
                <span className="hidden sm:inline">{category.title}</span>
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories[activeCategory].skills.map((skill, index) => (
              <div
                key={skill.name}
                className="bg-white dark:bg-surface-dark rounded-xl p-6 layered-shadow border border-neutral-200/50 dark:border-neutral-700/50 hover:border-neutral-300 dark:hover:border-neutral-600 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${skill.color}`}></div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                      {skill.name}
                    </h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(skill.level)}`}>
                    {skill.level}
                  </span>
                </div>

                <div className="flex items-center gap-1 mb-3">
                  {getLevelStars(skill.level)}
                </div>

                {skill.description && (
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {skill.description}
                  </p>
                )}

                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="h-1 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${skillCategories[activeCategory].color} rounded-full transition-all duration-1000 ease-out`}
                      style={{ 
                        width: skill.level === 'Expert' ? '95%' : skill.level === 'Advanced' ? '80%' : '65%' 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                5+ Years Experience
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Professional software development across various industries and project scales.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                Continuous Learning
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Always exploring new technologies and staying current with industry best practices.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ExternalLink size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                Full-Stack Approach
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                End-to-end development capabilities from UI/UX design to deployment and maintenance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;