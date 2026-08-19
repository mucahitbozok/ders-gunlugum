import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  Download, 
  FileText, 
  MessageSquare, 
  Send, 
  Check, 
  ThumbsUp, 
  Bookmark,
  Sparkles,
  Paperclip
} from 'lucide-react';

export default function PostDetailModal({ post, onClose, onSelectPost, allPosts = [] }) {
  const [commentText, setCommentText] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentRole, setCommentRole] = useState('Öğretmen');
  const [comments, setComments] = useState(post.comments || []);
  const [copied, setCopied] = useState(false);
  const [downloadToast, setDownloadToast] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(14);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    setComments(post.comments || []);
    setIsBookmarked(false);
    setHasLiked(false);
    setLikeCount(Math.floor(Math.random() * 20) + 10);
    // Prevent background scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [post]);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (commentText.trim() && commentAuthor.trim()) {
      const newComment = {
        id: `c_${Date.now()}`,
        author: commentAuthor,
        role: commentRole,
        date: 'Şimdi',
        content: commentText
      };
      setComments([newComment, ...comments]);
      setCommentText('');
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownload = (filename) => {
    setDownloadToast(`"${filename}" indiriliyor...`);
    setTimeout(() => setDownloadToast(null), 4000);
  };

  // Find related posts in the same category
  const relatedPosts = allPosts.filter(
    (p) => p.id !== post.id && p.categorySlug === post.categorySlug
  ).slice(0, 2);

  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      
      {/* Download Notification Toast */}
      {downloadToast && (
        <div class="fixed top-6 right-6 z-50 bg-emerald-600 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-3 animate-in fade-in slide-in-from-top-4">
          <Download class="w-4 h-4 animate-bounce" />
          <span>{downloadToast}</span>
        </div>
      )}

      {/* Modal Card */}
      <div 
        class="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 my-auto max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Sticky Header with Close & Actions */}
        <div class="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800">
          <div class="flex items-center space-x-2">
            <span class="px-3 py-1 text-xs font-semibold rounded-lg bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 border border-brand-200/60 dark:border-brand-800/60">
              {post.category}
            </span>
            <span class="text-xs text-slate-400 font-medium hidden sm:inline">• {post.readTime}</span>
          </div>

          <div class="flex items-center space-x-2">
            <button
              onClick={() => {
                setHasLiked(!hasLiked);
                setLikeCount(hasLiked ? likeCount - 1 : likeCount + 1);
              }}
              class={`p-2 rounded-xl text-xs font-medium border flex items-center space-x-1.5 transition-colors ${
                hasLiked
                  ? 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/50 dark:text-rose-400 dark:border-rose-800'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              <ThumbsUp class="w-3.5 h-3.5" />
              <span>{likeCount}</span>
            </button>

            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              class={`p-2 rounded-xl text-xs font-medium border transition-colors ${
                isBookmarked
                  ? 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
              title="Kaydet"
            >
              <Bookmark class="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleShare}
              class="p-2 rounded-xl text-xs font-medium bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 flex items-center space-x-1"
            >
              {copied ? <Check class="w-3.5 h-3.5 text-emerald-500" /> : <Share2 class="w-3.5 h-3.5" />}
              <span class="hidden sm:inline">{copied ? 'Kopyalandı' : 'Paylaş'}</span>
            </button>

            <button
              onClick={onClose}
              class="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X class="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div class="overflow-y-auto p-6 md:p-10 space-y-8">
          
          {/* Main Title */}
          <div class="space-y-4">
            <h1 class="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {post.title}
            </h1>
            
            {/* Meta bar */}
            <div class="flex flex-wrap items-center gap-4 py-3 border-y border-slate-100 dark:border-slate-800/80 text-xs md:text-sm text-slate-500 dark:text-slate-400">
              <div class="flex items-center space-x-3">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name}
                  class="w-10 h-10 rounded-full object-cover border-2 border-brand-500/20" 
                />
                <div>
                  <span class="block font-semibold text-slate-900 dark:text-white">{post.author.name}</span>
                  <span class="text-xs text-slate-500">{post.author.title}</span>
                </div>
              </div>

              <div class="ml-auto flex items-center space-x-4">
                <span class="flex items-center space-x-1">
                  <Calendar class="w-4 h-4 text-slate-400" />
                  <span>{post.date}</span>
                </span>
                <span class="flex items-center space-x-1">
                  <Clock class="w-4 h-4 text-slate-400" />
                  <span>{post.readTime}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div class="relative rounded-2xl overflow-hidden shadow-lg aspect-video max-h-96">
            <img 
              src={post.coverImage} 
              alt={post.title} 
              class="w-full h-full object-cover"
            />
          </div>

          {/* Article HTML Content */}
          <div 
            class="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed text-base space-y-4 font-normal"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Downloadable Attachments Section */}
          {post.attachments && post.attachments.length > 0 && (
            <div class="p-6 bg-gradient-to-r from-emerald-50 via-teal-50/50 to-slate-50 dark:from-emerald-950/30 dark:via-teal-950/20 dark:to-slate-900 rounded-2xl border border-emerald-200/80 dark:border-emerald-800/60 space-y-4">
              <div class="flex items-center space-x-2 text-emerald-800 dark:text-emerald-300">
                <Paperclip class="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 class="text-base font-bold">İndirilebilir Örnek Ders Materyalleri</h3>
              </div>
              <p class="text-xs text-slate-600 dark:text-slate-400">
                Bu blog yazısına ait hazırlanan ücretsiz çalışma kağıtları ve şablonlar aşağıdadır:
              </p>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {post.attachments.map((file, idx) => (
                  <div 
                    key={idx}
                    class="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between hover:border-emerald-400 transition-all shadow-sm"
                  >
                    <div class="flex items-center space-x-3 overflow-hidden">
                      <div class="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0">
                        {file.type.toUpperCase()}
                      </div>
                      <div class="truncate">
                        <p class="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">{file.name}</p>
                        <p class="text-[10px] text-slate-500">{file.size}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDownload(file.name)}
                      class="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium flex items-center space-x-1 shrink-0 transition-colors shadow-sm"
                    >
                      <Download class="w-3.5 h-3.5" />
                      <span>İndir</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div class="flex flex-wrap gap-2 pt-2">
              <span class="text-xs font-semibold text-slate-400 flex items-center mr-1">Etiketler:</span>
              {post.tags.map((tag, idx) => (
                <span key={idx} class="px-2.5 py-1 text-xs rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Author Box */}
          <div class="p-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 flex items-start space-x-4">
            <img 
              src={post.author.avatar} 
              alt={post.author.name}
              class="w-14 h-14 rounded-full object-cover border-2 border-brand-500 shrink-0" 
            />
            <div class="space-y-1">
              <h4 class="text-base font-bold text-slate-900 dark:text-white">{post.author.name}</h4>
              <p class="text-xs font-medium text-brand-600 dark:text-brand-400">{post.author.title}</p>
              <p class="text-xs text-slate-600 dark:text-slate-400 pt-1 leading-relaxed">{post.author.bio}</p>
            </div>
          </div>

          {/* Related Posts Section */}
          {relatedPosts.length > 0 && (
            <div class="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
              <h3 class="text-lg font-bold text-slate-900 dark:text-white">İlginizi Çekebilecek Diğer Yazılar</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedPosts.map((rPost) => (
                  <div
                    key={rPost.id}
                    onClick={() => onSelectPost(rPost)}
                    class="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 hover:border-brand-400 cursor-pointer transition-all flex items-center space-x-3"
                  >
                    <img src={rPost.coverImage} alt={rPost.title} class="w-16 h-16 rounded-lg object-cover shrink-0" />
                    <div>
                      <h4 class="text-xs font-bold text-slate-900 dark:text-white line-clamp-2">{rPost.title}</h4>
                      <p class="text-[10px] text-slate-500 mt-1">{rPost.date} • {rPost.readTime}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comments Section */}
          <div class="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-6">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <MessageSquare class="w-5 h-5 text-brand-500" />
                <span>Yorumlar ({comments.length})</span>
              </h3>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleAddComment} class="p-5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
              <h4 class="text-xs font-semibold text-slate-700 dark:text-slate-300">Yorum Yapın / Tecrübenizi Paylaşın</h4>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                  placeholder="Adınız Soyadınız"
                  class="px-3.5 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <input
                  type="text"
                  value={commentRole}
                  onChange={(e) => setCommentRole(e.target.value)}
                  placeholder="Branşınız (örn. Fen Bilimleri Öğretmeni)"
                  class="px-3.5 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <textarea
                required
                rows={3}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Yazı hakkındaki düşünceleriniz veya sınıf içi deneyimleriniz..."
                class="w-full px-3.5 py-2.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />

              <div class="flex justify-end">
                <button
                  type="submit"
                  class="flex items-center space-x-1.5 px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors"
                >
                  <Send class="w-3.5 h-3.5" />
                  <span>Yorum Gönder</span>
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div class="space-y-3">
              {comments.map((comment) => (
                <div key={comment.id} class="p-4 bg-white dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-1.5">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                      <span class="text-xs font-bold text-slate-900 dark:text-white">{comment.author}</span>
                      <span class="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">{comment.role}</span>
                    </div>
                    <span class="text-[10px] text-slate-400">{comment.date}</span>
                  </div>
                  <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{comment.content}</p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
