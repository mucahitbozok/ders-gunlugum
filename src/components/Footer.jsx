import React, { useState } from 'react';
import { 
  PenTool, 
  Heart, 
  Send, 
  CheckCircle2, 
  BookOpen, 
  Grid, 
  Info, 
  Mail
} from 'lucide-react';
import { CATEGORIES } from '../data/mockPosts';

export default function Footer({ setActiveTab, setSelectedCategory }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handleCategoryClick = (catSlug) => {
    setSelectedCategory(catSlug);
    setActiveTab('blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer class="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info (2 cols) */}
          <div class="lg:col-span-2 space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-teal-600 flex items-center justify-center text-white shadow-lg">
                <PenTool class="w-6 h-6" />
              </div>
              <span class="text-xl font-bold text-white tracking-tight">Ders Günlüğüm</span>
            </div>
            <p class="text-sm text-slate-400 leading-relaxed max-w-sm">
              Ortaokul Türkçe öğretmenleri için hazırladığım ücretsiz ders materyalleri, LGS çalışma kağıtları, paragraf taktikleri ve Web 2.0 Türkçe uygulamaları.
            </p>
            <div class="pt-2 flex items-center space-x-3 text-xs text-slate-400">
              <span class="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-slate-800 text-brand-400 border border-slate-700">
                <span>🇹🇷 Ortaokul Türkçe Öğretmeni Paylaşım Platformu</span>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div class="space-y-4">
            <h4 class="text-sm font-semibold text-white uppercase tracking-wider">Hızlı Bağlantılar</h4>
            <ul class="space-y-2.5 text-sm">
              <li>
                <button onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} class="hover:text-white transition-colors">Ana Sayfa</button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('blog'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} class="hover:text-white transition-colors">Blog & Materyaller</button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('categories'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} class="hover:text-white transition-colors">Kategoriler</button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} class="hover:text-white transition-colors">Hakkımda</button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} class="hover:text-white transition-colors">İletişim</button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div class="space-y-4">
            <h4 class="text-sm font-semibold text-white uppercase tracking-wider">Türkçe Alanları</h4>
            <ul class="space-y-2.5 text-sm">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button 
                    onClick={() => handleCategoryClick(cat.slug)}
                    class="hover:text-brand-400 transition-colors text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div class="space-y-4">
            <h4 class="text-sm font-semibold text-white uppercase tracking-wider">Haftalık Materyal Bülteni</h4>
            <p class="text-xs text-slate-400">
              Yeni hazırladığım çalışma kağıtları ve LGS Türkçe şablonları e-postanıza gelsin.
            </p>
            {subscribed ? (
              <div class="p-3 bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs rounded-xl flex items-center space-x-2">
                <CheckCircle2 class="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Materyal bültenine başarıyla katıldınız!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} class="space-y-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="eposta@okul.meb.k12.tr"
                  class="w-full px-3.5 py-2.5 text-sm bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-white placeholder-slate-500"
                />
                <button
                  type="submit"
                  class="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-medium text-sm transition-colors shadow-md shadow-brand-600/20"
                >
                  <Send class="w-3.5 h-3.5" />
                  <span>Abone Ol</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div class="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 space-y-4 md:space-y-0">
          <p>© 2026 Ders Günlüğüm - Bozok Öğretmen. Tüm hakları saklıdır.</p>
          <div class="flex items-center space-x-6">
            <span>Ortaokul Türkçe Ders Materyalleri</span>
            <span>MEB Müfredat Uyumlu</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
