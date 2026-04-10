import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

interface Partner {
  name: string;
  logo: string;
}

export default function Partners() {
  const { t } = useLanguage();
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'partners'));
        const partnersData = querySnapshot.docs.map(doc => ({
          name: doc.data().name,
          logo: doc.data().logo
        })) as Partner[];
        setPartners(partnersData);
      } catch (error) {
        console.error("Error fetching partners:", error);
      }
    };
    fetchPartners();
  }, []);

  if (partners.length === 0) return null;

  return (
    <section id="mitra" className="py-32 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
              {t('partners.title')}
            </span>
          </motion.div>
        </div>
        
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10" />
          
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ 
              duration: 30, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="flex gap-20 items-center whitespace-nowrap py-10"
          >
            {[...partners, ...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex justify-center grayscale hover:grayscale-0 transition-all duration-500 opacity-40 hover:opacity-100 hover:scale-110"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-12 md:h-16 w-auto object-contain dark:brightness-0 dark:invert"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="mt-16 text-center">
          <Link 
            to="/mitra" 
            className="inline-flex items-center gap-3 text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 font-black uppercase tracking-widest text-xs transition-all group"
          >
            Lihat Semua Mitra 
            <div className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white group-hover:border-brand-600 transition-all">
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
