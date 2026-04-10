import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ID' | 'EN';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ID: {
    'nav.home': 'Beranda',
    'nav.products': 'Produk',
    'nav.features': 'Keunggulan',
    'nav.about': 'Tentang Kami',
    'nav.partners': 'Mitra',
    'nav.testimonials': 'Testimoni',
    'nav.contact': 'Hubungi Kami',
    'hero.badge': 'Kualitas Terbaik Sejak 1990',
    'hero.title': 'The Real Uniform & Promotion',
    'hero.desc': 'PT Parahita Prima Sentosa menghadirkan solusi seragam berkualitas tinggi sejak 1990. Kami berkomitmen mewujudkan kebutuhan identitas profesional Anda.',
    'hero.cta.catalog': 'Lihat Katalog',
    'hero.cta.about': 'Tentang Kami',
    'hero.stat.exp': 'Tahun Pengalaman',
    'hero.stat.clients': 'Klien Korporat',
    'hero.stat.sold': 'Produk Terjual',
    'partners.title': 'Dipercaya Oleh Perusahaan Terkemuka',
    'products.badge': 'Katalog Produk',
    'products.title': 'Solusi Seragam Untuk Setiap Sektor',
    'products.desc': 'Kami menyediakan berbagai jenis seragam yang dirancang khusus untuk memenuhi kebutuhan spesifik industri Anda.',
    'products.detail': 'Detail Produk',
    'features.badge': 'Keunggulan Kami',
    'features.title': 'Mengapa Memilih SeragamParahita?',
    'features.desc': 'Kami berkomitmen memberikan standar tertinggi dalam setiap jahitan untuk mendukung profesionalisme bisnis Anda.',
    'about.badge': 'Tentang Kami',
    'about.title': 'PT Parahita Prima Sentosa: Dedikasi Untuk Kualitas & Profesionalisme',
    'about.desc1': 'Berdiri pada tahun 1990 dengan nama PT. Parahita Sanu Setia, kami telah berkembang menjadi PT. Parahita Prima Sentosa, perusahaan pakaian jadi terkemuka yang melayani ratusan perusahaan di seluruh Indonesia.',
    'about.desc2': 'Melalui brand SeragamParahita, kami mengintegrasikan pengalaman puluhan tahun dengan teknologi produksi modern untuk menghasilkan produk yang tidak hanya indah dipandang, tetapi juga fungsional dan lama.',
    'about.stat': 'Kepuasan Pelanggan Adalah Prioritas Kami',
    'about.cta': 'Pelajari Visi & Misi',
    'testimonials.badge': 'Testimoni',
    'testimonials.title': 'Apa Kata Pelanggan Kami?',
    'contact.badge': 'Hubungi Kami',
    'contact.title': 'Siap Untuk Meningkatkan Citra Perusahaan Anda?',
    'contact.desc': 'Konsultasikan kebutuhan seragam Anda dengan tim ahli kami. Kami siap memberikan solusi terbaik yang sesuai dengan budget dan identitas bisnis Anda.',
    'contact.form.name': 'Nama Lengkap',
    'contact.form.email': 'Email Bisnis',
    'contact.form.company': 'Nama Perusahaan',
    'contact.form.message': 'Pesan / Kebutuhan',
    'contact.form.submit': 'Kirim Pesan',
    'contact.form.submitting': 'Mengirim...',
    'contact.form.success.title': 'Pesan Terkirim!',
    'contact.form.success.desc': 'Terima kasih telah menghubungi kami. Tim kami akan segera merespon pesan Anda.',
    'contact.form.success.again': 'Kirim pesan lain',
    'footer.desc': 'Penyedia solusi seragam profesional terpercaya di Indonesia sejak 1990. Kami menghadirkan kualitas premium untuk meningkatkan citra bisnis Anda.',
    'footer.links': 'Tautan Cepat',
    'footer.products': 'Produk Kami',
    'footer.info': 'Informasi Kontak',
    'footer.copy': 'Seluruh Hak Cipta Dilindungi.',
    'footer.privacy': 'Kebijakan Privasi',
    'footer.terms': 'Syarat & Ketentuan',
    'productsPage.title': 'Katalog Produk Lengkap',
    'productsPage.subtitle': 'Jelajahi berbagai koleksi seragam premium kami yang dirancang untuk profesionalisme dan kenyamanan.',
    'productsPage.filter.all': 'Semua',
    'productsPage.filter.corporate': 'Korporat',
    'productsPage.filter.industrial': 'Industri',
    'productsPage.filter.medical': 'Medis',
    'productsPage.filter.school': 'Sekolah',
    'partnersPage.title': 'Jaringan Kemitraan Kami',
    'partnersPage.subtitle': 'Membangun hubungan jangka panjang dengan perusahaan-perusahaan terkemuka di Indonesia.',
    'partnersPage.section.corporate': 'Klien Korporat',
    'partnersPage.section.government': 'Instansi Pemerintah',
    'partnersPage.cta.title': 'Ingin Menjadi Mitra Kami?',
    'partnersPage.cta.desc': 'Bergabunglah dengan ratusan perusahaan yang telah mempercayakan kebutuhan seragam mereka kepada kami.',
    'partnersPage.cta.button': 'Hubungi Tim Kemitraan',
    'featuresPage.title': 'Keunggulan Kami',
    'featuresPage.subtitle': 'Mengapa SeragamParahita menjadi pilihan utama ratusan perusahaan di Indonesia.',
  },
  EN: {
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.features': 'Advantages',
    'nav.about': 'About Us',
    'nav.partners': 'Partners',
    'nav.testimonials': 'Testimonials',
    'nav.contact': 'Contact Us',
    'hero.badge': 'Best Quality Since 1990',
    'hero.title': 'The Real Uniform & Promotion',
    'hero.desc': 'PT Parahita Prima Sentosa provides high-quality uniform solutions since 1990. We are committed to realizing your professional identity needs.',
    'hero.cta.catalog': 'View Catalog',
    'hero.cta.about': 'About Us',
    'hero.stat.exp': 'Years Experience',
    'hero.stat.clients': 'Corporate Clients',
    'hero.stat.sold': 'Products Sold',
    'partners.title': 'Trusted By Leading Companies',
    'products.badge': 'Product Catalog',
    'products.title': 'Uniform Solutions For Every Sector',
    'products.desc': 'We provide various types of uniforms specifically designed to meet your industry\'s specific needs.',
    'products.detail': 'Product Detail',
    'features.badge': 'Our Advantages',
    'features.title': 'Why Choose SeragamParahita?',
    'features.desc': 'We are committed to providing the highest standards in every stitch to support your business professionalism.',
    'about.badge': 'About Us',
    'about.title': 'PT Parahita Prima Sentosa: Dedication To Quality & Professionalism',
    'about.desc1': 'Established in 1990 under the name PT. Parahita Sanu Setia, we have grown into PT. Parahita Prima Sentosa, a leading garment company serving hundreds of companies across Indonesia.',
    'about.desc2': 'Through the SeragamParahita brand, we integrate decades of experience with modern production technology to produce products that are not only pleasing to the eye but also functional and durable.',
    'about.stat': 'Customer Satisfaction Is Our Priority',
    'about.cta': 'Learn Vision & Mission',
    'testimonials.badge': 'Testimonials',
    'testimonials.title': 'What Our Customers Say?',
    'contact.badge': 'Contact Us',
    'contact.title': 'Ready To Enhance Your Company Image?',
    'contact.desc': 'Consult your uniform needs with our expert team. We are ready to provide the best solutions that fit your budget and business identity.',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Business Email',
    'contact.form.company': 'Company Name',
    'contact.form.message': 'Message / Needs',
    'contact.form.submit': 'Send Message',
    'contact.form.submitting': 'Sending...',
    'contact.form.success.title': 'Message Sent!',
    'contact.form.success.desc': 'Thank you for contacting us. Our team will respond to your message shortly.',
    'contact.form.success.again': 'Send another message',
    'footer.desc': 'Trusted professional uniform solution provider in Indonesia since 1990. We bring premium quality to enhance your business image.',
    'footer.links': 'Quick Links',
    'footer.products': 'Our Products',
    'footer.info': 'Contact Information',
    'footer.copy': 'All Rights Reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms & Conditions',
    'productsPage.title': 'Complete Product Catalog',
    'productsPage.subtitle': 'Explore our various premium uniform collections designed for professionalism and comfort.',
    'productsPage.filter.all': 'All',
    'productsPage.filter.corporate': 'Corporate',
    'productsPage.filter.industrial': 'Industrial',
    'productsPage.filter.medical': 'Medical',
    'productsPage.filter.school': 'School',
    'partnersPage.title': 'Our Partnership Network',
    'partnersPage.subtitle': 'Building long-term relationships with leading companies in Indonesia.',
    'partnersPage.section.corporate': 'Corporate Clients',
    'partnersPage.section.government': 'Government Agencies',
    'partnersPage.cta.title': 'Want to Become Our Partner?',
    'partnersPage.cta.desc': 'Join hundreds of companies that have entrusted their uniform needs to us.',
    'partnersPage.cta.button': 'Contact Partnership Team',
    'featuresPage.title': 'Our Advantages',
    'featuresPage.subtitle': 'Why SeragamParahita is the top choice for hundreds of companies in Indonesia.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('ID');

  const t = (key: string) => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
