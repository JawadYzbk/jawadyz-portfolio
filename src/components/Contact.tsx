'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const Contact = () => {
  const { t, isRTL } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "a3caabe3-faa0-4342-b828-f5ac041f5b68"); // User will need to replace this

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 bg-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid md:grid-cols-2 gap-12 ${isRTL ? 'md:grid-cols-[1fr_1fr]' : ''}`}>
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={isRTL ? 'text-right' : ''}
          >
            <h2 className={`text-3xl font-bold mb-6 text-white ${isRTL ? 'font-arabic' : ''}`}>{t.contact.title}</h2>
            <p className={`text-gray-400 mb-8 text-lg ${isRTL ? 'font-arabic font-light leading-relaxed' : ''}`}>
              {t.contact.description}
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl group-hover:bg-blue-500/10 group-hover:border-blue-500/50 transition-all shrink-0">
                  <Mail className="text-blue-500" size={24} />
                </div>
                  <a
                href="mailto:jawadyazbek@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="flex flex-col">
                  <h3 className={`text-white font-semibold ${isRTL ? 'font-arabic' : ''}`}>{t.contact.form.email}</h3>
                 
                 <p className="text-gray-400 break-all">jawadyazbek@gmail.com</p>
                </div>
              </a>
              </div>
              <a
                href="https://www.linkedin.com/in/jawad-yazbek2k/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl group-hover:bg-blue-500/10 group-hover:border-blue-500/50 transition-all shrink-0">
                  <Linkedin className="text-blue-500" size={24} />
                </div>
                <div className="flex flex-col">
                  <h3 className={`text-white font-semibold ${isRTL ? 'font-arabic' : ''}`}>LinkedIn</h3>
                  <p className="text-gray-400 break-all">linkedin.com/in/jawad-yazbek2k</p>
                </div>
              </a>
              <a
                href="https://github.com/JawadYzbk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl group-hover:bg-blue-500/10 group-hover:border-blue-500/50 transition-all shrink-0">
                  <Github className="text-blue-500" size={24} />
                </div>
                <div className="flex flex-col">
                  <h3 className={`text-white font-semibold ${isRTL ? 'font-arabic' : ''}`}>GitHub</h3>
                  <p className="text-gray-400 break-all">github.com/JawadYzbk</p>
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 p-8 rounded-2xl relative overflow-hidden"
          >
            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 bg-black/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center p-6"
              >
                <CheckCircle className="text-green-500 mb-4" size={64} />
                <h3 className={`text-2xl font-bold text-white mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                  {isRTL ? 'تم الإرسال بنجاح!' : 'Message Sent!'}
                </h3>
                <p className={`text-gray-400 mb-6 ${isRTL ? 'font-arabic font-light' : ''}`}>
                  {isRTL ? 'شكراً لتواصلك معي. سأقوم بالرد عليك في أقرب وقت ممكن.' : 'Thank you for reaching out. I will get back to you as soon as possible.'}
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className={`px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors ${isRTL ? 'font-arabic' : ''}`}
                >
                  {isRTL ? 'إرسال رسالة أخرى' : 'Send another message'}
                </button>
              </motion.div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className={`block text-gray-400 mb-2 text-sm ${isRTL ? 'text-right font-arabic' : ''}`}>{t.contact.form.name}</label>
                <input
                  type="text"
                  name="name"
                  required
                  className={`w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors ${isRTL ? 'text-right font-arabic placeholder:text-right' : ''}`}
                  placeholder={t.contact.form.namePlaceholder}
                />
              </div>
              <div>
                <label className={`block text-gray-400 mb-2 text-sm ${isRTL ? 'text-right font-arabic' : ''}`}>{t.contact.form.email}</label>
                <input
                  type="email"
                  name="email"
                  required
                  className={`w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors ${isRTL ? 'text-right font-arabic placeholder:text-right' : ''}`}
                  placeholder={t.contact.form.emailPlaceholder}
                />
              </div>
              <div>
                <label className={`block text-gray-400 mb-2 text-sm ${isRTL ? 'text-right font-arabic' : ''}`}>{t.contact.form.message}</label>
                <textarea
                  name="message"
                  required
                  className={`w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white h-32 focus:outline-none focus:border-blue-500 transition-colors ${isRTL ? 'text-right font-arabic placeholder:text-right' : ''}`}
                  placeholder={t.contact.form.messagePlaceholder}
                />
              </div>
              
              {status === 'error' && (
                <div className={`flex items-center gap-2 text-red-500 text-sm ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}>
                  <AlertCircle size={16} />
                  <span>{isRTL ? 'حدث خطأ ما. يرجى المحاولة مرة أخرى.' : 'Something went wrong. Please try again.'}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className={`w-full bg-white text-black font-semibold py-4 rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}
              >
                {status === 'sending' ? (
                  isRTL ? 'جاري الإرسال...' : 'Sending...'
                ) : (
                  <>
                    {t.contact.form.send}
                    <Send size={18} className={isRTL ? 'rotate-180' : ''} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
