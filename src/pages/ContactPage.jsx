import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  MessageSquare, 
  ChevronDown,
  Building,
  Sparkles
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    branch: 'Bilişim Teknolojileri Öğretmeni',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        branch: 'Bilişim Teknolojileri Öğretmeni',
        subject: '',
        message: ''
      });
      setTimeout(() => setSubmitted(false), 6000);
    }
  };

  const faqs = [
    {
      q: 'Sitedeki ders materyalleri tamamen ücretsiz mi?',
      a: 'Evet, EğitimBakış üzerindeki tüm ders planları, çalışma kağıtları ve indirilebilir şablonlar öğretmenler için tamamen ücretsizdir ve ticari olmayan amaçlarla sınıfta serbestçe kullanılabilir.'
    },
    {
      q: 'Ben de blog yazarı olarak içerik paylaşabilir miyim?',
      a: 'Tabii ki! Öğretmen topluluğumuza katkıda bulunmak, geliştirdiğiniz başarılı bir ders materyalini veya tecrübenizi paylaşmak isterseniz iletişim formundan bize ulaşabilirsiniz.'
    },
    {
      q: 'Yapay zekâ ders planları MEB müfredatına uygun mu?',
      a: 'Yazılarımızda paylaştığımız YZ komutları (promptlar) MEB müfredat kazanımlarına uygun sonuç verecek şekilde optimize edilmiştir. Yine de derse girmeden önce gözden geçirmeniz tavsiye edilir.'
    },
    {
      q: 'Materyalleri kendi sınıfıma göre düzenleyebilir miyim?',
      a: 'Evet, indireceğiniz Word ve PDF dosyalarının tümü düzenlenebilir formatta sunulmaktadır. Okulunuzun veya sınıfınızın seviyesine göre özelleştirebilirsiniz.'
    }
  ];

  return (
    <div class="space-y-16 pb-16">
      
      {/* Header */}
      <div class="space-y-3 border-b border-slate-200 dark:border-slate-800 pb-6 text-center max-w-3xl mx-auto">
        <span class="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">İletişim & Destek</span>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Bizimle İletişime Geçin
        </h1>
        <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Görüşlerinizi, soru ve önerilerinizi bizimle paylaşın. En kısa sürede dönüş sağlıyoruz.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Contact Form (2 cols) */}
        <div class="lg:col-span-2 bg-white dark:bg-slate-800 p-8 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-6">
          <div class="space-y-2">
            <h2 class="text-xl font-bold text-slate-900 dark:text-white">Mesaj Gönderin</h2>
            <p class="text-xs text-slate-500">Sorularınızı ve fikirlerinizi aşağıdaki formu doldurarak iletebilirsiniz.</p>
          </div>

          {submitted ? (
            <div class="p-6 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-emerald-800 dark:text-emerald-200 flex items-start space-x-3">
              <CheckCircle2 class="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              <div class="space-y-1">
                <h4 class="text-sm font-bold">Mesajınız Başarıyla Alındı!</h4>
                <p class="text-xs text-emerald-700 dark:text-emerald-300">
                  Değerli mesajınız ekibimize ulaştı. İlginiz için teşekkür ederiz, en kısa sürede e-posta adresinizden yanıtlayacağız.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-1.5">
                  <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">Ad Soyad *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ahmet Yılmaz"
                    class="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div class="space-y-1.5">
                  <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">E-posta Adresi *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ahmet@meb.k12.tr"
                    class="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-1.5">
                  <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">Branş / Görev</label>
                  <select
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    class="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="Sınıf Öğretmeni">Sınıf Öğretmeni</option>
                    <option value="Bilişim Teknolojileri Öğretmeni">Bilişim Teknolojileri Öğretmeni</option>
                    <option value="Matematik Öğretmeni">Matematik Öğretmeni</option>
                    <option value="Fen Bilimleri Öğretmeni">Fen Bilimleri Öğretmeni</option>
                    <option value="İngilizce / Yabancı Dil">İngilizce / Yabancı Dil</option>
                    <option value="Türkçe / Edebiyat">Türkçe / Edebiyat</option>
                    <option value="Rehber Öğretmen / Psikolojik Danışman">Rehber Öğretmen / Psikolojik Danışman</option>
                    <option value="Diğer">Diğer</option>
                  </select>
                </div>

                <div class="space-y-1.5">
                  <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">Konu</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Örn: Materyal Talebi veya Yazarlık Başvurusu"
                    class="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div class="space-y-1.5">
                <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">Mesajınız *</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Mesajınızı buraya yazabilirsiniz..."
                  class="w-full px-4 py-3 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <button
                type="submit"
                class="w-full sm:w-auto px-8 py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-600/20 flex items-center justify-center space-x-2 transition-all"
              >
                <Send class="w-4 h-4" />
                <span>Mesajı Gönder</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Info Cards */}
        <div class="space-y-6">
          <div class="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 space-y-4">
            <h3 class="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Mail class="w-5 h-5 text-brand-500" />
              <span>Doğrudan İletişim</span>
            </h3>
            
            <div class="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div>
                <span class="block font-semibold text-slate-400 text-[10px] uppercase">E-Posta:</span>
                <span class="font-medium text-slate-900 dark:text-slate-100">iletisim@egitimbakis.com</span>
              </div>
              <div>
                <span class="block font-semibold text-slate-400 text-[10px] uppercase">Öğretmen Destek Hattı:</span>
                <span class="font-medium text-slate-900 dark:text-slate-100">+90 (850) 123 45 67</span>
              </div>
              <div>
                <span class="block font-semibold text-slate-400 text-[10px] uppercase">Çalışma Saatleri:</span>
                <span>Hafta İçi: 09:00 - 18:00</span>
              </div>
            </div>
          </div>

          <div class="p-6 bg-gradient-to-br from-brand-600 to-indigo-700 text-white rounded-3xl shadow-md space-y-3">
            <Sparkles class="w-6 h-6 text-amber-300" />
            <h3 class="text-base font-bold">Öğretmen Yazar Olun!</h3>
            <p class="text-xs text-brand-100 leading-relaxed">
              Kendi geliştirdiğiniz özgün ders materyallerini veya sınıf içi yöntemlerinizi binlerce meslektaşınızla paylaşın.
            </p>
          </div>
        </div>

      </div>

      {/* FAQ Section */}
      <section class="space-y-6 pt-6">
        <div class="text-center max-w-2xl mx-auto space-y-2">
          <span class="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">Merak Edilenler</span>
          <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Sıkça Sorulan Sorular
          </h2>
        </div>

        <div class="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div 
                key={idx}
                class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  class="w-full px-6 py-4 text-left flex items-center justify-between font-semibold text-sm text-slate-900 dark:text-white hover:text-brand-600 transition-colors"
                >
                  <span class="flex items-center space-x-2">
                    <HelpCircle class="w-4 h-4 text-brand-500 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown class={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div class="px-6 pb-4 pt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
