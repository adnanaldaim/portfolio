import React from 'react';
import Skills from '../components/Skills';
import PageTransition from '../components/PageTransition';

const SkillsPage: React.FC = () => {
  return (
    <PageTransition>
      <Skills />
    </PageTransition>
  );
};

export default SkillsPage;