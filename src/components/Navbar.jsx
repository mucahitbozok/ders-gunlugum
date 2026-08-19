import React, { useState } from 'react';
import { 
  BookOpenCheck, 
  Search, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  BookOpen, 
  Grid, 
  Info, 
  Mail, 
  PenTool,
  ShieldCheck,
  LayoutDashboard,
  Folder,
  ExternalLink
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  darkMode, 
  setDarkMode, 
  searchQuery, 
  setSearchQuery,
  selectedCategory,
  setSelectedCategory
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Ana Sayfa', icon: BookOpenCheck },
    { id: 'blog', label: 'Blog & Materyaller', icon: BookOpen },
    { id: 'categories', label: 'Kategoriler', icon: Grid },
    { id: 'about', label: 'Hakkımda', icon: Info },
    { id: 'contact', label: 'İletişim', icon: Mail },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header class="sticky top-0 z-40 backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            class="flex items-center space-x-3 cursor-pointer group"
          >
            <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-600 via-brand-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <PenTool class="w-6 h-6" />
            </div>
            <div>
              <span class="text-xl font-bold bg-gradient-to-r from-slate-900 via-brand-700 to-slate-800 dark:from-white dark:via-brand-300 dark:to-slate-200 bg-clip-text text-transparent">
                Ders Günlüğüm
              </span>
              <span class="block text-xs font-medium text-brand-600 dark:text-brand-400">
                Ortaokul Türkçe Öğretmeni Materyal & Blog
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav class="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  class={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-300 shadow-sm border border-brand-200/60 dark:border-brand-800/60'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon class={`w-4 h-4 ${isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Search Bar & Actions */}
          <div class="hidden sm:flex items-center space-x-3">
            
            {/* Drive Link Button */}
            <a
              href="https://drive.google.com/drive/folders/11IbwF3oUzP0pOpY3Rfc5Elp4M__UHzwC?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              class="px-3 py-2 rounded-xl text-xs font-bold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 flex items-center space-x-1.5 transition-all shadow-sm"
              title="Google Drive Klasörü"
            >
              <Folder class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Drive'ım</span>
              <ExternalLink class="w-3 h-3 text-emerald-500 opacity-80" />
            </a>

            {/* Admin Panel Button */}
            <button
              onClick={() => handleNavClick('admin')}
              class={`px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all border ${
                activeTab === 'admin'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
              }`}
              title="Admin Paneli (/admin)"
            >
              <LayoutDashboard class="w-3.5 h-3.5 text-amber-500" />
              <span>Admin Paneli</span>
            </button>

            {/* Search Input */}
            <div class="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== 'blog' && e.target.value.trim() !== '') {
                    setActiveTab('blog');
                  }
                }}
                placeholder="Türkçe materyali ara..."
                class="w-36 lg:w-56 pl-9 pr-4 py-2 text-sm bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white dark:focus:bg-slate-900 transition-all text-slate-800 dark:text-slate-200 placeholder-slate-400"
              />
              <Search class="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  class="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-200 dark:bg-slate-700 rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ×
                </button>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? 'Aydınlık Mod' : 'Karanlık Mod'}
              class="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 transition-colors"
            >
              {darkMode ? <Sun class="w-4 h-4 text-amber-400" /> : <Moon class="w-4 h-4 text-slate-600" />}
            </button>
          </div>

          {/* Mobile Right Icons */}
          <div class="flex items-center space-x-2 md:hidden">
            <button
              onClick={() => handleNavClick('admin')}
              class="px-2.5 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center space-x-1"
            >
              <LayoutDashboard class="w-3.5 h-3.5 text-amber-500" />
              <span>Admin</span>
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              class="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700"
            >
              {darkMode ? <Sun class="w-4 h-4 text-amber-400" /> : <Moon class="w-4 h-4" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              class="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700"
            >
              {mobileMenuOpen ? <X class="w-6 h-6" /> : <Menu class="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div class="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top duration-200">
          {/* Mobile Search */}
          <div class="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'blog') setActiveTab('blog');
              }}
              placeholder="Türkçe materyal veya konu ara..."
              class="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-800 dark:text-slate-200"
            />
            <Search class="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          </div>

          <div class="grid grid-cols-1 gap-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  class={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? 'bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-300 font-semibold'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon class={`w-5 h-5 ${isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <a
              href="https://drive.google.com/drive/folders/11IbwF3oUzP0pOpY3Rfc5Elp4M__UHzwC?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60"
            >
              <Folder class="w-5 h-5" />
              <span>Drive'ım Klasörü</span>
              <ExternalLink class="w-4 h-4 ml-auto opacity-70" />
            </a>

            <button
              onClick={() => handleNavClick('admin')}
              class="flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60"
            >
              <LayoutDashboard class="w-5 h-5" />
              <span>Admin Paneli (/admin)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
