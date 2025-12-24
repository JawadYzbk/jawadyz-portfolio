'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Send } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const Contact = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section id="contact" className="py-24 bg-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid md:grid-cols-2 gap-12 ${isRTL ? 'text-right' : ''}`}>
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6 text-white">{t.contact.title}</h2>
            <p className="text-gray-400 mb-8 text-lg">
              {t.contact.description}
            </p>
            
            <div className="space-y-6">
              <div className={`flex items-center gap-4 group ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl group-hover:bg-blue-500/10 group-hover:border-blue-500/50 transition-all">
                  <Mail className="text-blue-500" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{t.contact.form.email}</h3>
                  <p className="text-gray-400">jawadyazbek@example.com</p>
                </div>
              </div>
              <a
                href="https://www.linkedin.com/in/jawad-yazbek2k/"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-4 group ${isRTL ? 'flex-row-reverse' : ''}`}
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
                className={`flex items-center gap-4 group ${isRTL ? 'flex-row-reverse' : ''}`}
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
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 p-8 rounded-2xl"
          >
            <form className="space-y-6">
              <div>
                <label className="block text-gray-400 mb-2 text-sm">{t.contact.form.name}</label>
                <input
                  type="text"
                  className={`w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors ${isRTL ? 'text-right' : ''}`}
                  placeholder={t.contact.form.namePlaceholder}
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2 text-sm">{t.contact.form.email}</label>
                <input
                  type="email"
                  className={`w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors ${isRTL ? 'text-right' : ''}`}
                  placeholder={t.contact.form.emailPlaceholder}
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2 text-sm">{t.contact.form.message}</label>
                <textarea
                  className={`w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white h-32 focus:outline-none focus:border-blue-500 transition-colors ${isRTL ? 'text-right' : ''}`}
                  placeholder={t.contact.form.messagePlaceholder}
                />
              </div>
              <button
                type="submit"
                className={`w-full bg-white text-black font-semibold py-4 rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                {t.contact.form.send}
                <Send size={18} className={isRTL ? 'rotate-180' : ''} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
