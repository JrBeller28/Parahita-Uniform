import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Award, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function Hero() {
  const { t } = useLanguage();
  const [heroBg, setHeroBg] = useState('/images/seragam.png');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settingsSnap = await getDoc(doc(db, 'settings', 'landingPage'));
        if (settingsSnap.exists()) {
          const data = settingsSnap.data();
          if (data.heroBackground) {
            setHeroBg(data.heroBackground);
          }
        }
      } catch (error) {
        console.error("Error fetching hero settings:", error);
      }
    };
    fetchSettings();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Background Seragam"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-slate-950 dark:via-slate-950/80 dark:to-transparent backdrop-blur-[2px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-widest mb-8 border border-brand-100 dark:border-brand-800/50"
            >
              <ShieldCheck size={16} />
              {t('hero.badge')}
            </motion.div>
            
            <h1 className="text-5xl lg:text-8xl font-bold text-slate-900 dark:text-white leading-[1] mb-8">
              <span className="block">{t('hero.title').split('&')[0]}</span>
              <span className="text-gradient">& {t('hero.title').split('&')[1]}</span>
            </h1>
            
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-xl leading-relaxed font-medium">
              {t('hero.desc')}
            </p>
            
            <div className="flex flex-wrap gap-6">
              <Link
                to="/produk"
                className="btn-primary group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t('hero.cta.catalog')}
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-brand-400 to-brand-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                to="/#tentang"
                className="btn-secondary"
              >
                {t('hero.cta.about')}
              </Link>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-8 border-t border-slate-200 dark:border-slate-800 pt-10">
              {[
                { label: t('hero.stat.exp'), value: '30+' },
                { label: t('hero.stat.clients'), value: '500+' },
                { label: t('hero.stat.sold'), value: '1M+' }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</div>
                  <div className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl aspect-[4/5]">
              <img
                src="/images/11.png"
                alt="Seragam Profesional"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 via-transparent to-transparent" />
            </div>
            
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -20, 0], rotate: [0, 2, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 glass-card p-8 z-20 rounded-3xl"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-brand-100 dark:bg-brand-900/40 rounded-2xl flex items-center justify-center text-brand-600 dark:text-brand-400 shadow-inner">
                  <Award size={28} />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-lg">ISO Certified</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">Kualitas Internasional</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 20, 0], rotate: [0, -2, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 glass-card p-8 z-20 rounded-3xl"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center text-orange-600 dark:text-orange-400 shadow-inner">
                  <Zap size={28} />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-lg">Produksi Cepat</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">Tepat Waktu & Akurat</div>
                </div>
              </div>
            </motion.div>

            {/* Decorative background blobs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-400/20 dark:bg-brand-600/10 rounded-full blur-[120px] -z-10 animate-pulse" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
