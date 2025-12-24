'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Github, Linkedin, Languages } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const Navbar = () => {
  const { language, setLanguage, t, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.about, href: '#about' },
    { name: t.nav.projects, href: '#projects' },
    { name: t.nav.contact, href: '#contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <div className="w-10 h-10 rounded-full border border-blue-500/30 overflow-hidden bg-blue-500/10">
              <img 
                src="/profile.jpg" 
                alt="Jawad Yazbek" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className={`text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent ${isRTL ? 'font-arabic' : ''}`}>
              Jawad.dev
            </span>
          </motion.div>

          {/* Desktop Nav */}
          <div className={`hidden md:flex items-center gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-gray-300 hover:text-white transition-colors relative group ${isRTL ? 'font-arabic text-sm' : ''}`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full ${isRTL ? 'right-0' : 'left-0'}`} />
                </a>
              ))}
            </div>
            
            <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                className={`flex items-center gap-2 text-gray-400 hover:text-white transition-all px-4 py-1.5 border border-white/10 rounded-full bg-white/5 hover:bg-white/10 ${isRTL ? 'font-arabic' : ''}`}
              >
                <Languages size={18} className="text-blue-500" />
                <motion.span 
                  key={language}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm font-semibold min-w-[24px]"
                >
                  {language === 'en' ? 'AR' : 'EN'}
                </motion.span>
              </motion.button>
              
              <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <a
                  href="https://github.com/JawadYzbk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/jawad-yazbek2k/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button & Language Toggle */}
          <div className={`md:hidden flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors px-3 py-1.5 border border-white/10 rounded-full bg-white/5"
            >
              <Languages size={16} className="text-blue-500" />
              <motion.span 
                key={language}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-xs font-bold"
              >
                {language === 'en' ? 'AR' : 'EN'}
              </motion.span>
            </motion.button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white p-1"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-black/95 backdrop-blur-lg border-t border-white/10"
        >
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block py-3 text-lg font-medium text-gray-300 hover:text-white border-b border-white/5 last:border-0 ${isRTL ? 'text-right' : 'text-left'}`}
              >
                {link.name}
              </a>
            ))}
            <div className={`flex items-center gap-6 pt-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <a
                href="https://github.com/JawadYzbk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/jawad-yazbek2k/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
