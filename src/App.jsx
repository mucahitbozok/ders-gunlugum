import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import CategoriesPage from './pages/CategoriesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import PostDetailModal from './components/PostDetailModal';
import { MOCK_POSTS, CATEGORIES } from './data/mockPosts';

const POSTS_STORAGE_KEY = 'ders_gunlugum_posts_v1';
const CATEGORIES_STORAGE_KEY = 'ders_gunlugum_categories_v1';

export default function App() {
  // Check URL path for /admin
  const initialTab = window.location.pathname === '/admin' ? 'admin' : 'home';
  const [activeTab, setActiveTab] = useState(initialTab); // 'home' | 'blog' | 'categories' | 'about' | 'contact' | 'admin'
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPost, setSelectedPost] = useState(null);

  // Dynamic Posts & Categories State with LocalStorage Persistence
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem(POSTS_STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return MOCK_POSTS;
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem(CATEGORIES_STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return CATEGORIES;
  });

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
  }, [categories]);

  // Handle URL change detection (/admin)
  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname === '/admin') {
        setActiveTab('admin');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update browser URL silently when tab changes
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'admin') {
      window.history.pushState(null, '', '/admin');
    } else if (window.location.pathname === '/admin') {
      window.history.pushState(null, '', '/');
    }
  };

  // Sync dark mode class on <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // CRUD Handlers for Posts
  const handleAddPost = (newPost) => {
    const postWithId = {
      ...newPost,
      id: `post_${Date.now()}`
    };
    setPosts([postWithId, ...posts]);
  };

  const handleUpdatePost = (postId, updatedFields) => {
    setPosts(posts.map(p => p.id === postId ? { ...p, ...updatedFields } : p));
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(p => p.id !== postId));
  };

  // CRUD Handlers for Categories
  const handleAddCategory = (newCat) => {
    setCategories([...categories, newCat]);
  };

  const handleDeleteCategory = (catId) => {
    setCategories(categories.filter(c => c.id !== catId));
  };

  // Reset to original mock data
  const handleResetData = () => {
    setPosts(MOCK_POSTS);
    setCategories(CATEGORIES);
    localStorage.removeItem(POSTS_STORAGE_KEY);
    localStorage.removeItem(CATEGORIES_STORAGE_KEY);
  };

  return (
    <div class="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      
      {/* Navbar Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Main Page Area */}
      <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        {activeTab === 'home' && (
          <HomePage
            posts={posts}
            onSelectPost={setSelectedPost}
            onNavigateBlog={() => handleTabChange('blog')}
            setSelectedCategory={setSelectedCategory}
          />
        )}

        {activeTab === 'blog' && (
          <BlogPage
            posts={posts}
            categories={categories}
            onSelectPost={setSelectedPost}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {activeTab === 'categories' && (
          <CategoriesPage
            categories={categories}
            setSelectedCategory={setSelectedCategory}
            onNavigateBlog={() => handleTabChange('blog')}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage />
        )}

        {activeTab === 'contact' && (
          <ContactPage />
        )}

        {activeTab === 'admin' && (
          <AdminPage
            posts={posts}
            categories={categories}
            onAddPost={handleAddPost}
            onUpdatePost={handleUpdatePost}
            onDeletePost={handleDeletePost}
            onAddCategory={handleAddCategory}
            onDeleteCategory={handleDeleteCategory}
            onNavigateHome={() => handleTabChange('home')}
            onResetData={handleResetData}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={handleTabChange}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Blog Post Detail Modal Reader */}
      {selectedPost && (
        <PostDetailModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onSelectPost={setSelectedPost}
          allPosts={posts}
        />
      )}

    </div>
  );
}
