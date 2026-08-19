import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Grid, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Search, 
  BookOpen, 
  CheckCircle2, 
  X, 
  Sparkles,
  ArrowRight,
  PenTool,
  Image as ImageIcon,
  Clock,
  User,
  Download,
  AlertTriangle,
  RotateCcw,
  Link as LinkIcon
} from 'lucide-react';

const PRESET_IMAGES = [
  { name: 'Kitap & Okuma', url: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Dil Bilgisi & Defter', url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Yaratıcı Yazma', url: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Dijital / Oyun', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Pano & Etkinlik', url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1200&auto=format&fit=crop' }
];

export default function AdminPage({ 
  posts, 
  categories, 
  onAddPost, 
  onUpdatePost, 
  onDeletePost, 
  onAddCategory, 
  onDeleteCategory,
  onNavigateHome,
  onResetData
}) {
  const [adminTab, setAdminTab] = useState('dashboard'); // 'dashboard' | 'posts' | 'categories'
  const [searchQuery, setSearchQuery] = useState('');
  
  // Post Modal state
  const [showPostModal, setShowPostModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  
  // Post Form fields
  const [postTitle, setPostTitle] = useState('');
  const [postCategory, setPostCategory] = useState(categories[0]?.name || '');
  const [postCoverImage, setPostCoverImage] = useState(PRESET_IMAGES[0].url);
  const [postAuthor, setPostAuthor] = useState('Bozok Öğretmen');
  const [postReadTime, setPostReadTime] = useState('5 dk okuma');
  const [postExcerpt, setPostExcerpt] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postAttachmentName, setPostAttachmentName] = useState('');

  // Category Form fields
  const [catName, setCatName] = useState('');
  const [catDescription, setCatDescription] = useState('');
  const [catIcon, setCatIcon] = useState('BookOpen');

  // Notification toast
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleInsertLink = () => {
    const url = prompt('Eklenecek web adresi (URL):', 'https://');
    if (!url || url === 'https://') return;

    const text = prompt('Bağlantı üzerinde görünecek metin (örneğin: Ders Materyalini İndir):', 'Buraya tıklayın');
    const linkText = text ? text : url;

    const linkHtml = `<a href="${url}" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
    setPostContent((prev) => prev + (prev.length > 0 ? '\n' : '') + linkHtml);
  };

  // Open modal for NEW post
  const handleOpenNewPost = () => {
    setEditingPost(null);
    setPostTitle('');
    setPostCategory(categories[0]?.name || 'Okuma & Anlama');
    setPostCoverImage(PRESET_IMAGES[0].url);
    setPostAuthor('Bozok Öğretmen');
    setPostReadTime('5 dk okuma');
    setPostExcerpt('');
    setPostContent('');
    setPostAttachmentName('');
    setShowPostModal(true);
  };

  // Open modal for EDIT post
  const handleOpenEditPost = (post) => {
    setEditingPost(post);
    setPostTitle(post.title);
    setPostCategory(post.category);
    setPostCoverImage(post.coverImage);
    setPostAuthor(post.author?.name || 'Bozok Öğretmen');
    setPostReadTime(post.readTime || '5 dk okuma');
    setPostExcerpt(post.excerpt || '');
    setPostContent(post.content || '');
    setPostAttachmentName(post.attachments?.[0]?.name || '');
    setShowPostModal(true);
  };

  // Submit Post (Create or Update)
  const handleSavePost = (e) => {
    e.preventDefault();
    if (!postTitle.trim() || !postContent.trim()) {
      alert('Lütfen başlık ve içerik alanlarını doldurun.');
      return;
    }

    const categoryObj = categories.find(c => c.name === postCategory) || categories[0];

    const postData = {
      title: postTitle,
      excerpt: postExcerpt || postTitle,
      coverImage: postCoverImage,
      category: postCategory,
      categorySlug: categoryObj?.slug || 'okuma-anlama',
      date: new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
      readTime: postReadTime,
      author: {
        name: postAuthor,
        title: 'Ortaokul Türkçe Öğretmeni',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
        bio: '14 yıllık ortaokul Türkçe öğretmenliği deneyimi ile LGS Türkçe hazırlık materyalleri geliştirmektedir.'
      },
      content: postContent.includes('<p>') || postContent.includes('<h2>')
        ? postContent 
        : `<p>${postContent.replace(/\n/g, '</p><p>')}</p>`,
      attachments: postAttachmentName.trim() ? [
        { name: postAttachmentName, size: '1.5 MB', type: 'pdf' }
      ] : [],
      tags: ['Türkçe', postCategory],
      commentsCount: editingPost ? editingPost.commentsCount : 0,
      comments: editingPost ? editingPost.comments : []
    };

    if (editingPost) {
      onUpdatePost(editingPost.id, postData);
      showToast('Blog yazısı başarıyla güncellendi!');
    } else {
      onAddPost(postData);
      showToast('Yeni blog yazısı başarıyla yayınlandı!');
    }

    setShowPostModal(false);
  };

  // Delete Post confirmation
  const handleDeletePostConfirm = (postId, title) => {
    if (window.confirm(`"${title}" başlıklı yazıyı silmek istediğinizden emin misiniz?`)) {
      onDeletePost(postId);
      showToast('Blog yazısı silindi.');
    }
  };

  // Save Category
  const handleSaveCategory = (e) => {
    e.preventDefault();
    if (!catName.trim()) return;

    const slug = catName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const newCat = {
      id: `cat_${Date.now()}`,
      name: catName,
      slug: slug,
      description: catDescription || 'Türkçe dersi materyal alanı',
      iconName: catIcon,
      color: 'from-brand-500 to-indigo-600',
      count: 0
    };

    onAddCategory(newCat);
    setCatName('');
    setCatDescription('');
    showToast(`"${catName}" kategorisi başarıyla eklendi!`);
  };

  // Filter posts for admin list
  const filteredPosts = posts.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div class="space-y-8 pb-16">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div class="fixed top-6 right-6 z-50 bg-brand-600 text-white text-sm font-semibold px-5 py-3.5 rounded-2xl shadow-2xl flex items-center space-x-3 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 class="w-5 h-5 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Header Banner */}
      <div class="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div class="space-y-2">
          <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold border border-brand-500/30">
            <Sparkles class="w-3.5 h-3.5" />
            <span>Ders Günlüğüm Yönetim Paneli</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Öğretmen İçerik & Materyal Yönetimi
          </h1>
          <p class="text-xs sm:text-sm text-slate-400">
            Blog yazılarınızı ve kategorilerinizi teknik bilgi gerektirmeden kolayca yönetin.
          </p>
        </div>

        <div class="flex items-center space-x-3">
          <button
            onClick={onNavigateHome}
            class="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center space-x-2 transition-colors"
          >
            <Eye class="w-4 h-4 text-brand-400" />
            <span>Siteyi Görüntüle</span>
          </button>

          <button
            onClick={handleOpenNewPost}
            class="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-lg shadow-brand-600/30 flex items-center space-x-2 transition-all hover:scale-105"
          >
            <Plus class="w-4 h-4" />
            <span>Yeni Yazı Ekle</span>
          </button>
        </div>
      </div>

      {/* Admin Tab Switcher */}
      <div class="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setAdminTab('dashboard')}
          class={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            adminTab === 'dashboard'
              ? 'bg-brand-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
          }`}
        >
          <LayoutDashboard class="w-4 h-4" />
          <span>Dashboard (Genel Bakış)</span>
        </button>

        <button
          onClick={() => setAdminTab('posts')}
          class={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            adminTab === 'posts'
              ? 'bg-brand-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
          }`}
        >
          <FileText class="w-4 h-4" />
          <span>Blog Yazıları ({posts.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('categories')}
          class={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            adminTab === 'categories'
              ? 'bg-brand-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
          }`}
        >
          <Grid class="w-4 h-4" />
          <span>Kategoriler ({categories.length})</span>
        </button>
      </div>

      {/* TAB 1: DASHBOARD */}
      {adminTab === 'dashboard' && (
        <div class="space-y-8 animate-in fade-in duration-200">
          
          {/* Stat Cards Grid */}
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-500 uppercase">Toplam Blog Yazısı</span>
                <div class="w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                  <FileText class="w-5 h-5" />
                </div>
              </div>
              <span class="text-3xl font-extrabold text-slate-900 dark:text-white block">{posts.length}</span>
              <span class="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Aktif yayında</span>
            </div>

            <div class="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-500 uppercase">Toplam Kategori</span>
                <div class="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                  <Grid class="w-5 h-5" />
                </div>
              </div>
              <span class="text-3xl font-extrabold text-slate-900 dark:text-white block">{categories.length}</span>
              <span class="text-[11px] text-teal-600 dark:text-teal-400 font-medium">Türkçe ders alanları</span>
            </div>

            <div class="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-500 uppercase">İndirilebilir Materyaller</span>
                <div class="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Download class="w-5 h-5" />
                </div>
              </div>
              <span class="text-3xl font-extrabold text-slate-900 dark:text-white block">
                {posts.reduce((acc, p) => acc + (p.attachments?.length || 0), 0)}
              </span>
              <span class="text-[11px] text-emerald-600 font-medium">PDF & Word şablonları</span>
            </div>

            <div class="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-500 uppercase">Yazar</span>
                <div class="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <User class="w-5 h-5" />
                </div>
              </div>
              <span class="text-lg font-bold text-slate-900 dark:text-white block">Bozok Öğretmen</span>
              <span class="text-[11px] text-slate-400">Türkçe Öğretmeni</span>
            </div>
          </div>

          {/* Quick Actions & Recent Posts */}
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Quick Actions Card (1 col) */}
            <div class="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 space-y-4 shadow-sm">
              <h3 class="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <Sparkles class="w-5 h-5 text-amber-500" />
                <span>Hızlı Yönetim Kısayolları</span>
              </h3>

              <div class="space-y-3">
                <button
                  onClick={handleOpenNewPost}
                  class="w-full p-3.5 bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/60 dark:hover:bg-brand-900/60 border border-brand-200 dark:border-brand-800 rounded-2xl text-left flex items-center justify-between transition-colors"
                >
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 rounded-xl bg-brand-600 text-white flex items-center justify-center">
                      <Plus class="w-4 h-4" />
                    </div>
                    <div>
                      <span class="block text-xs font-bold text-slate-900 dark:text-white">Yeni Blog Yazısı Kaleme Al</span>
                      <span class="text-[10px] text-slate-500">Ders materyali veya taktik paylaş</span>
                    </div>
                  </div>
                  <ArrowRight class="w-4 h-4 text-brand-600" />
                </button>

                <button
                  onClick={() => setAdminTab('categories')}
                  class="w-full p-3.5 bg-teal-50 hover:bg-teal-100 dark:bg-teal-950/60 dark:hover:bg-teal-900/60 border border-teal-200 dark:border-teal-800 rounded-2xl text-left flex items-center justify-between transition-colors"
                >
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center">
                      <Grid class="w-4 h-4" />
                    </div>
                    <div>
                      <span class="block text-xs font-bold text-slate-900 dark:text-white">Yeni Kategori Ekle</span>
                      <span class="text-[10px] text-slate-500">Yeni ders konusu tanımla</span>
                    </div>
                  </div>
                  <ArrowRight class="w-4 h-4 text-teal-600" />
                </button>

                {onResetData && (
                  <button
                    onClick={() => {
                      if (window.confirm('Örnek verileri varsayılana sıfırlamak istediğinizden emin misiniz?')) {
                        onResetData();
                        showToast('Veriler başarıyla varsayılana sıfırlandı.');
                      }
                    }}
                    class="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-left flex items-center space-x-2 text-xs text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    <RotateCcw class="w-3.5 h-3.5 text-slate-400" />
                    <span>Örnek Verileri Sıfırla</span>
                  </button>
                )}
              </div>
            </div>

            {/* Recent Posts Table (2 cols) */}
            <div class="lg:col-span-2 p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 space-y-4 shadow-sm">
              <div class="flex items-center justify-between">
                <h3 class="text-base font-bold text-slate-900 dark:text-white">Son Eklenen Blog Yazıları</h3>
                <button 
                  onClick={() => setAdminTab('posts')}
                  class="text-xs text-brand-600 dark:text-brand-400 font-semibold hover:underline"
                >
                  Tümünü Yönet ({posts.length})
                </button>
              </div>

              <div class="overflow-x-auto">
                <table class="w-full text-left text-xs">
                  <thead>
                    <tr class="border-b border-slate-200 dark:border-slate-700 text-slate-400 uppercase text-[10px]">
                      <th class="py-2.5 px-3">Görsel & Başlık</th>
                      <th class="py-2.5 px-3">Kategori</th>
                      <th class="py-2.5 px-3">Tarih</th>
                      <th class="py-2.5 px-3 text-right">İşlem</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100 dark:divide-slate-700/50">
                    {posts.slice(0, 4).map((post) => (
                      <tr key={post.id} class="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                        <td class="py-3 px-3">
                          <div class="flex items-center space-x-3">
                            <img src={post.coverImage} alt="" class="w-10 h-10 rounded-lg object-cover shrink-0" />
                            <span class="font-bold text-slate-900 dark:text-white line-clamp-1 max-w-xs">{post.title}</span>
                          </div>
                        </td>
                        <td class="py-3 px-3">
                          <span class="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium">
                            {post.category}
                          </span>
                        </td>
                        <td class="py-3 px-3 text-slate-400">{post.date}</td>
                        <td class="py-3 px-3 text-right">
                          <button
                            onClick={() => handleOpenEditPost(post)}
                            class="p-1.5 rounded-lg text-slate-500 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                            title="Düzenle"
                          >
                            <Edit3 class="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: POSTS MANAGEMENT */}
      {adminTab === 'posts' && (
        <div class="space-y-6 animate-in fade-in duration-200">
          
          {/* Top Controls: Search & New Button */}
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div class="relative flex-1 max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Yazı başlığı veya kategori ara..."
                class="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <Search class="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>

            <button
              onClick={handleOpenNewPost}
              class="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-1.5 shadow-md"
            >
              <Plus class="w-4 h-4" />
              <span>Yeni Blog Yazısı Ekle</span>
            </button>
          </div>

          {/* Posts Table */}
          <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 overflow-hidden shadow-sm">
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead>
                  <tr class="bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px]">
                    <th class="py-3.5 px-4">Görsel</th>
                    <th class="py-3.5 px-4">Başlık & Özet</th>
                    <th class="py-3.5 px-4">Kategori</th>
                    <th class="py-3.5 px-4">Yazar</th>
                    <th class="py-3.5 px-4">Tarih</th>
                    <th class="py-3.5 px-4 text-right">İşlemler</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-700/60">
                  {filteredPosts.map((post) => (
                    <tr key={post.id} class="hover:bg-slate-50/80 dark:hover:bg-slate-700/30 transition-colors">
                      <td class="py-3.5 px-4">
                        <img src={post.coverImage} alt="" class="w-14 h-14 rounded-xl object-cover border border-slate-200 dark:border-slate-700" />
                      </td>
                      <td class="py-3.5 px-4">
                        <span class="font-bold text-slate-900 dark:text-white block text-sm mb-0.5 line-clamp-1">{post.title}</span>
                        <span class="text-slate-500 dark:text-slate-400 line-clamp-1 text-[11px]">{post.excerpt}</span>
                      </td>
                      <td class="py-3.5 px-4 whitespace-nowrap">
                        <span class="px-2.5 py-1 rounded-lg bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-semibold border border-brand-200/50 dark:border-brand-800/50">
                          {post.category}
                        </span>
                      </td>
                      <td class="py-3.5 px-4 whitespace-nowrap text-slate-700 dark:text-slate-300 font-medium">
                        {post.author?.name || 'Bozok Öğretmen'}
                      </td>
                      <td class="py-3.5 px-4 whitespace-nowrap text-slate-400">{post.date}</td>
                      <td class="py-3.5 px-4 whitespace-nowrap text-right space-x-1">
                        <button
                          onClick={() => handleOpenEditPost(post)}
                          class="p-2 rounded-xl text-brand-600 hover:bg-brand-50 dark:hover:bg-slate-700 border border-transparent hover:border-brand-200 transition-colors"
                          title="Düzenle"
                        >
                          <Edit3 class="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePostConfirm(post.id, post.title)}
                          class="p-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-700 border border-transparent hover:border-rose-200 transition-colors"
                          title="Sil"
                        >
                          <Trash2 class="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: CATEGORIES MANAGEMENT */}
      {adminTab === 'categories' && (
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-200">
          
          {/* New Category Form (1 col) */}
          <div class="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 space-y-4 shadow-sm">
            <h3 class="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Plus class="w-5 h-5 text-brand-500" />
              <span>Yeni Kategori Ekle</span>
            </h3>

            <form onSubmit={handleSaveCategory} class="space-y-4 text-xs">
              <div class="space-y-1.5">
                <label class="font-semibold text-slate-700 dark:text-slate-300">Kategori Adı *</label>
                <input
                  type="text"
                  required
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  placeholder="Örn: Tiyatro & Şiir"
                  class="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div class="space-y-1.5">
                <label class="font-semibold text-slate-700 dark:text-slate-300">Kısa Açıklama</label>
                <textarea
                  rows={3}
                  value={catDescription}
                  onChange={(e) => setCatDescription(e.target.value)}
                  placeholder="Bu kategoride ne tür Türkçe materyalleri bulunuyor?"
                  class="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div class="space-y-1.5">
                <label class="font-semibold text-slate-700 dark:text-slate-300">İkon Seçimi</label>
                <select
                  value={catIcon}
                  onChange={(e) => setCatIcon(e.target.value)}
                  class="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="BookOpen">BookOpen (Kitap)</option>
                  <option value="FileText">FileText (Metin/Kağıt)</option>
                  <option value="PenTool">PenTool (Kalem/Yazma)</option>
                  <option value="Download">Download (Materyal)</option>
                  <option value="Laptop">Laptop (Web 2.0)</option>
                </select>
              </div>

              <button
                type="submit"
                class="w-full py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl shadow-md transition-colors"
              >
                Kategoriyi Kaydet
              </button>
            </form>
          </div>

          {/* Categories List (2 cols) */}
          <div class="lg:col-span-2 p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 space-y-4 shadow-sm">
            <h3 class="text-base font-bold text-slate-900 dark:text-white">Mevcut Kategoriler ({categories.length})</h3>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead>
                  <tr class="border-b border-slate-200 dark:border-slate-700 text-slate-400 uppercase text-[10px]">
                    <th class="py-3 px-3">Kategori Adı</th>
                    <th class="py-3 px-3">Açıklama</th>
                    <th class="py-3 px-3 text-right">İşlem</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-700/60">
                  {categories.map((cat) => (
                    <tr key={cat.id} class="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                      <td class="py-3 px-3 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                        {cat.name}
                      </td>
                      <td class="py-3 px-3 text-slate-500 dark:text-slate-400 text-[11px]">
                        {cat.description}
                      </td>
                      <td class="py-3 px-3 text-right whitespace-nowrap">
                        <button
                          onClick={() => {
                            if (window.confirm(`"${cat.name}" kategorisini silmek istediğinizden emin misiniz?`)) {
                              onDeleteCategory(cat.id);
                              showToast('Kategori silindi.');
                            }
                          }}
                          class="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-700"
                          title="Sil"
                        >
                          <Trash2 class="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* POST CREATE / EDIT MODAL */}
      {showPostModal && (
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
          <div class="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 my-auto max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div class="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <h3 class="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <PenTool class="w-5 h-5 text-brand-500" />
                <span>{editingPost ? 'Blog Yazısını Düzenle' : 'Yeni Blog Yazısı Ekle'}</span>
              </h3>

              <button 
                onClick={() => setShowPostModal(false)}
                class="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X class="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSavePost} class="overflow-y-auto p-6 space-y-5 text-xs">
              
              {/* Title */}
              <div class="space-y-1.5">
                <label class="font-bold text-slate-800 dark:text-slate-200">Yazı Başlığı *</label>
                <input
                  type="text"
                  required
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="Örn: 8. Sınıf Cümlenin Ögeleri Etkileşimli Çalışma Kağıdı"
                  class="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 font-semibold"
                />
              </div>

              {/* Category & Author & ReadTime Grid */}
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div class="space-y-1.5">
                  <label class="font-bold text-slate-800 dark:text-slate-200">Kategori *</label>
                  <select
                    value={postCategory}
                    onChange={(e) => setPostCategory(e.target.value)}
                    class="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div class="space-y-1.5">
                  <label class="font-bold text-slate-800 dark:text-slate-200">Yazar *</label>
                  <input
                    type="text"
                    required
                    value={postAuthor}
                    onChange={(e) => setPostAuthor(e.target.value)}
                    class="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div class="space-y-1.5">
                  <label class="font-bold text-slate-800 dark:text-slate-200">Okuma Süresi</label>
                  <input
                    type="text"
                    value={postReadTime}
                    onChange={(e) => setPostReadTime(e.target.value)}
                    placeholder="5 dk okuma"
                    class="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              {/* Cover Image & Presets */}
              <div class="space-y-2">
                <label class="font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                  <span>Kapak Görseli URL</span>
                  <span class="text-[10px] text-slate-400">Veya aşağıdaki hazır görsellerden seçin:</span>
                </label>
                <input
                  type="text"
                  value={postCoverImage}
                  onChange={(e) => setPostCoverImage(e.target.value)}
                  placeholder="https://..."
                  class="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />

                {/* Preset image buttons */}
                <div class="flex flex-wrap gap-2 pt-1">
                  {PRESET_IMAGES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setPostCoverImage(preset.url)}
                      class="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-brand-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg text-[10px] text-slate-600 dark:text-slate-300 font-medium transition-colors"
                    >
                      📷 {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Excerpt */}
              <div class="space-y-1.5">
                <label class="font-bold text-slate-800 dark:text-slate-200">Kısa Özet (Yazı Kartında Görünür)</label>
                <textarea
                  rows={2}
                  value={postExcerpt}
                  onChange={(e) => setPostExcerpt(e.target.value)}
                  placeholder="Öğrenciler için hazırlanmış kısa açıklama..."
                  class="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              {/* Main Content */}
              <div class="space-y-1.5">
                <label class="font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                  <span>Yazı İçeriği *</span>
                  <span class="text-[10px] text-slate-400">HTML veya Düz Metin desteği</span>
                </label>
                
                {/* Content Quick Formatting Helpers */}
                <div class="flex items-center space-x-2 text-[10px] pb-1">
                  <button
                    type="button"
                    onClick={() => setPostContent(postContent + '<h2>Başlık Metni</h2>\n')}
                    class="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                  >
                    + Alt Başlık (H2)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPostContent(postContent + '<blockquote class="border-l-4 border-brand-500 p-3 italic bg-slate-50">Önemli Not</blockquote>\n')}
                    class="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                  >
                    + Önemli Not Kutusu
                  </button>
                  <button
                    type="button"
                    onClick={() => setPostContent(postContent + '<ul>\n  <li>Madde 1</li>\n  <li>Madde 2</li>\n</ul>\n')}
                    class="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                  >
                    + Liste (UL)
                  </button>
                  <button
                    type="button"
                    onClick={handleInsertLink}
                    class="px-2.5 py-1 bg-brand-50 hover:bg-brand-100 dark:bg-brand-950 dark:hover:bg-brand-900 rounded border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 font-semibold flex items-center space-x-1"
                  >
                    <LinkIcon class="w-3 h-3" />
                    <span>+ Link / Bağlantı Ekle</span>
                  </button>
                </div>

                <textarea
                  required
                  rows={8}
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Ders notlarınızı, taktiklerinizi veya içerik detaylarını yazın..."
                  class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 leading-relaxed"
                />
              </div>

              {/* Attachment File Name */}
              <div class="space-y-1.5">
                <label class="font-bold text-slate-800 dark:text-slate-200">İndirilebilir Materyal Ek Dosya Adı (Opsiyonel)</label>
                <input
                  type="text"
                  value={postAttachmentName}
                  onChange={(e) => setPostAttachmentName(e.target.value)}
                  placeholder="Örn: 8_Sinif_Cumlenin_Ogeleri_Calisma_Kagidi.pdf"
                  class="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              {/* Modal Footer Buttons */}
              <div class="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  class="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  class="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold shadow-md transition-colors"
                >
                  {editingPost ? 'Değişiklikleri Kaydet' : 'Yazıyı Yayınla'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
