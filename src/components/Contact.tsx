import React, { useState, useRef, useEffect } from 'react';
import { Send, Github, Linkedin, Users, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Map EmailJS field names to our state
    const fieldMap: { [key: string]: string } = {
      'user_name': 'name',
      'user_email': 'email',
      'subject': 'subject',
      'message': 'message'
    };
    
    const stateField = fieldMap[name] || name;
    setFormData(prev => ({ ...prev, [stateField]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.current) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');
    
    try {
      // Your actual EmailJS configuration
      const serviceId = 'service_io5fvnc';
      const templateId = 'template_w6adcfj';
      const publicKey = 'HB1oMyt3lOhWF0qfG';
      
      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        form.current,
        publicKey
      );

      if (result.status === 200) {
        setSubmitStatus('success');
        setSubmitMessage('Your message has been sent successfully! I\'ll get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle');
          setSubmitMessage('');
        }, 5000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
      setSubmitMessage('There was an error sending your message. Please try again or contact me directly via email at adnan.aldaim.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="py-20 bg-gradient-to-tl from-slate-100 via-indigo-100/70 to-blue-200/50 dark:from-surface-dark dark:to-background-dark relative overflow-hidden"

    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-violet-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-br from-indigo-200/20 to-violet-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        <div className={`text-center mb-16 transform transition-all duration-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Have a project in mind or want to discuss potential collaboration? 
            Feel free to reach out and I'll get back to you as soon as possible.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Send A Message - Takes up 2 columns */}
            <div className={`lg:col-span-2 transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
            style={{ transitionDelay: '0.2s' }}>
              <div className="group bg-white/80 dark:bg-surface-dark backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-neutral-200/50 dark:border-neutral-700/50 layered-shadow hover:shadow-strong transition-all duration-500 h-full">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <Send size={24} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                    Send A Message
                  </h3>
                </div>
                
                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-start gap-3 animate-in">
                    <CheckCircle size={20} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-green-800 dark:text-green-200">{submitMessage}</p>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3 animate-in">
                    <AlertCircle size={20} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-800 dark:text-red-200">{submitMessage}</p>
                  </div>
                )}
                
                <form 
                  ref={form}
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group/input">
                      <label htmlFor="user_name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Your Name
                      </label>
                      <input 
                        type="text" 
                        id="user_name" 
                        name="user_name" 
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group-hover/input:border-primary-300 dark:group-hover/input:border-primary-600"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="group/input">
                      <label htmlFor="user_email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Your Email
                      </label>
                      <input 
                        type="email" 
                        id="user_email" 
                        name="user_email" 
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group-hover/input:border-primary-300 dark:group-hover/input:border-primary-600"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  
                  <div className="group/input">
                    <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Subject
                    </label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject" 
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group-hover/input:border-primary-300 dark:group-hover/input:border-primary-600"
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div className="group/input">
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Your Message
                    </label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-300 resize-none disabled:opacity-50 disabled:cursor-not-allowed group-hover/input:border-primary-300 dark:group-hover/input:border-primary-600"
                      placeholder="Tell me about your project or idea..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className={`group/btn w-full md:w-auto px-8 py-4 rounded-lg font-medium inline-flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden ${
                        isSubmitting 
                          ? 'bg-neutral-400 dark:bg-neutral-600 cursor-not-allowed shadow-soft' 
                          : 'bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-700 shadow-medium hover:shadow-strong'
                      } text-white`}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message 
                            <Send size={18} className="group-hover/btn:animate-pulse" />
                          </>
                        )}
                      </span>
                      {!isSubmitting && (
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-secondary-600 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Connect with Me - Takes up 1 column */}
            <div className={`lg:col-span-1 transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
            style={{ transitionDelay: '0.4s' }}>
              <div className="group bg-white/80 dark:bg-surface-dark backdrop-blur-sm rounded-2xl p-8 border border-neutral-200/50 dark:border-neutral-700/50 layered-shadow hover:shadow-strong transition-all duration-500 h-full">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-secondary-50 dark:bg-secondary-900/20 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <Users size={24} className="text-secondary-600 dark:text-secondary-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                    Connect with Me
                  </h3>
                </div>
                
                <div className="space-y-6">
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed transform transition-all duration-300 group-hover:translate-x-2">
                    Let's connect and explore opportunities together. Follow me on social media 
                    or reach out directly via email.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="transform transition-all duration-300 group-hover:translate-x-2">
                      <h4 className="text-neutral-800 dark:text-neutral-100 font-medium mb-2">Email</h4>
                      <a 
                        href="mailto:adnan.aldaim@gmail.com" 
                        className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors font-medium"
                      >
                        adnan.aldaim@gmail.com
                      </a>
                    </div>
                    
                    <div className="transform transition-all duration-300 group-hover:translate-x-2" style={{ transitionDelay: '0.1s' }}>
                      <h4 className="text-neutral-800 dark:text-neutral-100 font-medium mb-2">Location</h4>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        Lahore, Pakistan
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-neutral-200 dark:border-neutral-700">
                    <h4 className="text-neutral-800 dark:text-neutral-100 font-medium mb-4">Social Links</h4>
                    <div className="flex gap-3">
                      <a 
                        href="https://github.com/adnanaldaim" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 p-4 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-800 hover:text-neutral-300 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-soft hover:shadow-medium group/social text-center"
                        aria-label="GitHub Profile"
                      >
                        <Github size={24} className="mx-auto mb-2 group-hover/social:scale-110 transition-transform" />
                        <span className="text-sm font-medium">GitHub</span>
                      </a>
                      <a 
                        href="https://www.linkedin.com/in/adnanaldaim/" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 p-4 dark:bg-neutral-800 dark:hover:bg-blue-600 bg-neutral-100 text-neutral-700 dark:text-neutral-300 rounded-xl hover:bg-blue-600 hover:text-neutral-300 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg group/social text-center"
                        aria-label="LinkedIn Profile"
                      >
                        <Linkedin size={24} className="mx-auto mb-2 group-hover/social:scale-110 transition-transform" />
                        <span className="text-sm font-medium">LinkedIn</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;