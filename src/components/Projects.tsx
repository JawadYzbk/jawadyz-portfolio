'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const Projects = () => {
  const { t, isRTL } = useLanguage();

  const projects = [
    {
      title: t.projects.items.rustlink.title,
      description: t.projects.items.rustlink.description,
      tags: ['Electron', 'React', 'Node.js', 'Socket.io'],
      github: 'https://github.com/JawadYzbk/rustLink',
      demo: 'https://github.com/JawadYzbk/rustLink/releases',
      image: 'https://raw.githubusercontent.com/JawadYzbk/rustLink/refs/heads/master/docs/map.png',
    },
    {
      title: t.projects.items.abbas.title,
      description: t.projects.items.abbas.description,
      tags: ['Laravel', 'Inertia.js', 'React', 'Tailwind CSS'],
      github: 'https://github.com/JawadYzbk',
      demo: 'http://abbascenter.org/',
      image: 'https://i.ibb.co/HLqqjpgD/image.png',
    },
    {
      title: t.projects.items.sandok.title,
      description: t.projects.items.sandok.description,
      tags: ['Local Network', 'Management System', 'Financial Tools'],
      github: '#',
      demo: '#',
      image: 'https://i.ibb.co/fV0zsspK/image.png',
    },
    {
      title: t.projects.items.optical.title,
      description: t.projects.items.optical.description,
      tags: ['Laravel', 'React', 'Redux', 'MySQL'],
      github: 'https://github.com/JawadYzbk/opticalClinic-react',
      demo: '#',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000&auto=format&fit=crop',
    },
    {
      title: t.projects.items.portfolio.title,
      description: t.projects.items.portfolio.description,
      tags: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
      github: 'https://github.com/JawadYzbk/jawadyz-portfolio',
      demo: 'https://jawadyz-portfolio.vercel.app/',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
    },
  ];

  return (
    <section id="projects" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 ${isRTL ? 'text-right' : ''}`}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-3xl font-bold text-white mb-4 ${isRTL ? 'font-arabic' : ''}`}
          >
            {t.projects.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-gray-400 max-w-2xl mx-auto ${isRTL ? 'font-arabic font-light' : ''}`}
          >
            {t.projects.subtitle}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all ${isRTL ? 'text-right' : ''}`}
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {project.github !== '#' ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
                      title={isRTL ? 'عرض الكود' : 'View Code'}
                    >
                      <Github size={20} />
                    </a>
                  ) : (
                    <div 
                      className="p-3 bg-white/20 text-gray-400 rounded-full cursor-not-allowed"
                      title={isRTL ? 'الكود غير متوفر' : 'Code not available'}
                    >
                      <Github size={20} />
                    </div>
                  )}
                  
                  {project.demo !== '#' ? (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
                      title={isRTL ? 'عرض المشروع' : 'Live Demo'}
                    >
                      <ExternalLink size={20} />
                    </a>
                  ) : (
                    <div 
                      className="p-3 bg-white/20 text-gray-400 rounded-full cursor-not-allowed"
                      title={isRTL ? 'المعرض غير متوفر' : 'Demo not available'}
                    >
                      <ExternalLink size={20} />
                    </div>
                  )}
                </div>
              </div>
              <div className="p-6">
                <h3 className={`text-xl font-bold text-white mb-2 ${isRTL ? 'font-arabic' : ''}`}>{project.title}</h3>
                <p className={`text-gray-400 mb-4 text-sm ${isRTL ? 'font-arabic font-light leading-relaxed' : ''}`}>{project.description}</p>
                <div className={`flex flex-wrap gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-3 py-1 bg-white/5 text-gray-300 text-xs rounded-full border border-white/10 ${isRTL ? 'font-arabic' : ''}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Mobile Actions */}
                <div className={`mt-6 pt-6 border-t border-white/5 flex gap-4 md:hidden ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {project.github !== '#' && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm font-medium hover:bg-white/10 transition-colors ${isRTL ? 'font-arabic' : ''}`}
                    >
                      <Github size={18} />
                      {isRTL ? 'الكود' : 'GitHub'}
                    </a>
                  )}
                  {project.demo !== '#' && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-500 text-sm font-medium hover:bg-blue-500/20 transition-colors ${isRTL ? 'font-arabic' : ''}`}
                    >
                      <ExternalLink size={18} />
                      {isRTL ? 'المعاينة' : 'Demo'}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
