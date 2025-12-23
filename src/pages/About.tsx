import React from 'react';
import About from '../components/About';
import PageTransition from '../components/PageTransition';

const AboutPage: React.FC = () => {
  return (
    <PageTransition>
      <About />
    </PageTransition>
  );
};

export default AboutPage;