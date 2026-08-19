import React from 'react';
import { 
  PenTool, 
  Target, 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  BookOpen, 
  Award,
  CheckCircle2,
  BookOpenCheck
} from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: 'Ortaokul Seviyesine Uygunluk',
      description: '5, 6, 7 ve 8. sınıf seviyesindeki öğrencilerin dil gelişimini ve ilgisini destekleyen özgün materyal tasarımı.'
    },
    {
      icon: ShieldCheck,
      title: 'MEB Türkçe Müfredat Uyumu',
      description: 'Tüm metinler, sorular ve çalışma yaprakları güncel MEB Türkçe ders kazanımlarıyla %100 uyumludur.'
    },
    {
      icon: Sparkles,
      title: 'Etkileşim & Web 2.0',
      description: 'Wordwall bulmacaları, Canva ders panoları ve dijital kelime yarışmaları ile zenginleştirilmiş öğrenme.'
    },
    {
      icon: Heart,
      title: 'Ücretsiz & Meslektaş Paylaşımı',
      description: 'Eğitimin paylaştıkça büyüdüğüne inanıyor, tüm materyallerimi Türkçe öğretmenlerimizin kullanımına ücretsiz sunuyorum.'
    }
  ];

  return (
    <div class="space-y-16 pb-16">
      
      {/* Hero Banner */}
      <section class="relative overflow-hidden p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-brand-900 via-slate-900 to-teal-950 text-white shadow-xl text-center space-y-4">
        <div class="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-semibold text-brand-200 backdrop-blur-sm">
          <PenTool class="w-4 h-4 text-brand-300" />
          <span>Hakkımda & Ders Günlüğüm</span>
        </div>
        <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight">
          Merhaba, Ben Bozok Öğretmen!
        </h1>
        <p class="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          <strong>Ders Günlüğüm</strong>, 14 yıllık ortaokul Türkçe öğretmenliği tecrübem boyunca hazırladığım ders materyallerini, LGS çalışma kağıtlarını ve sınıf içi eğlenceli uygulamaları meslektaşlarımla paylaştığım kişisel ders günlüğüm ve materyal sitemdir.
        </p>
      </section>

      {/* Profile Card */}
      <section class="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-sm flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
        <img 
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop" 
          alt="Bozok Öğretmen"
          class="w-36 h-36 rounded-2xl object-cover border-4 border-brand-500 shadow-md shrink-0" 
        />
        <div class="space-y-3 text-center md:text-left">
          <span class="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">Ortaokul Türkçe Öğretmeni</span>
          <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Bozok Öğretmen</h2>
          <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Türkçe Öğretmenliği mezunuyum. 14 yıldır ortaokullarda Türkçe derslerine giriyor, özellikle 8. sınıf LGS Türkçe paragraf stratejileri, okuma alışkanlığı kazandırma ve dil bilgisini oyunlaştırarak öğretme alanlarında çalışmalar yapıyorum.
          </p>
          <div class="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1 text-xs text-slate-500">
            <span class="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg">📚 Paragraf & Sözel Mantık</span>
            <span class="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg">✍️ Yaratıcı Yazma</span>
            <span class="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg">🎮 Web 2.0 Türkçe Oyunları</span>
          </div>
        </div>
      </section>

      {/* Mission & Vision grid */}
      <section class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-3">
          <div class="w-12 h-12 rounded-2xl bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
            🎯
          </div>
          <h2 class="text-xl font-bold text-slate-900 dark:text-white">Sitenin Amacı</h2>
          <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Öğretmenlerimizin ders öncesi hazırlık sürelerini kısaltacak, fotokopiye hazır ve öğrenciyi derse çeken nitelikli Türkçe ders materyallerini tek bir çatı altında toplamak.
          </p>
        </div>

        <div class="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-3">
          <div class="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
            🚀
          </div>
          <h2 class="text-xl font-bold text-slate-900 dark:text-white">Hedefim</h2>
          <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Türkçe dersini sıkıcı dil bilgisi kurallarından arındırıp okuyan, düşünen, yazan ve eğlenerek öğrenen nesiller yetiştirmeye katkı sağlamak.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section class="space-y-8">
        <div class="text-center max-w-2xl mx-auto space-y-2">
          <span class="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">İlkelerim</span>
          <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Materyal Hazırlama Stratejim
          </h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div key={i} class="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 space-y-3 shadow-sm">
                <div class="w-10 h-10 rounded-xl bg-brand-50 dark:bg-slate-700 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                  <Icon class="w-5 h-5" />
                </div>
                <h3 class="text-base font-bold text-slate-900 dark:text-white">{v.title}</h3>
                <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{v.description}</p>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
