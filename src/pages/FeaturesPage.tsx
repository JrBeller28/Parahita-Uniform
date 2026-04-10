import React from 'react';
import { motion } from 'motion/react';
import { Shield, Clock, ThumbsUp, Users, Palette, Ruler, ArrowRight, CheckCircle2, Award, Zap, Heart, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const detailedFeatures = [
  {
    icon: <Shield size={40} />,
    title: 'Bahan Berkualitas Tinggi',
    description: 'Kami bekerja sama dengan pabrik tekstil ternama untuk memastikan setiap gulungan kain memenuhi standar ketahanan dan kenyamanan maksimal.',
    details: [
      'Material anti-bakteri & anti-bau',
      'Warna tidak mudah pudar (high color fastness)',
      'Tekstur lembut namun kuat',
      'Sertifikasi OEKO-TEX'
    ]
  },
  {
    icon: <Palette size={40} />,
    title: 'Desain Eksklusif & Custom',
    description: 'Seragam adalah wajah perusahaan Anda. Kami membantu merancang identitas visual yang kuat melalui detail desain yang fungsional.',
    details: [
      'Konsultasi desain gratis',
      'Mockup 3D profesional',
      'Pilihan aksesoris custom',
      'Integrasi branding yang cerdas'
    ]
  },
  {
    icon: <Ruler size={40} />,
    title: 'Fitting & Ukuran Presisi',
    description: 'Kenyamanan dimulai dari ukuran yang pas. Kami memiliki sistem pengukuran yang telah teruji untuk ribuan karyawan.',
    details: [
      'Layanan fitting on-site',
      'Size chart internasional',
      'Penyesuaian postur tubuh',
      'Garansi revisi ukuran'
    ]
  },
  {
    icon: <Clock size={40} />,
    title: 'Ketepatan Waktu Produksi',
    description: 'Kami memahami pentingnya timeline bisnis Anda. Sistem ERP kami memastikan setiap tahap produksi terpantau dengan akurat.',
    details: [
      'Timeline produksi transparan',
      'Kapasitas produksi besar',
      'Pengiriman tepat jadwal',
      'Update status berkala'
    ]
  },
  {
    icon: <ThumbsUp size={40} />,
    title: 'Harga Jujur & Kompetitif',
    description: 'Kualitas premium tidak harus mahal. Kami mengoptimalkan rantai pasok untuk memberikan nilai terbaik bagi investasi Anda.',
    details: [
      'Harga langsung pabrik',
      'Tanpa biaya tersembunyi',
      'Opsi material sesuai budget',
      'Diskon volume besar'
    ]
  },
  {
    icon: <Users size={40} />,
    title: 'Layanan Pelanggan Prima',
    description: 'Hubungan kami tidak berakhir setelah pengiriman. Kami berkomitmen menjadi mitra jangka panjang untuk kebutuhan seragam Anda.',
    details: [
      'Account Manager khusus',
      'Respon cepat 24/7',
      'Layanan purna jual',
      'Manajemen stok seragam'
    ]
  }
];

export default function FeaturesPage() {
  const { t } = useLanguage();

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-32 bg-brand-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/11.png"
            alt="Features Background"
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-950/50 via-brand-950 to-brand-950" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-brand-500/20 text-brand-400 text-xs font-black uppercase tracking-[0.3em] mb-8 border border-brand-500/30">
              {t('features.badge')}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              {t('featuresPage.title')}
            </h1>
            <p className="text-brand-100/60 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              {t('featuresPage.subtitle')}
            </p>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-500/20 rounded-full blur-[120px]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]" />
      </section>

      {/* Detailed Features Grid */}
      <section className="py-32 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {detailedFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group p-10 md:p-16 rounded-[3rem] glass-card hover:bg-slate-50 dark:hover:bg-slate-900 transition-all duration-500 border-slate-100 dark:border-slate-800"
              >
                <div className="flex flex-col md:flex-row gap-10">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-brand-50 dark:bg-brand-900/30 rounded-3xl flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:bg-brand-600 group-hover:text-white transition-all duration-500 shadow-inner">
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8">
                      {feature.description}
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {feature.details.map((detail, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-brand-500 rounded-full" />
                          <span className="text-slate-700 dark:text-slate-300 font-bold text-sm">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-32 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-brand-600 rounded-[4rem] p-12 md:p-24 overflow-hidden relative shadow-2xl shadow-brand-500/20">
            {/* Decorative background */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
              <div>
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                  Komitmen Kami Terhadap Kualitas
                </h2>
                <p className="text-brand-100 text-xl leading-relaxed mb-12">
                  Setiap helai benang dan setiap jahitan adalah representasi dari dedikasi kami untuk memberikan yang terbaik bagi citra profesional Anda.
                </p>
                <div className="flex flex-wrap gap-8">
                  <div className="flex items-center gap-4 text-white">
                    <Award size={40} className="text-brand-200" />
                    <div>
                      <div className="font-black text-2xl">ISO 9001</div>
                      <div className="text-sm text-brand-200 uppercase tracking-widest">Quality Management</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-white">
                    <Zap size={40} className="text-brand-200" />
                    <div>
                      <div className="font-black text-2xl">Fast Track</div>
                      <div className="text-sm text-brand-200 uppercase tracking-widest">Rapid Production</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                  <img 
                    src="/images/12.png" 
                    alt="Quality Commitment" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Floating badge */}
                <motion.div 
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-10 -right-10 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl"
                >
                  <div className="text-center">
                    <Heart className="text-red-500 mx-auto mb-2 fill-red-500" size={32} />
                    <div className="text-slate-900 dark:text-white font-black text-xl">100%</div>
                    <div className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-widest">Dedikasi</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-10">
              Siap Membangun Identitas Profesional Anda?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-xl mb-12 leading-relaxed">
              Tim ahli kami siap membantu Anda merancang dan memproduksi seragam terbaik yang sesuai dengan nilai-nilai perusahaan Anda.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/#kontak" className="btn-primary group">
                Konsultasi Sekarang
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/produk" className="btn-secondary">
                Lihat Katalog Produk
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
