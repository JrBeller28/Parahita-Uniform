import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Users, Target, Award, CheckCircle2, ArrowRight, Play, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  const { t } = useLanguage();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const values = [
    {
      icon: <ShieldCheck className="text-brand-600" size={32} />,
      title: 'Kualitas Premium',
      desc: 'Kami hanya menggunakan material terbaik yang tahan lama dan nyaman dipakai.'
    },
    {
      icon: <Users className="text-brand-600" size={32} />,
      title: 'Kepuasan Pelanggan',
      desc: 'Fokus utama kami adalah memberikan layanan terbaik dan solusi tepat bagi setiap klien.'
    },
    {
      icon: <Target className="text-brand-600" size={32} />,
      title: 'Inovasi Berkelanjutan',
      desc: 'Terus mengembangkan teknik produksi dan desain untuk mengikuti tren industri.'
    },
    {
      icon: <Award className="text-brand-600" size={32} />,
      title: 'Integritas Tinggi',
      desc: 'Membangun kepercayaan melalui kejujuran dan transparansi dalam setiap proses.'
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative py-24 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="/images/11.png" 
            alt="About Us Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Tentang Kami</h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Membangun identitas profesional melalui seragam berkualitas tinggi sejak tahun 1990.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                Dedikasi Kami untuk Kualitas dan Profesionalisme
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                <p>
                  Berawal dari sebuah workshop kecil, kami telah tumbuh menjadi salah satu penyedia seragam terkemuka di Indonesia. Perjalanan kami didorong oleh semangat untuk membantu perusahaan dan instansi membangun citra yang kuat melalui pakaian kerja yang representatif.
                </p>
                <p>
                  Kami memahami bahwa seragam bukan sekadar pakaian, melainkan simbol identitas, kebanggaan, dan profesionalisme. Itulah mengapa setiap jahitan kami lakukan dengan ketelitian tinggi dan menggunakan material yang telah teruji kualitasnya.
                </p>
              </div>
              
              <div className="mt-10 grid grid-cols-2 gap-8">
                <div>
                  <div className="text-4xl font-bold text-brand-600 mb-2">30+</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Tahun Pengalaman</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-brand-600 mb-2">500+</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Klien Korporat</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/13.png" 
                  alt="Workshop" 
                  className="w-full h-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-brand-600 text-white p-8 rounded-3xl shadow-xl hidden md:block">
                <p className="text-lg font-bold">"Kualitas adalah prioritas utama kami dalam setiap produk."</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Nilai-Nilai Kami</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Prinsip yang membimbing kami dalam memberikan layanan terbaik kepada setiap pelanggan.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all"
              >
                <div className="mb-6">{value.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{value.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Section */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Media Galeri</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Lihat lebih dekat proses produksi dan kualitas produk kami melalui video berikut.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { src: '/images/Video1.mp4', title: 'Proses Produksi' },
              { src: '/images/Video2.mp4', title: 'Kualitas Bahan' },
              { src: '/images/Video3.mp4', title: 'Hasil Akhir' }
            ].map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative aspect-video rounded-3xl overflow-hidden shadow-lg cursor-pointer bg-slate-100 dark:bg-slate-800"
                onClick={() => setSelectedVideo(video.src)}
              >
                <video 
                  src={video.src}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  muted
                  playsInline
                  onMouseOver={(e) => (e.target as HTMLVideoElement).play()}
                  onMouseOut={(e) => {
                    const v = e.target as HTMLVideoElement;
                    v.pause();
                    v.currentTime = 0;
                  }}
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30">
                    <Play fill="currentColor" size={24} />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white font-bold">{video.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-6 right-6 z-10 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all"
              >
                <X size={24} />
              </button>
              <video
                src={selectedVideo}
                className="w-full h-full"
                controls
                autoPlay
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-600 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-900/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-8">Siap Membangun Identitas Profesional Anda?</h2>
              <p className="text-xl text-brand-100 mb-10 max-w-2xl mx-auto">
                Konsultasikan kebutuhan seragam perusahaan Anda dengan tim ahli kami sekarang.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  to="/#kontak"
                  className="bg-white text-brand-600 px-10 py-4 rounded-full font-bold hover:bg-brand-50 transition-all flex items-center gap-2"
                >
                  Hubungi Kami
                  <ArrowRight size={20} />
                </Link>
                <Link 
                  to="/produk"
                  className="bg-brand-700 text-white px-10 py-4 rounded-full font-bold hover:bg-brand-800 transition-all"
                >
                  Lihat Katalog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
