import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  PenTool, 
  Download, 
  Laptop, 
  FileText, 
  BookOpenCheck,
  CheckCircle2,
  Zap,
  Award,
  Folder,
  ExternalLink
} from 'lucide-react';
import { CATEGORIES } from '../data/mockPosts';
import PostCard from '../components/PostCard';

const ICON_MAP = {
  BookOpen: BookOpen,
  FileText: FileText,
  PenTool: PenTool,
  Download: Download,
  Laptop: Laptop
};

export default function HomePage({ 
  posts, 
  onSelectPost, 
  onNavigateBlog, 
  setSelectedCategory 
}) {
  const featuredPosts = posts.filter((p) => p.isFeatured);
  const latestPosts = posts.slice(0, 4);

  const handleCategorySelect = (slug) => {
    setSelectedCategory(slug);
    onNavigateBlog();
  };

  return (
    <div class="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section class="relative overflow-hidden pt-8 pb-12 md:py-20 rounded-3xl bg-gradient-to-br from-brand-900 via-slate-900 to-teal-950 text-white shadow-2xl">
        {/* Background Glows */}
        <div class="absolute -top-24 -left-24 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
        <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

        <div class="relative max-w-5xl mx-auto px-6 text-center space-y-6">
          
          {/* Badge */}
          <div class="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-brand-200">
            <Sparkles class="w-3.5 h-3.5 text-amber-400" />
            <span>Ortaokul Türkçe Öğretmeni Materyal & Uygulama Günlüğü</span>
          </div>

          {/* Main Hero Title */}
          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Ders Günlüğüm <br class="hidden sm:inline" />
            <span class="bg-gradient-to-r from-brand-300 via-teal-200 to-amber-300 bg-clip-text text-transparent">
              Türkçe Ders Materyalleri
            </span> & Etkileşimli Uygulamalar
          </h1>

          {/* Subtitle / Description */}
          <p class="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            5, 6, 7 ve 8. sınıf Türkçe dersleri için hazırladığım ücretsiz çalışma kağıtları, LGS paragraf stratejileri, fiilimsiler bulmacaları ve etkileşimli Web 2.0 uygulamaları.
          </p>

          {/* Action Buttons */}
          <div class="pt-4 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigateBlog()}
              class="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-brand-500 hover:bg-brand-400 text-white font-bold text-base shadow-lg shadow-brand-500/30 flex items-center justify-center space-x-2 transition-all hover:scale-105"
            >
              <BookOpen class="w-5 h-5" />
              <span>Tüm Materyalleri İncele</span>
              <ArrowRight class="w-4 h-4 ml-1" />
            </button>

            <a
              href="https://drive.google.com/drive/folders/11IbwF3oUzP0pOpY3Rfc5Elp4M__UHzwC?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-2 transition-all hover:scale-105"
            >
              <Folder class="w-5 h-5 text-amber-300 fill-amber-300/20" />
              <span>Drive'ım</span>
              <ExternalLink class="w-4 h-4 ml-1 opacity-80" />
            </a>

            <button
              onClick={() => handleCategorySelect('ders-materyalleri')}
              class="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-base backdrop-blur-md border border-white/20 flex items-center justify-center space-x-2 transition-all"
            >
              <Download class="w-5 h-5 text-emerald-400" />
              <span>Çalışma Kağıtları</span>
            </button>
          </div>

          {/* Quick Stats Badges */}
          <div class="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-white/10">
            <div class="p-3 rounded-xl bg-white/5 backdrop-blur-sm">
              <span class="block text-2xl font-bold text-brand-300">5-8. Sınıf</span>
              <span class="text-xs text-slate-400">Ortaokul Türkçe</span>
            </div>
            <div class="p-3 rounded-xl bg-white/5 backdrop-blur-sm">
              <span class="block text-2xl font-bold text-teal-300">LGS 2026</span>
              <span class="text-xs text-slate-400">Paragraf & Mantık</span>
            </div>
            <div class="p-3 rounded-xl bg-white/5 backdrop-blur-sm">
              <span class="block text-2xl font-bold text-amber-300">PDF & Word</span>
              <span class="text-xs text-slate-400">İndirilebilir Şablonlar</span>
            </div>
            <div class="p-3 rounded-xl bg-white/5 backdrop-blur-sm">
              <span class="block text-2xl font-bold text-purple-300">Web 2.0</span>
              <span class="text-xs text-slate-400">Wordwall & Oyunlar</span>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Posts Section */}
      <section class="space-y-6">
        <div class="flex items-end justify-between">
          <div>
            <span class="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">Seçkin Materyaller</span>
            <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
              Öne Çıkan Türkçe İçerikleri
            </h2>
          </div>

          <button
            onClick={() => onNavigateBlog()}
            class="hidden sm:flex items-center space-x-1 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline"
          >
            <span>Tümünü Gör</span>
            <ArrowRight class="w-4 h-4" />
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredPosts.map((post) => (
            <PostCard key={post.id} post={post} onSelectPost={onSelectPost} />
          ))}
        </div>
      </section>

      {/* Categories Grid Section */}
      <section class="space-y-6 pt-4">
        <div class="text-center max-w-2xl mx-auto space-y-2">
          <span class="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">Kategoriler</span>
          <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Türkçe Dersi Çalışma Alanları
          </h2>
          <p class="text-sm text-slate-600 dark:text-slate-400">
            Okuma-anlama, dil bilgisi, yaratıcı yazma ve dijital Türkçe uygulamaları başlıkları altında gezinin.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => {
            const IconComponent = ICON_MAP[cat.iconName] || BookOpen;
            return (
              <div
                key={cat.id}
                onClick={() => handleCategorySelect(cat.slug)}
                class="group p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 hover:border-brand-400 dark:hover:border-brand-500 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <div class={`w-12 h-12 rounded-xl bg-gradient-to-tr ${cat.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                      <IconComponent class="w-6 h-6" />
                    </div>
                    <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                      {cat.count} Materyal
                    </span>
                  </div>

                  <div>
                    <h3 class="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {cat.name}
                    </h3>
                    <p class="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div class="pt-4 mt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center text-xs font-semibold text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-transform">
                  <span>Materyalleri Gör</span>
                  <ArrowRight class="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Latest Posts Section */}
      <section class="space-y-6 pt-4">
        <div class="flex items-end justify-between">
          <div>
            <span class="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">En Güncel Eklemeler</span>
            <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
              Son Paylaşılan Ders Günlükleri
            </h2>
          </div>

          <button
            onClick={() => onNavigateBlog()}
            class="flex items-center space-x-1 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline"
          >
            <span>Tüm Paylaşımlar ({posts.length})</span>
            <ArrowRight class="w-4 h-4" />
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestPosts.map((post) => (
            <PostCard key={post.id} post={post} onSelectPost={onSelectPost} />
          ))}
        </div>
      </section>

      {/* Teacher Banner */}
      <section class="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white relative overflow-hidden border border-slate-800">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div class="lg:col-span-2 space-y-4">
            <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Sınıfınızda Doğrudan Kullanabileceğiniz Etkileşimli Şablonlar
            </h2>
            <p class="text-sm sm:text-base text-slate-300 leading-relaxed">
              Tüm materyaller fotokopiye uygun siyah-beyaz veya akıllı tahtada göstermeye uygun renkli versiyonlarıyla sunulmaktadır. Türkçe öğretmenlerinin ders yükünü hafifletmek için tasarlandı.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row lg:flex-col gap-3">
            <div class="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center space-x-3">
              <Zap class="w-6 h-6 text-amber-400 shrink-0" />
              <div>
                <h4 class="text-xs font-bold text-white">Hazır Fotokopi Formatı</h4>
                <p class="text-[11px] text-slate-400">A4 boyutunda çıktıya hazır PDF'ler</p>
              </div>
            </div>

            <div class="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center space-x-3">
              <BookOpenCheck class="w-6 h-6 text-teal-400 shrink-0" />
              <div>
                <h4 class="text-xs font-bold text-white">MEB Türkçe Müfredatı</h4>
                <p class="text-[11px] text-slate-400">Kazanım odaklı etkinlik kağıtları</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
