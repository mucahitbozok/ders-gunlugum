import React from 'react';
import { 
  Bot, 
  FileText, 
  Laptop, 
  Users, 
  Award, 
  BookOpen, 
  ArrowRight,
  PenTool,
  Download
} from 'lucide-react';
import { CATEGORIES as DEFAULT_CATEGORIES } from '../data/mockPosts';

const ICON_MAP = {
  BookOpen: BookOpen,
  FileText: FileText,
  PenTool: PenTool,
  Download: Download,
  Laptop: Laptop,
  Bot: Bot,
  Users: Users,
  Award: Award
};

export default function CategoriesPage({ categories = DEFAULT_CATEGORIES, setSelectedCategory, onNavigateBlog }) {
  const handleSelect = (slug) => {
    setSelectedCategory(slug);
    onNavigateBlog();
  };

  return (
    <div class="space-y-10 pb-16">
      
      {/* Header Banner */}
      <div class="space-y-3 border-b border-slate-200 dark:border-slate-800 pb-6 text-center max-w-3xl mx-auto">
        <span class="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">Türkçe Dersi Çalışma Alanları</span>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Tüm Eğitim Kategorileri
        </h1>
        <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          İhtiyacınıza uygun kategoriye tıklayarak ilgili Türkçe ders yazılarını ve çalışma yapraklarını hemen inceleyin.
        </p>
      </div>

      {/* Categories Cards */}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat) => {
          const IconComponent = ICON_MAP[cat.iconName] || BookOpen;

          return (
            <div
              key={cat.id}
              onClick={() => handleSelect(cat.slug)}
              class="group p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-xl hover:border-brand-400 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div class="space-y-6">
                
                {/* Top bar with icon */}
                <div class="flex items-center justify-between">
                  <div class={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${cat.color || 'from-brand-500 to-teal-600'} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    <IconComponent class="w-7 h-7" />
                  </div>

                  <span class="px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
                    {cat.count || 0} Materyal
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 class="text-xl font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

              </div>

              {/* Card Footer CTA */}
              <div class="pt-6 mt-6 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                <span class="text-xs text-slate-400">Hedef Kitle: Ortaokul (5-8. Sınıf)</span>
                <div class="flex items-center space-x-1 text-xs font-bold text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-transform">
                  <span>Yazıları Listele</span>
                  <ArrowRight class="w-4 h-4" />
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
