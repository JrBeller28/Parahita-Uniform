import React from 'react';
import { motion } from 'motion/react';
import { Shield, Clock, ThumbsUp, Users, Palette, Ruler, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: <Shield className="text-brand-600" size={32} />,
    title: 'Bahan Berkualitas',
    description: 'Kami hanya menggunakan material kain pilihan yang tahan lama, tidak mudah luntur, dan nyaman dipakai sepanjang hari.'
  },
  {
    icon: <Palette className="text-brand-600" size={32} />,
    title: 'Desain Custom',
    description: 'Tim desainer kami siap membantu mewujudkan konsep seragam yang sesuai dengan identitas dan branding perusahaan Anda.'
  },
  {
    icon: <Ruler className="text-brand-600" size={32} />,
    title: 'Ukuran Presisi',
    description: 'Sistem pengukuran yang akurat memastikan setiap personel mendapatkan seragam dengan fitting yang pas dan profesional.'
  },
  {
    icon: <Clock className="text-brand-600" size={32} />,
    title: 'Tepat Waktu',
    description: 'Manajemen produksi yang efisien menjamin pesanan Anda selesai sesuai dengan timeline yang telah disepakati.'
  },
  {
    icon: <ThumbsUp className="text-brand-600" size={32} />,
    title: 'Harga Kompetitif',
    description: 'Dapatkan kualitas premium dengan penawaran harga terbaik yang transparan tanpa biaya tersembunyi.'
  },
  {
    icon: <Users className="text-brand-600" size={32} />,
    title: 'Layanan After-Sales',
    description: 'Kami memberikan garansi perbaikan dan layanan konsultasi berkelanjutan untuk kepuasan jangka panjang Anda.'
  }
];

export default function Features() {
  const { t } = useLanguage();

  return (
    <section id="keunggulan" className="py-32 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-200/20 dark:bg-brand-900/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-orange-200/20 dark:bg-orange-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-xs font-black uppercase tracking-[0.2em] mb-6">
              {t('features.badge')}
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8">
              {t('features.title')}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-xl leading-relaxed">
              {t('features.desc')}
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-10 rounded-[2.5rem] glass-card hover:bg-white dark:hover:bg-slate-900 hover:-translate-y-2 transition-all duration-500"
            >
              <div className="mb-8 p-5 bg-brand-50 dark:bg-brand-900/30 rounded-2xl w-fit text-brand-600 dark:text-brand-400 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all duration-500 shadow-inner">
                {React.cloneElement(feature.icon as React.ReactElement, { size: 32 })}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
        <div className="mt-20 text-center">
          <Link 
            to="/keunggulan"
            className="btn-primary inline-flex group"
          >
            Lihat Keunggulan Selengkapnya
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
