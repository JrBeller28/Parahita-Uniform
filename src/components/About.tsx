import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="tentang" className="py-32 bg-white dark:bg-slate-950 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl aspect-square lg:aspect-[4/5]">
              <img
                src="/12.png"
                alt="PT Parahita Prima Sentosa Office"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/40 to-transparent" />
            </div>
            
            {/* Floating Experience Badge */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -right-10 glass-card p-10 z-20 rounded-[2.5rem] border-brand-100 dark:border-brand-800/50"
            >
              <div className="text-center">
                <p className="text-brand-600 dark:text-brand-400 font-black text-6xl mb-2">30+</p>
                <p className="text-slate-900 dark:text-white font-black text-sm uppercase tracking-widest">{t('hero.stat.exp')}</p>
              </div>
            </motion.div>

            {/* Decorative background elements */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-brand-400/10 rounded-full blur-[100px] -z-0" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-xs font-black uppercase tracking-[0.2em] mb-8">
              {t('about.badge')}
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-10 leading-[1.1]">
              {t('about.title')}
            </h2>
            <div className="space-y-6 mb-12">
              <p className="text-slate-600 dark:text-slate-400 text-xl leading-relaxed">
                {t('about.desc1')}
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-xl leading-relaxed">
                {t('about.desc2')}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              {[
                'Fasilitas Produksi Milik Sendiri',
                'Tim Desainer Berpengalaman',
                'Quality Control Berlapis',
                'Jangkauan Seluruh Indonesia'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="flex-shrink-0 w-10 h-10 bg-brand-50 dark:bg-brand-900/30 rounded-xl flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300 shadow-inner">
                    <CheckCircle2 size={20} />
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 font-bold text-lg">{item}</span>
                </div>
              ))}
            </div>

            <Link 
              to="/tentang"
              className="btn-primary inline-flex group"
            >
              {t('about.cta')}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
