import React from 'react';
import { Github, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-surface-dark text-white py-12 relative">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between Lg:items-start gap-8">
            {/* Brand and Description */}
            <div className="max-w-md">
              <a href="#" className="text-xl font-bold tracking-tighter mb-4 inline-block">
                <span className="text-primary-400">adnan</span>
                <span className="text-white">ali</span>
              </a>
              <p className="text-neutral-400 mb-6">
                Creating exceptional digital experiences through thoughtful design 
                and user-centered solutions. Let's build something amazing together.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-4">
                <a 
                  href="https://github.com/adnanaldaim" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg group"
                  aria-label="GitHub Profile"
                >
                  <Github size={20} className="text-neutral-400 group-hover:text-white" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/adnanaldaim/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-neutral-800 hover:bg-blue-600 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg group"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={20} className="text-neutral-400 group-hover:text-white" />
                </a>
              </div>
            </div>
            
            {/* Contact Information */}
            <div className="text-right">
              <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
              <div className="space-y-2 text-neutral-400">
                <p>
                  <a 
                    href="mailto:adnan.aldaim@gmail.com" 
                    className="hover:text-primary-400 transition-colors"
                  >
                    adnan.aldaim@gmail.com
                  </a>
                </p>
                <p>Lahore, Pakistan</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-neutral-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-500 text-sm mb-4 md:mb-0">
              © {currentYear} Adnan Ali. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;