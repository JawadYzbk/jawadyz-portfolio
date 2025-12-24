'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'RustLink',
      description: 'An unofficial RUST+ alternative for PC. Interactive map experience using websocket protocol to communicate with Rust game servers.',
      tags: ['Electron', 'React', 'Node.js', 'Socket.io'],
      github: 'https://github.com/JawadYzbk/rustLink',
      demo: 'https://github.com/JawadYzbk/rustLink/releases',
      image: 'https://raw.githubusercontent.com/JawadYzbk/rustLink/refs/heads/master/docs/map.png',
    },
    {
      title: 'Abbas Center',
      description: 'A professional web platform developed for the Abbas Center organization, providing community resources and information.',
      tags: ['Laravel', 'Inertia.js', 'React', 'Tailwind CSS'],
      github: 'https://github.com/JawadYzbk',
      demo: 'http://abbascenter.org/',
      image: 'https://i.ibb.co/HLqqjpgD/image.png',
    },
    {
      title: 'Sandok Taadod',
      description: 'A specialized local networked platform for cooperative fund management and community financial tracking.',
      tags: ['Local Network', 'Management System', 'Financial Tools'],
      github: '#',
      demo: '#',
      image: 'https://i.ibb.co/fV0zsspK/image.png',
    },
    {
      title: 'Optical Clinic',
      description: 'A comprehensive management system for optical clinics, featuring patient records, appointments, and prescriptions.',
      tags: ['Laravel', 'React', 'Redux', 'MySQL'],
      github: 'https://github.com/JawadYzbk/opticalClinic-react',
      demo: '#',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000&auto=format&fit=crop',
    },
  ];

  return (
    <section id="projects" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-4"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Here are some of my recent projects that showcase my skills and experience.
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
              className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href={project.demo}
                    className="p-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4 text-sm">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/5 text-gray-300 text-xs rounded-full border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
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
