import React from 'react';
import Projects from '../components/Projects';
import PageTransition from '../components/PageTransition';

const ProjectsPage: React.FC = () => {
  return (
    <PageTransition>
      <Projects />
    </PageTransition>
  );
};

export default ProjectsPage;