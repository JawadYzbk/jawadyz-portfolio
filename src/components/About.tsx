'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Palette, Terminal, Cpu } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const About = () => {
  const { t, isRTL } = useLanguage();

  const skills = [
    { icon: <Terminal size={24} />, title: t.about.skills.frontend, desc: t.about.skills.frontendDesc },
    { icon: <Code2 size={24} />, title: t.about.skills.backend, desc: t.about.skills.backendDesc },
    { icon: <Palette size={24} />, title: t.about.skills.design, desc: t.about.skills.designDesc },
    { icon: <Cpu size={24} />, title: t.about.skills.tools, desc: t.about.skills.toolsDesc },
  ];

  return (
    <section id="about" className="py-24 bg-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid md:grid-cols-2 gap-12 items-center ${isRTL ? 'text-right' : ''}`}>
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6 text-white">{t.about.title}</h2>
            <p className="text-gray-400 mb-6 text-lg leading-relaxed">
              {t.about.p1}
            </p>
            <p className="text-gray-400 mb-8 text-lg leading-relaxed">
              {t.about.p2}
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <div key={index} className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <div className="text-blue-500 mb-2">{skill.icon}</div>
                  <h3 className="text-white font-semibold mb-1">{skill.title}</h3>
                  <p className="text-gray-500 text-sm">{skill.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-white/10 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-20 grayscale" />
              <div className="relative z-10 p-8 text-center">
                <div className="text-6xl font-bold text-white mb-2">2+</div>
                <div className="text-gray-400">{t.about.experience}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
