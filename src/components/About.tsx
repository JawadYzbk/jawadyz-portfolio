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
        <div className={`grid md:grid-cols-2 gap-12 items-center ${isRTL ? 'md:grid-cols-[1fr_1fr]' : ''}`}>
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={isRTL ? 'order-1 text-right' : 'order-1'}
          >
            <h2 className={`text-3xl font-bold mb-6 text-white ${isRTL ? 'font-arabic' : ''}`}>{t.about.title}</h2>
            <p className={`text-gray-400 mb-6 text-lg leading-relaxed ${isRTL ? 'font-arabic font-light' : ''}`}>
              {t.about.p1}
            </p>
            <p className={`text-gray-400 mb-8 text-lg leading-relaxed ${isRTL ? 'font-arabic font-light' : ''}`}>
              {t.about.p2}
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <div key={index} className={`p-4 bg-white/5 border border-white/10 rounded-xl hover:border-blue-500/30 transition-colors ${isRTL ? 'text-right' : ''}`}>
                  <div className={`text-blue-500 mb-2 flex ${isRTL ? 'justify-end' : 'justify-start'}`}>{skill.icon}</div>
                  <h3 className={`text-white font-semibold mb-1 ${isRTL ? 'font-arabic' : ''}`}>{skill.title}</h3>
                  <p className={`text-gray-500 text-sm ${isRTL ? 'font-arabic text-xs' : ''}`}>{skill.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`relative ${isRTL ? 'order-2' : 'order-2'}`}
          >
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-white/10 flex items-center justify-center overflow-hidden group">
              <div className="absolute inset-0 bg-black z-0" />
              <img 
                src="/profile.jpg" 
                alt="Jawad Yazbek"
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 z-10"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-20" />
              <div className="relative z-30 p-8 text-center mt-auto w-full bg-black/40 backdrop-blur-sm border-t border-white/10">
                <div className="text-6xl font-bold text-white mb-2">2+</div>
                <div className={`text-gray-300 font-medium ${isRTL ? 'font-arabic' : ''}`}>{t.about.experience}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
