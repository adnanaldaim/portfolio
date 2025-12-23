import React from 'react';
import Hero from '../components/Hero';
import PageTransition from '../components/PageTransition';

const Home: React.FC = () => {
  return (
    <PageTransition>
      <Hero />
    </PageTransition>
  );
};

export default Home;