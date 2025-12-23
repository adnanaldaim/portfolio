import React from 'react';
import Contact from '../components/Contact';
import PageTransition from '../components/PageTransition';

const ContactPage: React.FC = () => {
  return (
    <PageTransition>
      <Contact />
    </PageTransition>
  );
};

export default ContactPage;