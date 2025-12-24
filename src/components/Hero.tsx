'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-blue-500 font-medium tracking-wider mb-4 uppercase">
            Welcome to my portfolio
          </h2>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Hi, I'm <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Jawad Yazbek</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            A passionate developer building modern web experiences with focus on performance, 
            scalability, and user experience.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all flex items-center gap-2"
          >
            View My Work
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
          </a>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/JawadYzbk"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all text-white"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/jawad-yazbek2k/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all text-white"
            >
              <Linkedin size={24} />
            </a>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-1 h-12 rounded-full bg-gradient-to-b from-blue-500 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
