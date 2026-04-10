import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Building2, Users, Globe, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const partners = [
  { 
    name: 'Pertamina', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Pertamina_logo.svg/1200px-Pertamina_logo.svg.png',
    description: 'Bekerjasama dalam penyediaan seragam operasional lapangan (Wearpack) standar keamanan tinggi untuk ribuan personel di seluruh Indonesia.',
    sector: 'Energy',
    year: 'Sejak 2015'
  },
  { 
    name: 'Telkom Indonesia', 
    logo: 'https://upload.wikimedia.org/wikipedia/id/thumb/c/c4/Telkom_Indonesia_2013.svg/1200px-Telkom_Indonesia_2013.svg.png',
    description: 'Penyedia seragam corporate dan teknisi lapangan untuk mendukung identitas brand telekomunikasi terbesar di Indonesia.',
    sector: 'Telecommunication',
    year: 'Sejak 2018'
  },
  { 
    name: 'Bank Mandiri', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/1200px-Bank_Mandiri_logo_2016.svg.png',
    description: 'Memproduksi seragam formal front-liner dengan kualitas jahitan premium untuk kesan profesional perbankan.',
    sector: 'Banking',
    year: 'Sejak 2017'
  },
  { 
    name: 'Gojek', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Gojek_logo_2019.svg/1200px-Gojek_logo_2019.svg.png',
    description: 'Kolaborasi dalam pembuatan jaket dan merchandise promosi berkualitas tinggi untuk mitra driver dan staf.',
    sector: 'Technology',
    year: 'Sejak 2019'
  },
  { 
    name: 'Indofood', 
    logo: 'https://upload.wikimedia.org/wikipedia/id/thumb/0/03/Indofood_logo.svg/1200px-Indofood_logo.svg.png',
    description: 'Penyediaan seragam pabrik dan operasional logistik dengan material yang nyaman untuk produktivitas tinggi.',
    sector: 'F&B',
    year: 'Sejak 2016'
  },
  { 
    name: 'PLN', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Logo_PLN.svg/1200px-Logo_PLN.svg.png',
    description: 'Memenuhi kebutuhan seragam teknisi listrik dengan standar keamanan kelistrikan yang ketat.',
    sector: 'Energy',
    year: 'Sejak 2014'
  },
];

export default function PartnerDetail() {
  const { t } = useLanguage();

  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-600 font-bold mb-12 transition-colors">
          <ArrowLeft size={20} />
          {t('nav.home')}
        </Link>

        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">Mitra Strategis Kami</h1>
          <p className="text-slate-600 text-lg">
            Kami bangga telah dipercaya oleh berbagai perusahaan terkemuka di Indonesia untuk menyediakan solusi seragam berkualitas tinggi.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl transition-all group"
            >
              <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center mb-6">
                <div className="w-24 h-24 bg-white rounded-2xl p-4 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-full max-w-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">{partner.name}</h3>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 bg-brand-100 text-brand-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                      {partner.sector}
                    </span>
                    <span className="px-3 py-1 bg-slate-200 text-slate-600 text-[10px] font-bold rounded-full uppercase tracking-wider">
                      {partner.year}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed">
                {partner.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 bg-brand-900 rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6">Ingin Menjadi Mitra Kami Selanjutnya?</h2>
            <p className="text-brand-100/80 max-w-2xl mx-auto mb-10 text-lg">
              Bergabunglah dengan ratusan perusahaan lainnya yang telah meningkatkan citra profesional mereka bersama SeragamParahita.
            </p>
            <a
              href="#kontak"
              className="inline-flex items-center gap-2 bg-white text-brand-900 px-10 py-4 rounded-full font-bold hover:bg-brand-50 transition-all shadow-xl"
            >
              Hubungi Tim Marketing
              <ArrowLeft size={18} className="rotate-180" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
