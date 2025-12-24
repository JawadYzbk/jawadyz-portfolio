'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Send } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6 text-white">Get In Touch</h2>
            <p className="text-gray-400 mb-8 text-lg">
              I'm always open to new opportunities and collaborations. 
              Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl group-hover:bg-blue-500/10 group-hover:border-blue-500/50 transition-all">
                  <Mail className="text-blue-500" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Email</h3>
                  <p className="text-gray-400">jawadyazbek@example.com</p>
                </div>
              </div>
              <a
                href="https://www.linkedin.com/in/jawad-yazbek2k/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl group-hover:bg-blue-500/10 group-hover:border-blue-500/50 transition-all">
                  <Linkedin className="text-blue-500" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-semibold">LinkedIn</h3>
                  <p className="text-gray-400">linkedin.com/in/jawad-yazbek2k</p>
                </div>
              </a>
              <a
                href="https://github.com/JawadYzbk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl group-hover:bg-blue-500/10 group-hover:border-blue-500/50 transition-all">
                  <Github className="text-blue-500" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-semibold">GitHub</h3>
                  <p className="text-gray-400">github.com/JawadYzbk</p>
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 p-8 rounded-2xl"
          >
            <form className="space-y-6">
              <div>
                <label className="block text-gray-400 mb-2 text-sm">Name</label>
                <input
                  type="text"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2 text-sm">Email</label>
                <input
                  type="email"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2 text-sm">Message</label>
                <textarea
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white h-32 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-white text-black font-semibold py-4 rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
              >
                Send Message
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
