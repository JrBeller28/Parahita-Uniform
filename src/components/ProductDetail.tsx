import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, ShoppingCart, MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const productDetails: Record<string, any> = {
  'corporate': {
    title: 'Seragam Kantor (Corporate)',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1200&auto=format&fit=crop',
    description: 'Kemeja, blazer, dan celana formal dengan potongan modern untuk kesan profesional.',
    features: [
      'Bahan premium (Wool, Silk, Cotton)',
      'Potongan slim-fit & regular-fit',
      'Custom bordir logo perusahaan',
      'Tersedia berbagai pilihan warna'
    ],
    specifications: {
      'Material': 'Wool Blend / Premium Cotton',
      'Warna': 'Custom (Tersedia 50+ pilihan)',
      'Ukuran': 'S, M, L, XL, XXL, Custom',
      'Min Order': '24 Pcs'
    }
  },
  'industrial': {
    title: 'Seragam Tambang & Industri',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop',
    description: 'Pakaian pelindung kerja (Wearpack) dengan material standar keamanan tinggi untuk area tambang.',
    features: [
      'Bahan tahan api (Flame Retardant)',
      'Reflektor 3M Scotchlite',
      'Jahitan double-stitch kuat',
      'Kantong multifungsi'
    ],
    specifications: {
      'Material': 'Drill / Canvas / Nomex',
      'Warna': 'High-Visibility Colors',
      'Ukuran': 'S - 5XL',
      'Min Order': '50 Pcs'
    }
  },
  'fb': {
    title: 'Seragam Food & Beverage',
    image: 'https://images.unsplash.com/photo-1577214714275-8a4272158543?q=80&w=1200&auto=format&fit=crop',
    description: 'Apron, kemeja pelayan, dan seragam koki yang nyaman dan stylish untuk bisnis kuliner.',
    features: [
      'Bahan anti-noda & mudah dicuci',
      'Desain ergonomis untuk mobilitas',
      'Material breathable',
      'Custom apron & topi koki'
    ],
    specifications: {
      'Material': 'Premium Drill / Linen',
      'Warna': 'Custom Branding',
      'Ukuran': 'All Size / Custom',
      'Min Order': '24 Pcs'
    }
  },
  'promotion': {
    title: 'Seragam Event & Media',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop',
    description: 'Kaos event, rompi media, dan seragam promosi untuk meningkatkan visibilitas brand Anda.',
    features: [
      'Sablon & bordir berkualitas tinggi',
      'Bahan nyaman untuk outdoor',
      'Desain eye-catching',
      'Pengerjaan cepat'
    ],
    specifications: {
      'Material': 'Cotton Combed / Lacoste',
      'Warna': 'Full Color',
      'Ukuran': 'S - XXL',
      'Min Order': '100 Pcs'
    }
  },
  'automotive': {
    title: 'Seragam Otomotif',
    image: 'https://images.unsplash.com/photo-1530046339160-ce3e5b0c7a2f?q=80&w=1200&auto=format&fit=crop',
    description: 'Seragam teknisi dan mekanik dengan bahan yang kuat dan tahan terhadap noda minyak.',
    features: [
      'Bahan tahan gesekan',
      'Desain fungsional untuk mekanik',
      'Material tidak mudah kusut',
      'Custom logo bengkel'
    ],
    specifications: {
      'Material': 'American Drill / Japan Drill',
      'Warna': 'Custom',
      'Ukuran': 'S - XXXL',
      'Min Order': '50 Pcs'
    }
  },
  'merchandise': {
    title: 'Merchandise & Souvenir',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop',
    description: 'Berbagai pilihan souvenir dan merchandise custom untuk kebutuhan promosi perusahaan.',
    features: [
      'Kualitas cetak premium',
      'Berbagai pilihan item',
      'Packaging eksklusif',
      'Custom branding'
    ],
    specifications: {
      'Material': 'Various',
      'Warna': 'Full Color',
      'Ukuran': 'Custom',
      'Min Order': '100 Pcs'
    }
  }
};

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const product = productDetails[id || 'corporate'];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Produk Tidak Ditemukan</h1>
          <Link to="/" className="text-brand-600 font-bold hover:underline">Kembali ke Beranda</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-600 font-bold mb-12 transition-colors">
          <ArrowLeft size={20} />
          {t('hero.cta.catalog')}
        </Link>

        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-slate-900 mb-6">{product.title}</h1>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="mb-10">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Fitur Utama</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {product.features.map((feature: string, i: number) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-brand-100 rounded-full flex items-center justify-center text-brand-600">
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="text-slate-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Spesifikasi</h3>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="grid grid-cols-2 gap-y-4">
                  {Object.entries(product.specifications).map(([key, value]: [string, any]) => (
                    <React.Fragment key={key}>
                      <div className="text-slate-500 font-bold text-sm uppercase tracking-wider">{key}</div>
                      <div className="text-slate-900 font-bold">{value}</div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="#kontak"
                className="bg-brand-600 text-white px-8 py-4 rounded-full font-bold hover:bg-brand-700 transition-all flex items-center gap-2 shadow-xl shadow-brand-100 group"
              >
                <MessageSquare size={18} />
                Konsultasi Sekarang
              </a>
              <button className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-full font-bold hover:bg-slate-50 transition-all flex items-center gap-2">
                <ShoppingCart size={18} />
                Pesan Sampel
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
