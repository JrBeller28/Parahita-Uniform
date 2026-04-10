import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

type FormData = {
  name: string;
  email: string;
  company: string;
  message: string;
};

export default function Contact() {
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await addDoc(collection(db, 'contacts'), {
        ...data,
        createdAt: new Date().toISOString()
      });
      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <section id="kontak" className="py-32 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-xs font-black uppercase tracking-[0.2em] mb-8">
              {t('contact.badge')}
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-10 leading-tight">
              {t('contact.title')}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-xl mb-12 leading-relaxed">
              {t('contact.desc')}
            </p>

            <div className="space-y-10">
              {[
                { icon: <MapPin size={28} />, title: 'Alamat Kantor', desc: 'JL. Raya Serpong KM.7 Kawasan Multiguna, Blk. B No.10A, Pakualam, Kec. Serpong Utara, Kabupaten Tangerang, Banten 15320' },
                { icon: <Phone size={28} />, title: 'Telepon / WhatsApp', desc: '(021) 5399261' },
                { icon: <Mail size={28} />, title: 'Email', desc: 'info@seragamparahita.com' }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-6 group">
                  <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-2xl shadow-soft flex items-center justify-center text-brand-600 dark:text-brand-400 flex-shrink-0 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300 border border-slate-100 dark:border-slate-800">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-black text-slate-900 dark:text-white text-lg mb-1">{item.title}</div>
                    <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card p-10 md:p-16 rounded-[3rem] shadow-2xl shadow-brand-500/5"
          >
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-8 shadow-inner">
                  <CheckCircle size={56} />
                </div>
                <h4 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{t('contact.form.success.title')}</h4>
                <p className="text-slate-600 dark:text-slate-400 text-lg">{t('contact.form.success.desc')}</p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-10 text-brand-600 dark:text-brand-400 font-black uppercase tracking-widest text-sm hover:underline"
                >
                  {t('contact.form.success.again')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest ml-1">{t('contact.form.name')}</label>
                    <input
                      {...register('name', { required: 'Nama wajib diisi' })}
                      className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all text-lg"
                      placeholder="Contoh: John Doe"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1 font-bold">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest ml-1">{t('contact.form.email')}</label>
                    <input
                      {...register('email', { 
                        required: 'Email wajib diisi',
                        pattern: { value: /^\S+@\S+$/i, message: 'Email tidak valid' }
                      })}
                      className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all text-lg"
                      placeholder="john@perusahaan.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1 font-bold">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest ml-1">{t('contact.form.company')}</label>
                  <input
                    {...register('company', { required: 'Nama perusahaan wajib diisi' })}
                    className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all text-lg"
                    placeholder="PT Maju Bersama"
                  />
                  {errors.company && <p className="text-red-500 text-xs mt-1 font-bold">{errors.company.message}</p>}
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest ml-1">{t('contact.form.message')}</label>
                  <textarea
                    {...register('message', { required: 'Pesan wajib diisi' })}
                    rows={4}
                    className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all resize-none text-lg"
                    placeholder="Jelaskan kebutuhan seragam Anda..."
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1 font-bold">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-600 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-brand-700 transition-all shadow-xl shadow-brand-500/20 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed text-sm"
                >
                  {isSubmitting ? t('contact.form.submitting') : (
                    <>
                      {t('contact.form.submit')} <Send size={20} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
