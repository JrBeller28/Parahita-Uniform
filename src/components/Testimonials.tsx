import React from 'react';
import { motion } from 'motion/react';
import { Quote, Star, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const testimonials = [
  {
    name: 'Mustopa Alfiansyah',
    role: 'Local Guide',
    content: 'Ramah ramah orangnya, senang bekerja sama dgn Parahita. Thanks',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=mustopa'
  },
  {
    name: 'Budi Santoso',
    role: 'HR Manager, PT Maju Jaya',
    content: 'Kualitas seragam dari SeragamParahita sangat luar biasa. Bahan yang digunakan sangat nyaman untuk staf kami yang bekerja di lapangan maupun di kantor.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=budi'
  },
  {
    name: 'Sari Wijaya',
    role: 'Procurement Specialist, Global Tech',
    content: 'Proses pemesanan sangat mudah dan tim desainer mereka sangat membantu dalam mewujudkan konsep branding kami.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=sari'
  }
];

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <section id="testimoni" className="py-32 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-xs font-black uppercase tracking-[0.2em] mb-6">
              {t('testimonials.badge')}
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8">
              {t('testimonials.title')}
            </h2>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group glass-card p-10 rounded-[2.5rem] relative hover:bg-white dark:hover:bg-slate-900 transition-all duration-500"
            >
              <div className="absolute top-10 right-10 text-brand-100 dark:text-brand-900/20 group-hover:text-brand-600/10 transition-colors duration-500">
                <Quote size={80} strokeWidth={1} />
              </div>
              
              <div className="relative z-10">
                <div className="flex gap-1 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < testimonial.rating ? "fill-orange-400 text-orange-400" : "text-slate-200 dark:text-slate-800"}
                    />
                  ))}
                </div>

                <p className="text-slate-600 dark:text-slate-400 text-xl italic mb-10 leading-relaxed">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-5">
                  <div className="relative">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-white dark:border-slate-800 shadow-lg"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-brand-600 rounded-full flex items-center justify-center text-white border-2 border-white dark:border-slate-900">
                      <CheckCircle2 size={12} />
                    </div>
                  </div>
                  <div>
                    <div className="font-black text-slate-900 dark:text-white text-lg">{testimonial.name}</div>
                    <div className="text-sm font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
