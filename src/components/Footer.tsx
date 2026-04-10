import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-brand-950 text-white pt-32 pb-16 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/11.png"
          alt="Footer Background"
          className="w-full h-full object-cover opacity-10"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-950 via-brand-950/95 to-brand-950" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-4 group">
              <img 
                src="/images/logo.png" 
                alt="Parahita Logo" 
                className="h-16 w-auto object-contain brightness-0 invert"
                referrerPolicy="no-referrer"
              />
              <div className="border-l border-white/20 pl-4">
                <p className="text-[11px] leading-tight font-black uppercase tracking-[0.2em]">The Real Uniform</p>
                <p className="text-[11px] leading-tight font-black text-brand-400 uppercase tracking-[0.2em]">& Promotion</p>
              </div>
            </Link>
            <p className="text-slate-400 text-lg leading-relaxed">
              Solusi seragam profesional terbaik untuk perusahaan, industri, dan instansi Anda. Kualitas premium dengan layanan terpercaya.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-600 hover:border-brand-600 transition-all duration-300"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-black uppercase tracking-widest mb-10 text-white">Navigasi</h4>
            <ul className="space-y-5">
              {[
                { name: t('nav.home'), href: '/' },
                { name: t('nav.products'), href: '/produk' },
                { name: t('nav.features'), href: '/keunggulan' },
                { name: t('nav.about'), href: '/tentang' },
                { name: t('nav.partners'), href: '/mitra' },
                { name: t('nav.contact'), href: '/#kontak' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-slate-400 hover:text-brand-400 transition-colors flex items-center gap-3 group text-lg"
                  >
                    <div className="w-1.5 h-1.5 bg-brand-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-black uppercase tracking-widest mb-10 text-white">Kontak Kami</h4>
            <ul className="space-y-8">
              <li className="flex gap-5">
                <div className="text-brand-400 flex-shrink-0 font-black">A:</div>
                <span className="text-slate-400 leading-relaxed text-lg">
                  JL. Raya Serpong KM.7 Kawasan Multiguna, Pakualam, Serpong Utara, Tangerang
                </span>
              </li>
              <li className="flex gap-5">
                <div className="text-brand-400 flex-shrink-0 font-black">P:</div>
                <span className="text-slate-400 text-lg">(021) 5399261</span>
              </li>
              <li className="flex gap-5">
                <div className="text-brand-400 flex-shrink-0 font-black">E:</div>
                <span className="text-slate-400 text-lg">info@seragamparahita.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-black uppercase tracking-widest mb-10 text-white">Jam Operasional</h4>
            <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <span className="text-slate-400">Senin - Jumat</span>
                <span className="font-bold">08:00 - 17:00</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <span className="text-slate-400">Sabtu</span>
                <span className="font-bold">08:00 - 14:00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Minggu</span>
                <span className="text-brand-400 font-bold uppercase tracking-widest text-xs">Tutup</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm font-medium">
            © {currentYear} PT Parahita Prima Sentosa. All rights reserved.
          </p>
          <div className="flex gap-10">
            <a href="#" className="text-slate-500 hover:text-white text-sm font-medium transition-colors">Privacy Policy</a>
            <Link to="/admin" className="text-slate-500 hover:text-white text-sm font-medium transition-colors">Admin Login</Link>
            <a href="#" className="text-slate-500 hover:text-white text-sm font-medium transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
