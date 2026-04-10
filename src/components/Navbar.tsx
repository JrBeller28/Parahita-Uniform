import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronRight, Moon, Sun } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();

  const { lang, setLang, t } = useLanguage();
  const location = useLocation();

  const navLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.products'), href: '/produk' },
    { name: t('nav.features'), href: '/keunggulan' },
    { name: t('nav.about'), href: '/tentang' },
    { name: t('nav.partners'), href: '/mitra' },
    { name: t('nav.testimonials'), href: '/#testimoni' },
  ];

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    if (href === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (href.includes('#') && location.pathname === '/') {
      const id = href.split('#')[1];
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled 
          ? 'glass-nav py-3 shadow-lg shadow-slate-900/5' 
          : 'bg-transparent py-6'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center gap-4">
          {/* Logo - Left Column */}
          <div className="flex-1 min-w-[120px] lg:min-w-[200px] flex justify-start">
            <Link to="/" className="flex items-center group">
              <div className="relative">
                <img 
                  src="/images/pps.png" 
                  alt="Parahita Logo" 
                  className="h-11 lg:h-13 w-auto object-contain dark:invert dark:brightness-200 group-hover:scale-110 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -inset-2 bg-brand-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          </div>

          {/* Desktop Nav - Center Column */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4 flex-shrink-0">
            {/* Nav Links Pill */}
            <div className="flex items-center gap-0.5 bg-slate-100/30 dark:bg-slate-800/30 backdrop-blur-md p-1 rounded-full border border-slate-200/40 dark:border-slate-700/40 shadow-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className={cn(
                    "px-3 lg:px-6 py-2 lg:py-3 text-[9px] lg:text-[10px] font-black uppercase tracking-[0.15em] lg:tracking-[0.2em] transition-all rounded-full relative group whitespace-nowrap",
                    location.pathname === link.href || (location.pathname === '/' && link.href.startsWith('/#') && location.hash === link.href.substring(1))
                      ? "text-brand-600 dark:text-brand-400 bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/40 dark:shadow-none"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-full bg-slate-100/30 dark:bg-slate-800/30 backdrop-blur-md text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-all border border-slate-200/40 dark:border-slate-700/40 shadow-sm"
            >
              <Sun size={18} className="dark:hidden" />
              <Moon size={18} className="hidden dark:block" />
            </button>

            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100/30 dark:bg-slate-800/30 backdrop-blur-md rounded-full p-1 border border-slate-200/40 dark:border-slate-700/40 shadow-sm">
              <button
                onClick={() => setLang('ID')}
                className={cn(
                  "px-3 lg:px-4 py-1.5 lg:py-2 text-[9px] lg:text-[10px] font-black rounded-full transition-all",
                  lang === 'ID' ? "bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-md" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                )}
              >
                ID
              </button>
              <button
                onClick={() => setLang('EN')}
                className={cn(
                  "px-3 lg:px-4 py-1.5 lg:py-2 text-[9px] lg:text-[10px] font-black rounded-full transition-all",
                  lang === 'EN' ? "bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-md" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                )}
              >
                EN
              </button>
            </div>
          </div>

          {/* Right Actions - Right Column */}
          <div className="hidden md:flex flex-1 min-w-[120px] lg:min-w-[200px] justify-end items-center">
            <Link
              to="/#kontak"
              onClick={() => handleLinkClick('/#kontak')}
              className="bg-brand-600 text-white px-5 lg:px-8 py-3 lg:py-4 rounded-full text-[10px] lg:text-[11px] font-black uppercase tracking-[0.15em] lg:tracking-[0.25em] hover:bg-brand-700 transition-all shadow-xl shadow-brand-500/30 active:scale-95 whitespace-nowrap"
            >
              {t('nav.contact')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-full p-1 border border-slate-200 dark:border-slate-700 text-[10px] font-bold">
              <button onClick={() => setLang('ID')} className={cn("px-2 py-0.5 rounded-full", lang === 'ID' ? "bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm" : "text-slate-400")}>ID</button>
              <button onClick={() => setLang('EN')} className={cn("px-2 py-0.5 rounded-full", lang === 'EN' ? "bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm" : "text-slate-400")}>EN</button>
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className="block px-3 py-3 text-base font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all flex justify-between items-center"
                >
                  {link.name}
                  <ChevronRight size={16} className="text-slate-400 dark:text-slate-500" />
                </Link>
              ))}
              <div className="pt-4 px-3">
                <Link
                  to="/#kontak"
                  onClick={() => handleLinkClick('/#kontak')}
                  className="block w-full bg-brand-600 text-white text-center px-5 py-3 rounded-xl font-semibold hover:bg-brand-700 transition-all"
                >
                  {t('nav.contact')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
