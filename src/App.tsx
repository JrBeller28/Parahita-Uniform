import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import PartnersPage from './pages/PartnersPage';
import AboutPage from './pages/AboutPage';
import FeaturesPage from './pages/FeaturesPage';
import AdminDashboard from './pages/AdminDashboard';
import ScrollToTop from './components/ScrollToTop';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { db } from './lib/firebase';
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';

function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  useEffect(() => {
    const trackVisit = async () => {
      const today = new Date().toISOString().split('T')[0];
      const visitRef = doc(db, 'stats', today);
      
      try {
        await setDoc(visitRef, {
          count: increment(1),
          date: today
        }, { merge: true });
      } catch (error) {
        console.error("Error tracking visit:", error);
      }
    };

    trackVisit();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 selection:bg-brand-100 selection:text-brand-900 transition-colors duration-300">
      <ScrollToTop />
      {!isAdminPage && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/produk" element={<ProductsPage />} />
        <Route path="/mitra" element={<PartnersPage />} />
        <Route path="/keunggulan" element={<FeaturesPage />} />
        <Route path="/tentang" element={<AboutPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      {!isAdminPage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <AppContent />
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}
