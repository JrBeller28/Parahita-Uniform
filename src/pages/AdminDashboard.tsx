import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  Settings,
  CheckCircle2,
  X,
  Image as ImageIcon,
  Globe,
  Moon,
  Sun,
  Database
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { auth, db } from '../lib/firebase';
import { 
  signInWithPopup, 
  GoogleAuthProvider,
  onAuthStateChanged, 
  signOut 
} from 'firebase/auth';
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  updateDoc, 
  query, 
  orderBy,
  limit,
  getDoc,
  setDoc,
  increment
} from 'firebase/firestore';
import { cn } from '../lib/utils';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const { isDarkMode, toggleDarkMode } = useTheme();

  // Modal states
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [editingPartner, setEditingPartner] = useState<any>(null);

  // Form states
  const [productForm, setProductForm] = useState({
    title: '',
    category: 'Corporate',
    image: '',
    description: '',
    features: [''],
    specs: [{ key: '', value: '' }]
  });
  const [partnerForm, setPartnerForm] = useState({
    name: '',
    logo: '',
    type: 'Corporate'
  });

  // Data states
  const [products, setProducts] = useState<any[]>([]);
  const [partners, setPartners] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [stats, setStats] = useState({ visits: 0, trend: 0 });
  const [isSeeding, setIsSeeding] = useState(false);
  const [settings, setSettings] = useState({ heroBackground: '/seragam.png' });
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      // Check if user is the authorized admin
      const adminEmail = "adjiprasetyo4@gmail.com";
      if (u && u.email === adminEmail) {
        setUser(u);
        fetchData();
      } else if (u) {
        setError('You are not authorized to access this dashboard.');
        signOut(auth);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const fetchData = async () => {
    try {
      const pSnap = await getDocs(collection(db, 'products'));
      setProducts(pSnap.docs.map(d => ({ id: d.id, ...d.data() })));

      const mSnap = await getDocs(collection(db, 'partners'));
      setPartners(mSnap.docs.map(d => ({ id: d.id, ...d.data() })));

      const cSnap = await getDocs(query(collection(db, 'contacts'), orderBy('createdAt', 'desc')));
      setContacts(cSnap.docs.map(d => ({ id: d.id, ...d.data() })));

      // Fetch settings
      const settingsSnap = await getDoc(doc(db, 'settings', 'landingPage'));
      if (settingsSnap.exists()) {
        setSettings(settingsSnap.data() as any);
      }

      // Fetch stats
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      
      const todaySnap = await getDoc(doc(db, 'stats', today));
      const yesterdaySnap = await getDoc(doc(db, 'stats', yesterday));
      
      const todayVisits = todaySnap.exists() ? todaySnap.data().count : 0;
      const yesterdayVisits = yesterdaySnap.exists() ? yesterdaySnap.data().count : 0;
      
      let trend = 0;
      if (yesterdayVisits > 0) {
        trend = ((todayVisits - yesterdayVisits) / yesterdayVisits) * 100;
      } else if (todayVisits > 0) {
        trend = 100;
      }

      setStats({ visits: todayVisits, trend });
    } catch (err) {
      console.error('Error fetching data:', err);
      if (err instanceof Error && err.message.includes('permission')) {
        handleFirestoreError(err, OperationType.LIST, 'multiple collections');
      }
    }
  };

  const handleLogin = async () => {
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error('Login failed:', err);
      setError('Login failed. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const handleSeedData = async () => {
    if (!window.confirm('This will add sample products and partners to your database. Continue?')) return;
    setIsSeeding(true);
    try {
      const sampleProducts = [
        {
          title: 'Seragam Kantor',
          category: 'Corporate',
          image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=800&auto=format&fit=crop',
          description: 'Kemeja, blazer, dan celana formal dengan potongan modern untuk kesan profesional.',
          features: ['Bahan Katun Oxford Premium', 'Jahitan Double Stitch', 'Kerah Kaku & Rapi', 'Tersedia Berbagai Warna'],
          specs: { 'Material': 'Cotton Oxford 100%', 'Fit': 'Regular / Slim Fit', 'Size': 'S - 5XL', 'Custom': 'Bordir Logo Gratis' }
        },
        {
          title: 'Seragam Tambang & Industri',
          category: 'Industrial',
          image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop',
          description: 'Pakaian pelindung kerja (Wearpack) dengan material standar keamanan tinggi untuk area tambang.',
          features: ['Material Tahan Api (Flame Retardant)', 'Reflektor 3M Original', 'Banyak Kantong Fungsional', 'Resleting Besi YKK'],
          specs: { 'Material': 'Drill Cotton Heavy Duty', 'Safety': 'EN ISO 11612', 'Size': 'M - 4XL', 'Reflector': '3M Scotchlite' }
        },
        {
          title: 'Seragam Food & Beverage',
          category: 'School',
          image: 'https://images.unsplash.com/photo-1577214714275-8a4272158543?q=80&w=800&auto=format&fit=crop',
          description: 'Apron, kemeja pelayan, dan seragam koki yang nyaman dan stylish untuk bisnis kuliner.',
          features: ['Bahan Kanvas Marsoto Tebal', 'Strap Adjustable', 'Ring Besi Anti Karat', 'Saku Multifungsi'],
          specs: { 'Material': 'Canvas Marsoto 12oz', 'Strap': 'Adjustable Cross-back', 'Size': 'All Size', 'Style': 'Modern Industrial' }
        },
        {
          title: 'Seragam Medis (Scrubs)',
          category: 'Medical',
          image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop',
          description: 'Seragam medis yang nyaman, antibakteri, dan mudah dicuci untuk tenaga kesehatan.',
          features: ['Bahan Antibakteri', 'Cepat Kering', 'Tidak Mudah Kusut', 'Banyak Saku'],
          specs: { 'Material': 'Rayon Spandex Premium', 'Feature': 'Anti-Microbial', 'Size': 'S - 3XL', 'Colors': '15+ Pilihan Warna' }
        },
        {
          title: 'Seragam Sekolah Premium',
          category: 'School',
          image: 'https://images.unsplash.com/photo-1503917988258-f19772f44613?q=80&w=800&auto=format&fit=crop',
          description: 'Seragam sekolah dengan bahan berkualitas tinggi yang tahan lama dan nyaman dipakai seharian.',
          features: ['Bahan Tetoron Cotton', 'Warna Tidak Cepat Pudar', 'Nyaman & Menyerap Keringat', 'Jahitan Kuat'],
          specs: { 'Material': 'Tetoron Cotton (TC)', 'Type': 'SD, SMP, SMA', 'Size': 'Standard & Custom', 'Quality': 'Grade A' }
        }
      ];

      const samplePartners = [
        { name: 'Pertamina', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Pertamina_logo.svg/1200px-Pertamina_logo.svg.png', type: 'Corporate' },
        { name: 'Telkom Indonesia', logo: 'https://upload.wikimedia.org/wikipedia/id/thumb/c/c4/Telkom_Indonesia_2013.svg/1200px-Telkom_Indonesia_2013.svg.png', type: 'Corporate' },
        { name: 'Bank Mandiri', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/1200px-Bank_Mandiri_logo_2016.svg.png', type: 'Corporate' },
        { name: 'Kementerian Keuangan', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Logo_Kementerian_Keuangan_Republik_Indonesia.svg/1200px-Logo_Kementerian_Keuangan_Republik_Indonesia.svg.png', type: 'Government' },
        { name: 'Kementerian Kesehatan', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Logo_Kementerian_Kesehatan_Republik_Indonesia.svg/1200px-Logo_Kementerian_Kesehatan_Republik_Indonesia.svg.png', type: 'Government' }
      ];

      for (const p of sampleProducts) {
        await addDoc(collection(db, 'products'), { ...p, createdAt: new Date().toISOString() });
      }
      for (const p of samplePartners) {
        await addDoc(collection(db, 'partners'), { ...p, createdAt: new Date().toISOString() });
      }

      alert('Sample data seeded successfully!');
      fetchData();
    } catch (err) {
      console.error('Error seeding data:', err);
      alert('Failed to seed data.');
    } finally {
      setIsSeeding(false);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    try {
      await setDoc(doc(db, 'settings', 'landingPage'), settings);
      alert('Settings saved successfully!');
    } catch (err) {
      console.error('Error saving settings:', err);
      handleFirestoreError(err, OperationType.WRITE, 'settings/landingPage');
    } finally {
      setIsSavingSettings(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await updateDoc(doc(db, 'contacts', id), { status: 'read' });
      fetchData();
    } catch (err) {
      console.error('Error marking as read:', err);
      handleFirestoreError(err, OperationType.UPDATE, `contacts/${id}`);
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await deleteDoc(doc(db, 'contacts', id));
      fetchData();
    } catch (err) {
      console.error('Error deleting contact:', err);
      handleFirestoreError(err, OperationType.DELETE, `contacts/${id}`);
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Convert specs array to Record<string, string>
      const specsRecord: Record<string, string> = {};
      productForm.specs.forEach(s => {
        if (s.key && s.value) specsRecord[s.key] = s.value;
      });

      // Filter out empty features
      const filteredFeatures = productForm.features.filter(f => f.trim() !== '');

      const productData = {
        title: productForm.title,
        category: productForm.category,
        image: productForm.image,
        description: productForm.description,
        features: filteredFeatures,
        specs: specsRecord
      };

      if (editingProduct) {
        await updateDoc(doc(db, 'products', editingProduct.id), {
          ...productData,
          updatedAt: new Date().toISOString()
        }).catch(e => handleFirestoreError(e, OperationType.UPDATE, `products/${editingProduct.id}`));
      } else {
        await addDoc(collection(db, 'products'), {
          ...productData,
          createdAt: new Date().toISOString()
        }).catch(e => handleFirestoreError(e, OperationType.CREATE, 'products'));
      }
      setIsProductModalOpen(false);
      setEditingProduct(null);
      setProductForm({ 
        title: '', 
        category: 'Corporate', 
        image: '', 
        description: '',
        features: [''],
        specs: [{ key: '', value: '' }]
      });
      fetchData();
    } catch (err) {
      console.error('Error saving product:', err);
      setError('Failed to save product. Check permissions.');
    }
  };

  const handleSavePartner = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPartner) {
        await updateDoc(doc(db, 'partners', editingPartner.id), {
          ...partnerForm,
          updatedAt: new Date().toISOString()
        }).catch(e => handleFirestoreError(e, OperationType.UPDATE, `partners/${editingPartner.id}`));
      } else {
        await addDoc(collection(db, 'partners'), {
          ...partnerForm,
          createdAt: new Date().toISOString()
        }).catch(e => handleFirestoreError(e, OperationType.CREATE, 'partners'));
      }
      setIsPartnerModalOpen(false);
      setEditingPartner(null);
      setPartnerForm({ name: '', logo: '', type: 'Corporate' });
      fetchData();
    } catch (err) {
      console.error('Error saving partner:', err);
      setError('Failed to save partner. Check permissions.');
    }
  };

  const openProductModal = (product?: any) => {
    if (product) {
      setEditingProduct(product);
      
      // Convert specs Record to array for editing
      const specsArray = product.specs 
        ? Object.entries(product.specs).map(([key, value]) => ({ key, value: value as string }))
        : [{ key: '', value: '' }];

      setProductForm({
        title: product.title,
        category: product.category,
        image: product.image,
        description: product.description || '',
        features: product.features || [''],
        specs: specsArray.length > 0 ? specsArray : [{ key: '', value: '' }]
      });
    } else {
      setEditingProduct(null);
      setProductForm({ 
        title: '', 
        category: 'Corporate', 
        image: '', 
        description: '',
        features: [''],
        specs: [{ key: '', value: '' }]
      });
    }
    setIsProductModalOpen(true);
  };

  const openPartnerModal = (partner?: any) => {
    if (partner) {
      setEditingPartner(partner);
      setPartnerForm({
        name: partner.name,
        logo: partner.logo,
        type: partner.type
      });
    } else {
      setEditingPartner(null);
      setPartnerForm({ name: '', logo: '', type: 'Corporate' });
    }
    setIsPartnerModalOpen(true);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center dark:bg-slate-950 dark:text-white">Loading...</div>;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl w-full max-w-md border border-slate-100 dark:border-slate-800 relative"
        >
          <Link 
            to="/" 
            className="absolute top-6 right-6 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all text-slate-500"
          >
            <X size={20} />
          </Link>
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 text-brand-600 dark:text-brand-400">
              <LayoutDashboard size={32} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Login</h1>
            <p className="text-slate-500 dark:text-slate-400">Sign in with your admin account</p>
          </div>

          <div className="space-y-4">
            <button 
              onClick={handleLogin}
              className="w-full flex items-center justify-center gap-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white py-3 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              Login with Google
            </button>
            {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}
            <p className="text-xs text-slate-400 text-center mt-4">
              Access restricted to authorized administrators only.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
          <img src="/logo.png" alt="Logo" className="h-8 w-auto mb-2 dark:invert dark:brightness-200" />
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Admin Panel</p>
        </div>
        
        <nav className="flex-grow p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all", activeTab === 'overview' ? "bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800")}
          >
            <TrendingUp size={18} /> Overview
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all", activeTab === 'products' ? "bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800")}
          >
            <Package size={18} /> Products
          </button>
          <button 
            onClick={() => setActiveTab('partners')}
            className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all", activeTab === 'partners' ? "bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800")}
          >
            <Users size={18} /> Partners
          </button>
          <button 
            onClick={() => setActiveTab('contacts')}
            className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all", activeTab === 'contacts' ? "bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800")}
          >
            <MessageSquare size={18} /> Contacts
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all", activeTab === 'settings' ? "bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800")}
          >
            <Settings size={18} /> Settings
          </button>
          
          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <button 
              onClick={toggleDarkMode}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            <Link 
              to="/"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              <Globe size={18} /> Back to Website
            </Link>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
          <button 
            onClick={handleSeedData}
            disabled={isSeeding}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all disabled:opacity-50"
          >
            <Database size={18} /> {isSeeding ? 'Seeding...' : 'Seed Data'}
          </button>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 overflow-y-auto">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="flex justify-between items-start mb-1">
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-bold">Today's Visits</p>
                  <span className={cn(
                    "text-xs font-bold px-2 py-1 rounded-full",
                    stats.trend >= 0 ? "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400" : "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                  )}>
                    {stats.trend >= 0 ? '+' : ''}{stats.trend.toFixed(1)}%
                  </span>
                </div>
                <p className="text-4xl font-bold text-brand-600 dark:text-brand-400">{stats.visits}</p>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <p className="text-slate-500 dark:text-slate-400 text-sm font-bold mb-1">Total Products</p>
                <p className="text-4xl font-bold text-slate-900 dark:text-white">{products.length}</p>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <p className="text-slate-500 dark:text-slate-400 text-sm font-bold mb-1">New Messages</p>
                <p className="text-4xl font-bold text-slate-900 dark:text-white">{contacts.length}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="space-y-8">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Customer Messages</h1>
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Date</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Customer</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Subject</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Message</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {contacts.map((c) => (
                    <tr key={c.id} className={cn(c.status === 'read' ? 'opacity-60' : 'bg-brand-50/30 dark:bg-brand-900/5')}>
                      <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{new Date(c.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{c.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{c.email}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-900 dark:text-white font-medium">{c.subject}</td>
                      <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 max-w-xs truncate">{c.message}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          {c.status !== 'read' && (
                            <button 
                              onClick={() => handleMarkAsRead(c.id)}
                              className="p-2 text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/20 rounded-lg transition-colors"
                              title="Mark as Read"
                            >
                              <CheckCircle2 size={18} />
                            </button>
                          )}
                          <button 
                            onClick={() => handleDeleteContact(c.id)}
                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Delete Message"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-8 max-w-2xl">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Landing Page Settings</h1>
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <form onSubmit={handleSaveSettings} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Hero Background Image URL</label>
                  <input 
                    type="text" 
                    value={settings.heroBackground}
                    onChange={(e) => setSettings({ ...settings, heroBackground: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                    placeholder="https://images.unsplash.com/..."
                  />
                  <p className="mt-2 text-xs text-slate-500">This image will be used as the background for the Hero section on the landing page.</p>
                </div>

                {settings.heroBackground && (
                  <div className="relative h-48 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800">
                    <img 
                      src={settings.heroBackground} 
                      alt="Hero Preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => (e.currentTarget.src = 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1000')}
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <span className="bg-white/90 dark:bg-slate-900/90 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Preview</span>
                    </div>
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={isSavingSettings}
                  className="w-full bg-brand-600 text-white py-4 rounded-xl font-bold hover:bg-brand-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Save size={18} />
                  {isSavingSettings ? 'Saving...' : 'Save Settings'}
                </button>
              </form>
            </div>
          </div>
        )}
        {activeTab === 'products' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Manage Products</h1>
              <button 
                onClick={() => openProductModal()}
                className="bg-brand-600 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-brand-700 transition-all"
              >
                <Plus size={18} /> Add Product
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <div key={p.id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm group">
                  <div className="relative h-40 rounded-xl overflow-hidden mb-4">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button 
                        onClick={() => openProductModal(p)}
                        className="p-2 bg-white rounded-full text-brand-600 hover:bg-brand-50"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => {
                          if (window.confirm('Delete this product?')) {
                            deleteDoc(doc(db, 'products', p.id))
                              .then(() => fetchData())
                              .catch(e => handleFirestoreError(e, OperationType.DELETE, `products/${p.id}`));
                          }
                        }}
                        className="p-2 bg-white rounded-full text-red-500 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white">{p.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">{p.category}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'partners' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Manage Partners</h1>
              <button 
                onClick={() => openPartnerModal()}
                className="bg-brand-600 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-brand-700 transition-all"
              >
                <Plus size={18} /> Add Partner
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {partners.map((m) => (
                <div key={m.id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm group relative">
                  <div className="h-20 flex items-center justify-center mb-2">
                    <img src={m.logo} alt={m.name} className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all dark:invert dark:brightness-200" referrerPolicy="no-referrer" />
                  </div>
                  <p className="text-center text-xs font-bold text-slate-900 dark:text-white truncate">{m.name}</p>
                  
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => openPartnerModal(m)}
                      className="p-1.5 bg-white rounded-full text-brand-600 hover:bg-brand-50 shadow-sm"
                    >
                      <Edit size={12} />
                    </button>
                    <button 
                      onClick={() => {
                        if (window.confirm('Delete this partner?')) {
                          deleteDoc(doc(db, 'partners', m.id))
                            .then(() => fetchData())
                            .catch(e => handleFirestoreError(e, OperationType.DELETE, `partners/${m.id}`));
                        }
                      }}
                      className="p-1.5 bg-white rounded-full text-red-500 hover:bg-red-50 shadow-sm"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Product Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100 dark:border-slate-800"
          >
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button 
                onClick={() => setIsProductModalOpen(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all text-slate-500"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSaveProduct} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Product Title</label>
                  <input 
                    required
                    type="text" 
                    value={productForm.title}
                    onChange={(e) => setProductForm({...productForm, title: e.target.value})}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-900 outline-none"
                    placeholder="e.g. High Quality Uniform"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Category</label>
                  <select 
                    required
                    value={productForm.category}
                    onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-900 outline-none"
                  >
                    <option value="Corporate">Corporate</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Medical">Medical</option>
                    <option value="School">School</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Image URL</label>
                <div className="flex gap-2">
                  <input 
                    required
                    type="url" 
                    value={productForm.image}
                    onChange={(e) => setProductForm({...productForm, image: e.target.value})}
                    className="flex-grow px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-900 outline-none"
                    placeholder="https://images.unsplash.com/..."
                  />
                  {productForm.image && (
                    <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 flex-shrink-0">
                      <img src={productForm.image} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Description</label>
                <textarea 
                  value={productForm.description}
                  onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-900 outline-none h-20 resize-none"
                  placeholder="Product details..."
                />
              </div>

              {/* Features Section */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Fitur Utama</label>
                  <button 
                    type="button"
                    onClick={() => setProductForm({...productForm, features: [...productForm.features, '']})}
                    className="text-xs font-bold text-brand-600 dark:text-brand-400 flex items-center gap-1 hover:underline"
                  >
                    <Plus size={14} /> Tambah Fitur
                  </button>
                </div>
                <div className="space-y-2">
                  {productForm.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <input 
                        type="text"
                        value={feature}
                        onChange={(e) => {
                          const newFeatures = [...productForm.features];
                          newFeatures[index] = e.target.value;
                          setProductForm({...productForm, features: newFeatures});
                        }}
                        className="flex-grow px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-900 outline-none text-sm"
                        placeholder="e.g. Bahan Katun Oxford Premium"
                      />
                      {productForm.features.length > 1 && (
                        <button 
                          type="button"
                          onClick={() => {
                            const newFeatures = productForm.features.filter((_, i) => i !== index);
                            setProductForm({...productForm, features: newFeatures});
                          }}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Specs Section */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Spesifikasi</label>
                  <button 
                    type="button"
                    onClick={() => setProductForm({...productForm, specs: [...productForm.specs, { key: '', value: '' }]})}
                    className="text-xs font-bold text-brand-600 dark:text-brand-400 flex items-center gap-1 hover:underline"
                  >
                    <Plus size={14} /> Tambah Spek
                  </button>
                </div>
                <div className="space-y-2">
                  {productForm.specs.map((spec, index) => (
                    <div key={index} className="flex gap-2">
                      <input 
                        type="text"
                        value={spec.key}
                        onChange={(e) => {
                          const newSpecs = [...productForm.specs];
                          newSpecs[index].key = e.target.value;
                          setProductForm({...productForm, specs: newSpecs});
                        }}
                        className="w-1/3 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-900 outline-none text-sm"
                        placeholder="Label (e.g. Material)"
                      />
                      <input 
                        type="text"
                        value={spec.value}
                        onChange={(e) => {
                          const newSpecs = [...productForm.specs];
                          newSpecs[index].value = e.target.value;
                          setProductForm({...productForm, specs: newSpecs});
                        }}
                        className="flex-grow px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-900 outline-none text-sm"
                        placeholder="Nilai (e.g. Cotton 100%)"
                      />
                      {productForm.specs.length > 1 && (
                        <button 
                          type="button"
                          onClick={() => {
                            const newSpecs = productForm.specs.filter((_, i) => i !== index);
                            setProductForm({...productForm, specs: newSpecs});
                          }}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex gap-3 sticky bottom-0 bg-white dark:bg-slate-900 py-2 border-t border-slate-100 dark:border-slate-800">
                <button 
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="flex-grow py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-grow bg-brand-600 text-white py-3 rounded-xl font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-200 dark:shadow-none"
                >
                  {editingProduct ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Partner Modal */}
      {isPartnerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100 dark:border-slate-800"
          >
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {editingPartner ? 'Edit Partner' : 'Add New Partner'}
              </h2>
              <button 
                onClick={() => setIsPartnerModalOpen(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all text-slate-500"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSavePartner} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Partner Name</label>
                <input 
                  required
                  type="text" 
                  value={partnerForm.name}
                  onChange={(e) => setPartnerForm({...partnerForm, name: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-900 outline-none"
                  placeholder="e.g. PT. Maju Bersama"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Type</label>
                <select 
                  required
                  value={partnerForm.type}
                  onChange={(e) => setPartnerForm({...partnerForm, type: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-900 outline-none"
                >
                  <option value="Corporate">Corporate</option>
                  <option value="Government">Government</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Logo URL</label>
                <div className="flex gap-2">
                  <input 
                    required
                    type="url" 
                    value={partnerForm.logo}
                    onChange={(e) => setPartnerForm({...partnerForm, logo: e.target.value})}
                    className="flex-grow px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-900 outline-none"
                    placeholder="https://logo.clearbit.com/..."
                  />
                  {partnerForm.logo && (
                    <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 flex-shrink-0 bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                      <img src={partnerForm.logo} alt="Preview" className="max-w-[80%] max-h-[80%] object-contain" referrerPolicy="no-referrer" />
                    </div>
                  )}
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsPartnerModalOpen(false)}
                  className="flex-grow py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-grow bg-brand-600 text-white py-3 rounded-xl font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-200 dark:shadow-none"
                >
                  {editingPartner ? 'Save Changes' : 'Add Partner'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
