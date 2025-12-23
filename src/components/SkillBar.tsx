import React, { useEffect, useRef, useState } from 'react';

interface SkillBarProps {
  name: string;
  percentage: number;
  color: string;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, percentage, color }) => {
  const [isVisible, setIsVisible] = useState(false);
  const skillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (skillRef.current) {
      observer.observe(skillRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={skillRef} className="space-y-2">
      <div className="flex justify-between">
        <h4 className="text-neutral-800 dark:text-neutral-200 font-medium">{name}</h4>
        <span className="text-neutral-600 dark:text-neutral-400">{percentage}%</span>
      </div>
      <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: isVisible ? `${percentage}%` : '0%' }}
        ></div>
      </div>
    </div>
  );
};

export default SkillBar;