import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronRight, X, CheckCircle2, ShoppingBag, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { cn } from '../lib/utils';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

interface Product {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  features?: string[];
  specs?: Record<string, string>;
}

export default function ProductsPage() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = [
    { id: 'All', label: t('productsPage.filter.all') },
    { id: 'Corporate', label: t('productsPage.filter.corporate') },
    { id: 'Industrial', label: t('productsPage.filter.industrial') },
    { id: 'Medical', label: t('productsPage.filter.medical') },
    { id: 'School', label: t('productsPage.filter.school') },
  ];

  const filteredProducts = products.filter(p => {
    const matchesFilter = filter === 'All' || p.category === filter;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                         p.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="pt-24 min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative bg-brand-900 py-20 text-white overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/11.png"
            alt="Products Background"
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-900/80" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            {t('productsPage.title')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-brand-100 text-lg max-w-2xl mx-auto"
          >
            {t('productsPage.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-12 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={cn(
                    "px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap border",
                    filter === cat.id 
                      ? "bg-brand-600 text-white border-brand-600 shadow-lg shadow-brand-100 dark:shadow-none" 
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-brand-300 hover:text-brand-600"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text"
                placeholder="Cari produk..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-900 outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-slate-100 dark:border-slate-800 flex flex-col h-full"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-brand-700 dark:text-brand-300 text-[10px] font-bold rounded-full shadow-sm uppercase tracking-wider">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                      {product.description}
                    </p>
                    <button 
                      onClick={() => setSelectedProduct(product)}
                      className="flex items-center justify-between w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-brand-600 dark:text-brand-400 font-bold text-sm hover:bg-brand-50 dark:hover:bg-brand-900 transition-all"
                    >
                      <span>{t('products.detail')}</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                <Search size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Produk tidak ditemukan</h3>
              <p className="text-slate-500 dark:text-slate-400">Coba gunakan kata kunci lain atau reset filter.</p>
              <button 
                onClick={() => {setFilter('All'); setSearch('');}}
                className="mt-6 text-brand-600 dark:text-brand-400 font-bold hover:underline"
              >
                Reset Semua
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 1.1, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-full text-slate-900 dark:text-white hover:bg-brand-600 hover:text-white transition-all shadow-sm"
              >
                <X size={20} />
              </button>

              {/* Image Section */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-1.5 bg-brand-600 text-white text-[10px] font-bold rounded-full shadow-lg uppercase tracking-widest">
                    {selectedProduct.category}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto custom-scrollbar">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{selectedProduct.title}</h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{selectedProduct.description}</p>
                </div>

                {selectedProduct.features && (
                  <div className="mb-8">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-brand-600 dark:text-brand-400" />
                      Fitur Utama
                    </h4>
                    <ul className="grid grid-cols-1 gap-3">
                      {selectedProduct.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm">
                          <div className="w-1.5 h-1.5 bg-brand-400 rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedProduct.specs && (
                  <div className="mb-10">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Info size={16} className="text-brand-600 dark:text-brand-400" />
                      Spesifikasi
                    </h4>
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 space-y-3">
                      {Object.entries(selectedProduct.specs).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center text-sm border-b border-slate-200 dark:border-slate-700 pb-2 last:border-0 last:pb-0">
                          <span className="text-slate-500 dark:text-slate-400 font-medium">{key}</span>
                          <span className="text-slate-900 dark:text-white font-bold">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="/#kontak"
                    onClick={() => setSelectedProduct(null)}
                    className="flex-grow bg-brand-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-700 transition-all text-center shadow-lg shadow-brand-100 dark:shadow-none flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={18} />
                    Pesan Sekarang
                  </a>
                  <button 
                    onClick={() => setSelectedProduct(null)}
                    className="px-8 py-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Butuh Seragam Custom?</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-10 text-lg">
            Kami melayani pemesanan seragam dengan desain khusus sesuai kebutuhan perusahaan Anda. Konsultasikan sekarang secara gratis.
          </p>
          <a 
            href="/#kontak"
            className="inline-flex items-center gap-2 bg-brand-600 text-white px-10 py-4 rounded-full font-bold hover:bg-brand-700 transition-all shadow-xl shadow-brand-100 dark:shadow-none"
          >
            Mulai Konsultasi Gratis
            <ChevronRight size={20} />
          </a>
        </div>
      </section>
    </div>
  );
}
