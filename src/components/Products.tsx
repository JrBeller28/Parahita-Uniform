import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, X, CheckCircle2, ShoppingBag, Info, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { db } from '../lib/firebase';
import { collection, getDocs, query, limit } from 'firebase/firestore';

interface Product {
  id?: string;
  title: string;
  category: string;
  image: string;
  description: string;
  features?: string[];
  specs?: Record<string, string>;
}

export default function Products() {
  const { t } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, 'products'), limit(6));
        const querySnapshot = await getDocs(q);
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

  if (loading) {
    return (
      <div className="py-24 flex justify-center items-center bg-slate-50 dark:bg-slate-900/50">
        <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <section id="produk" className="py-32 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-xs font-black uppercase tracking-[0.2em] mb-6">
              {t('products.badge')}
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
              {t('products.title')}
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:max-w-md"
          >
            <p className="text-slate-600 dark:text-slate-400 text-xl leading-relaxed">
              {t('products.desc')}
            </p>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-500"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-brand-700 dark:text-brand-300 text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                    {product.category}
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <button 
                    onClick={() => setSelectedProduct(product)}
                    className="w-full bg-white text-brand-600 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:bg-brand-600 hover:text-white transition-all"
                  >
                    {t('products.detail')}
                  </button>
                </div>
              </div>
              
              <div className="p-10">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {product.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2 text-lg">
                  {product.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

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
                      href="#kontak"
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
      </div>
    </section>
  );
}
