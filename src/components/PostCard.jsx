import React from 'react';
import { Calendar, Clock, User, ArrowRight, Paperclip, MessageSquare } from 'lucide-react';

export default function PostCard({ post, onSelectPost, layout = 'grid' }) {
  const isList = layout === 'list';

  return (
    <article 
      onClick={() => onSelectPost(post)}
      class={`group bg-white dark:bg-slate-800/90 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-700/70 shadow-sm hover:shadow-xl hover:border-brand-300 dark:hover:border-brand-700 transition-all duration-300 cursor-pointer flex ${
        isList ? 'flex-col sm:flex-row' : 'flex-col'
      }`}
    >
      {/* Image Container */}
      <div class={`relative overflow-hidden bg-slate-100 dark:bg-slate-900 ${
        isList ? 'sm:w-2/5 shrink-0 h-52 sm:h-auto' : 'h-52 w-full'
      }`}>
        <img 
          src={post.coverImage} 
          alt={post.title}
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Category Badge */}
        <div class="absolute top-3 left-3">
          <span class="px-3 py-1 text-xs font-semibold rounded-lg bg-white/95 dark:bg-slate-900/95 text-brand-700 dark:text-brand-300 shadow-sm backdrop-blur-md border border-slate-200/50 dark:border-slate-700">
            {post.category}
          </span>
        </div>

        {/* Has Attachments badge */}
        {post.attachments && post.attachments.length > 0 && (
          <div class="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-emerald-400 text-xs px-2.5 py-1 rounded-md flex items-center space-x-1 font-medium">
            <Paperclip class="w-3 h-3" />
            <span>Materyal Var ({post.attachments.length})</span>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div class="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata: Date & Reading Time */}
          <div class="flex items-center space-x-4 text-xs text-slate-500 dark:text-slate-400 mb-3">
            <span class="flex items-center space-x-1">
              <Calendar class="w-3.5 h-3.5 text-slate-400" />
              <span>{post.date}</span>
            </span>
            <span>•</span>
            <span class="flex items-center space-x-1">
              <Clock class="w-3.5 h-3.5 text-slate-400" />
              <span>{post.readTime}</span>
            </span>
          </div>

          {/* Title */}
          <h3 class="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2 leading-snug mb-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p class="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 mb-4 leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        {/* Footer info: Author & Arrow */}
        <div class="pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between mt-auto">
          <div class="flex items-center space-x-2.5">
            <img 
              src={post.author.avatar} 
              alt={post.author.name}
              class="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700" 
            />
            <div>
              <p class="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                {post.author.name}
              </p>
              <p class="text-[10px] text-slate-500 dark:text-slate-400">
                {post.author.title}
              </p>
            </div>
          </div>

          <div class="flex items-center space-x-1 text-xs font-semibold text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-transform">
            <span>Oku</span>
            <ArrowRight class="w-3.5 h-3.5" />
          </div>
        </div>

      </div>
    </article>
  );
}
