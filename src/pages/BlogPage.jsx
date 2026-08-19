import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Grid as GridIcon, 
  List as ListIcon, 
  X, 
  SlidersHorizontal,
  BookOpen,
  Folder,
  Sparkles
} from 'lucide-react';
import { CATEGORIES as MOCK_CATEGORIES } from '../data/mockPosts';
import PostCard from '../components/PostCard';

// Standard 26-Letter English Alphabet (Without ş, ü, ı, ö, ç, ğ)
const ENGLISH_ALPHABET = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 
  'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 
  'U', 'V', 'W', 'X', 'Y', 'Z'
];

// Normalize Turkish diacritics to standard English letters for A-Z indexing
const normalizeFirstChar = (str) => {
  if (!str) return '';
  const firstChar = str.trim().charAt(0).toUpperCase();
  const charMap = {
    'Ç': 'C', 'Ğ': 'G', 'İ': 'I', 'I': 'I', 'ı': 'I', 'Ö': 'O', 'Ş': 'S', 'Ü': 'U'
  };
  return charMap[firstChar] || firstChar;
};

export default function BlogPage({ 
  posts = [], 
  categories = MOCK_CATEGORIES,
  onSelectPost, 
  selectedCategory = 'all', 
  setSelectedCategory,
  searchQuery = '',
  setSearchQuery
}) {
  const [layoutMode, setLayoutMode] = useState('grid'); // 'grid' | 'list'
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'readTime'
  const [selectedLetter, setSelectedLetter] = useState('all'); // 'all' | 'A'..'Z'

  const activeCategoriesList = categories.length > 0 ? categories : MOCK_CATEGORIES;

  // Filter posts by Category, Search Query, and English Alphabet Letter
  let filteredPosts = posts.filter((post) => {
    // Category match check
    const matchesCategory = 
      selectedCategory === 'all' || 
      post.categorySlug === selectedCategory ||
      post.category === selectedCategory ||
      (post.category && post.category.toLowerCase().trim() === selectedCategory.toLowerCase().trim());
    
    // Search match check
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || (
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query) ||
      (post.author && post.author.name.toLowerCase().includes(query)) ||
      (post.tags && post.tags.some(t => t.toLowerCase().includes(query)))
    );

    // English Alphabet Letter match check
    const matchesLetter = 
      selectedLetter === 'all' || 
      normalizeFirstChar(post.title) === selectedLetter;

    return matchesCategory && matchesSearch && matchesLetter;
  });

  // Sort posts
  if (sortBy === 'readTime') {
    filteredPosts = [...filteredPosts].sort((a, b) => {
      const timeA = parseInt(a.readTime) || 0;
      const timeB = parseInt(b.readTime) || 0;
      return timeB - timeA;
    });
  }

  // Active Category Object
  const currentCategoryObj = activeCategoriesList.find(
    c => c.slug === selectedCategory || c.name === selectedCategory
  );

  return (
    <div class="space-y-8 pb-16">
      
      {/* Header Banner */}
      <div class="space-y-3 border-b border-slate-200 dark:border-slate-800 pb-6">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Blog Yazıları & Türkçe Ders Materyalleri
        </h1>
        <p class="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
          Ortaokul Türkçe öğretmenimiz Bozok Öğretmen tarafından hazırlanan çalışma kağıtları, LGS paragraf taktikleri ve sınıf içi etkinlikler.
        </p>
      </div>

      {/* Category Pills Filter Bar */}
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <label class="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center space-x-1.5">
            <Filter class="w-3.5 h-3.5 text-brand-500" />
            <span>Kategoriye Göre Filtrele</span>
          </label>

          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              class="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center space-x-1"
            >
              <span>Filtreyi Kaldır</span>
              <X class="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Horizontal Category Buttons */}
        <div class="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            class={`px-4 py-2.5 text-xs font-bold rounded-2xl transition-all whitespace-nowrap flex items-center space-x-2 ${
              selectedCategory === 'all'
                ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20 scale-105'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60'
            }`}
          >
            <span>Tüm İçerikler</span>
            <span class={`px-2 py-0.5 rounded-full text-[10px] ${
              selectedCategory === 'all' ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
            }`}>
              {posts.length}
            </span>
          </button>

          {activeCategoriesList.map((cat) => {
            const isActive = selectedCategory === cat.slug || selectedCategory === cat.name;
            const categoryPostCount = posts.filter(
              p => p.categorySlug === cat.slug || p.category === cat.name
            ).length;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                class={`px-4 py-2.5 text-xs font-bold rounded-2xl transition-all whitespace-nowrap flex items-center space-x-2 ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20 scale-105'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60'
                }`}
              >
                <span>{cat.name}</span>
                <span class={`px-2 py-0.5 rounded-full text-[10px] ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}>
                  {categoryPostCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ENGLISH ALPHABET INDEX BAR (A-Z LINKED) */}
      <div class="p-4 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-3 shadow-sm">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider flex items-center space-x-2">
            <Sparkles class="w-4 h-4 text-amber-500" />
            <span>A-Z İngiliz Alfabesi İçerik İndeksi (Linklendirilebilir)</span>
          </span>

          {selectedLetter !== 'all' && (
            <button
              onClick={() => setSelectedLetter('all')}
              class="text-xs text-brand-600 dark:text-brand-400 font-semibold hover:underline flex items-center space-x-1"
            >
              <span>Harf Filtresini Sıfırla ("{selectedLetter}")</span>
              <X class="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* 26-Letter English Alphabet Link Buttons */}
        <div class="flex flex-wrap items-center gap-1.5 pt-1">
          <button
            onClick={() => setSelectedLetter('all')}
            class={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
              selectedLetter === 'all'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200'
            }`}
          >
            Tüm Harfler
          </button>

          {ENGLISH_ALPHABET.map((letter) => {
            const hasPosts = posts.some(p => normalizeFirstChar(p.title) === letter);
            const isSelected = selectedLetter === letter;

            return (
              <button
                key={letter}
                disabled={!hasPosts}
                onClick={() => setSelectedLetter(letter)}
                class={`w-8 h-8 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center ${
                  isSelected
                    ? 'bg-brand-600 text-white shadow-lg scale-110 ring-2 ring-brand-300'
                    : hasPosts
                      ? 'bg-brand-50 dark:bg-slate-700/90 text-brand-700 dark:text-brand-300 hover:bg-brand-600 hover:text-white border border-brand-200/80 dark:border-slate-600 cursor-pointer shadow-sm'
                      : 'bg-slate-100/60 dark:bg-slate-900/40 text-slate-300 dark:text-slate-600 cursor-not-allowed border border-transparent'
                }`}
                title={hasPosts ? `"${letter}" harfi ile başlayan yazıları listele` : `"${letter}" harfi ile başlayan yazı bulunamadı`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Filter Status & View Controls Bar */}
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        
        {/* Left Status */}
        <div class="flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
          <span class="font-semibold text-slate-900 dark:text-white">
            {filteredPosts.length} materyal listeleniyor
          </span>

          {selectedCategory !== 'all' && (
            <span class="inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 font-semibold">
              <Folder class="w-3.5 h-3.5" />
              <span>Kategori: {currentCategoryObj?.name || selectedCategory}</span>
              <button 
                onClick={() => setSelectedCategory('all')} 
                class="hover:text-brand-900 dark:hover:text-white ml-1"
                title="Kategori filtresini kaldır"
              >
                <X class="w-3.5 h-3.5" />
              </button>
            </span>
          )}

          {selectedLetter !== 'all' && (
            <span class="inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 font-semibold">
              <span>Harf: "{selectedLetter}"</span>
              <button 
                onClick={() => setSelectedLetter('all')} 
                class="hover:text-purple-900 dark:hover:text-white ml-1"
                title="Harf filtresini kaldır"
              >
                <X class="w-3.5 h-3.5" />
              </button>
            </span>
          )}

          {searchQuery && (
            <span class="inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 font-semibold">
              <span>Arama: "{searchQuery}"</span>
              <button 
                onClick={() => setSearchQuery('')} 
                class="hover:text-amber-900 dark:hover:text-white ml-1"
                title="Aramayı temizle"
              >
                <X class="w-3.5 h-3.5" />
              </button>
            </span>
          )}
        </div>

        {/* Right Controls */}
        <div class="flex items-center space-x-3 self-end sm:self-auto">
          
          {/* Category Select Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            class="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
          >
            <option value="all">Tüm Kategoriler ({posts.length})</option>
            {activeCategoriesList.map((c) => (
              <option key={c.id} value={c.slug}>{c.name}</option>
            ))}
          </select>

          {/* Sort Dropdown */}
          <div class="flex items-center space-x-1 text-xs">
            <SlidersHorizontal class="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              class="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
            >
              <option value="newest">En Yeniler</option>
              <option value="readTime">Okuma Süresine Göre</option>
            </select>
          </div>

          {/* Grid / List Mode */}
          <div class="flex items-center bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setLayoutMode('grid')}
              class={`p-1.5 rounded-lg transition-colors ${
                layoutMode === 'grid'
                  ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Izgara Görünümü"
            >
              <GridIcon class="w-4 h-4" />
            </button>
            <button
              onClick={() => setLayoutMode('list')}
              class={`p-1.5 rounded-lg transition-colors ${
                layoutMode === 'list'
                  ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Liste Görünümü"
            >
              <ListIcon class="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* Posts Grid / List */}
      {filteredPosts.length > 0 ? (
        <div class={`grid gap-6 ${
          layoutMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredPosts.map((post) => (
            <PostCard 
              key={post.id} 
              post={post} 
              onSelectPost={onSelectPost} 
              layout={layoutMode} 
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div class="py-16 text-center bg-white dark:bg-slate-800/50 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 space-y-4 shadow-sm">
          <div class="w-16 h-16 mx-auto rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400">
            <BookOpen class="w-8 h-8" />
          </div>
          <h3 class="text-lg font-bold text-slate-900 dark:text-white">Aranan kriterlere uygun yazı bulunamadı</h3>
          <p class="text-xs text-slate-500 max-w-sm mx-auto">
            Filtrelerinizi değiştirmeyi, farklı bir harf seçmeyi veya aramayı temizlemeyi deneyebilirsiniz.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedLetter('all');
              setSearchQuery('');
            }}
            class="px-4 py-2 bg-brand-600 text-white text-xs font-bold rounded-xl hover:bg-brand-500 transition-colors shadow-md"
          >
            Tüm Filtreleri Temizle
          </button>
        </div>
      )}

    </div>
  );
}
