import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-surface-light dark:bg-surface-dark z-50 flex items-center justify-center">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-primary-600 dark:border-primary-400 animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-secondary-600 dark:border-secondary-400 animate-spin animate-delay-150"></div>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="h-8 w-8 rounded-full border-t-4 border-b-4 border-accent-600 dark:border-accent-400 animate-spin animate-delay-300"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;