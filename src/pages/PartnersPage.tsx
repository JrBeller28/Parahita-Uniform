import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Building2, Landmark, Briefcase, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

interface Partner {
  id: string;
  name: string;
  logo: string;
  type: string;
}

export default function PartnersPage() {
  const { t } = useLanguage();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'partners'));
        const partnersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Partner[];
        setPartners(partnersData);
      } catch (error) {
        console.error("Error fetching partners:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
  }, []);

  const corporatePartners = partners.filter(p => p.type === 'Corporate');
  const governmentPartners = partners.filter(p => p.type === 'Government');

  return (
    <div className="pt-24 min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative py-24 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2000&auto=format&fit=crop" 
            alt="Partnership Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-950/80" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-400 text-xs font-bold uppercase tracking-wider mb-6 border border-brand-500/30"
            >
              <Users size={14} />
              {t('partners.title')}
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
            >
              {t('partnersPage.title')}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-300 leading-relaxed"
            >
              {t('partnersPage.subtitle')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <div className="bg-slate-50 dark:bg-slate-900/50 py-12 border-b border-slate-100 dark:border-slate-800 overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 dark:from-slate-900 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 dark:from-slate-900 to-transparent z-10" />
        
        <motion.div 
          animate={{ x: [0, -2000] }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex gap-20 items-center whitespace-nowrap"
        >
          {[...partners, ...partners, ...partners, ...partners].map((partner, index) => (
            <div key={index} className="flex-shrink-0 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="h-10 md:h-12 w-auto object-contain dark:invert dark:brightness-200"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Corporate Section */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/30 rounded-2xl flex items-center justify-center text-brand-600 dark:text-brand-400">
              <Building2 size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{t('partnersPage.section.corporate')}</h2>
              <div className="w-12 h-1 bg-brand-600 rounded-full mt-1" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {corporatePartners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center grayscale hover:grayscale-0 hover:bg-white dark:hover:bg-slate-800 hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all duration-500"
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="h-12 md:h-16 w-auto object-contain group-hover:scale-110 transition-transform dark:invert dark:brightness-200"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Government Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-brand-600 dark:text-brand-400 shadow-sm">
              <Landmark size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{t('partnersPage.section.government')}</h2>
              <div className="w-12 h-1 bg-brand-600 rounded-full mt-1" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {governmentPartners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center grayscale hover:grayscale-0 hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all duration-500"
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="h-12 md:h-16 w-auto object-contain group-hover:scale-110 transition-transform dark:invert dark:brightness-200"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Partner With Us */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1600880212340-02d956371844?q=80&w=1000&auto=format&fit=crop" 
                alt="Business Meeting" 
                className="rounded-3xl shadow-2xl dark:shadow-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -right-6 bg-brand-600 text-white p-8 rounded-3xl shadow-xl">
                <p className="text-4xl font-bold mb-1">500+</p>
                <p className="text-sm font-medium opacity-80">Kemitraan Aktif</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">Keunggulan Kemitraan Bersama Kami</h2>
              <div className="space-y-6">
                {[
                  { title: 'Harga Khusus Korporat', desc: 'Dapatkan skema harga grosir yang sangat kompetitif untuk pesanan dalam jumlah besar.' },
                  { title: 'Prioritas Produksi', desc: 'Mitra strategis mendapatkan prioritas dalam antrian produksi untuk menjamin ketepatan waktu.' },
                  { title: 'Manajemen Inventori', desc: 'Kami membantu mengelola stok seragam Anda untuk memastikan ketersediaan saat dibutuhkan.' },
                  { title: 'Layanan Desain Eksklusif', desc: 'Akses ke tim desainer senior kami untuk pengembangan identitas visual seragam yang unik.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center text-brand-600 dark:text-brand-400 mt-1">
                      <CheckCircle2 size={16} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-1">{item.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">{t('partnersPage.cta.title')}</h2>
            <p className="text-brand-100 mb-10 text-lg leading-relaxed">
              {t('partnersPage.cta.desc')}
            </p>
            <a 
              href="/#kontak"
              className="inline-flex items-center gap-3 bg-white text-brand-900 px-10 py-5 rounded-full font-bold hover:bg-brand-50 transition-all shadow-2xl shadow-black/20 group"
            >
              {t('partnersPage.cta.button')}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
