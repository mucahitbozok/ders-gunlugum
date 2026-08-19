export const CATEGORIES = [
  {
    id: 'okuma-anlama',
    name: 'Okuma & Anlama',
    slug: 'okuma-anlama',
    description: 'Paragraf çözme teknikleri, sözel mantık, okuma anlama etkinlikleri ve metin analiz çalışma yaprakları.',
    iconName: 'BookOpen',
    color: 'from-blue-500 to-cyan-600',
    count: 14
  },
  {
    id: 'dil-bilgisi',
    name: 'Dil Bilgisi',
    slug: 'dil-bilgisi',
    description: 'Fiilimsiler, cümlenin ögeleri, ses bilgisi, yazım kuralları ve noktalama işaretleri pratik şablonları.',
    iconName: 'FileText',
    color: 'from-emerald-500 to-teal-600',
    count: 16
  },
  {
    id: 'yazma-ifade',
    name: 'Yazma & İfade',
    slug: 'yazma-ifade',
    description: 'Yaratıcı yazma atölyeleri, hikaye haritası şablonları, kompozisyon rehberleri ve şiir etkinlikleri.',
    iconName: 'PenTool',
    color: 'from-purple-500 to-indigo-600',
    count: 10
  },
  {
    id: 'ders-materyalleri',
    name: 'Ders Materyalleri',
    slug: 'ders-materyalleri',
    description: 'LGS Türkçe deneme sınavları, sınıf içi pano görselleri, deyim-atasözü kartları ve çalışma kağıtları.',
    iconName: 'Download',
    color: 'from-amber-500 to-orange-600',
    count: 22
  },
  {
    id: 'turkce-web2',
    name: 'Türkçe Web 2.0',
    slug: 'turkce-web2',
    description: 'Wordwall kelime oyunları, Canva ders afişleri, etkileşimli bulmacalar ve dijital Türkçe uygulamaları.',
    iconName: 'Laptop',
    color: 'from-rose-500 to-pink-600',
    count: 8
  }
];

export const MOCK_POSTS = [
  {
    id: '1',
    slug: 'lgs-turkce-paragraf-cozme-stratejileri-ve-etkinlik-materyali',
    title: '8. Sınıf LGS Türkçe: Paragraf Çözme Stratejileri ve Sözel Mantık Haritası',
    excerpt: 'LGS sınavına hazırlanan ortaokul 8. sınıf öğrencileri için zaman kazandıran paragraf analiz teknikleri, soru kökü okuma taktikleri ve renkli çalışma yaprağı.',
    coverImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1200&auto=format&fit=crop',
    category: 'Okuma & Anlama',
    categorySlug: 'okuma-anlama',
    date: '19 Ağustos 2026',
    readTime: '6 dk okuma',
    isFeatured: true,
    author: {
      name: 'Bozok Öğretmen',
      title: 'Ortaokul Türkçe Öğretmeni',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      bio: '14 yıllık ortaokul Türkçe öğretmenliği deneyimi ile LGS Türkçe hazırlık materyalleri ve yaratıcı okuma teknikleri geliştirmektedir.'
    },
    content: `
      <h2>LGS Türkçe Paragraf Sorularında Başarının Anahtarı</h2>
      <p>Ortaokul 8. sınıf öğrencilerimizin LGS Türkçe testinde en çok zorlandığı alanların başında uzun paragraf soruları ve sözel akıl yürütme (sözel mantık) soruları gelmektedir.</p>

      <p>Öğrencilere sadece "çok soru çöz" demek yerine, metin mimarisini doğru okumayı öğretmek net sayılarını doğrudan artırmaktadır.</p>

      <h3>Sınıfta Uyguladığım 3 Adımlı Paragraf Analizi</h3>
      <ul>
        <li><strong>1. Adım (Soru Kökü Önce Gelir):</strong> Paragraf okunmadan önce olumsuz soru kökü (değinilmemiştir, çıkarılamaz vb.) belirgin biçimde altı çizilerek zihne kazınır.</li>
        <li><strong>2. Adım (Anahtar Kelime Avı):</strong> Paragraftaki her cümlenin en vurucu kelimesi yuvarlak içine alınarak düşünce akışı haritalandırılır.</li>
        <li><strong>3. Adım (Sözel Mantık Tablosu):</strong> Verilen ipuçları bağımsız değerlendirilmek yerine sütun ve satırlara yerleştirilir.</li>
      </ul>

      <h3>Ders Materyali İçeriği</h3>
      <p>Yazımızın altındaki dosyada 8. sınıf sınıflarınızda doğrudan fotokopi çekip dağıtabileceğiniz 10 sayfalık <strong>"LGS Paragraf & Sözel Mantık Çalışma Kağıdı"</strong> yer almaktadır.</p>
    `,
    attachments: [
      { name: 'LGS_Paragraf_Stratejileri_Etkinlik.pdf', size: '1.8 MB', type: 'pdf' },
      { name: 'Sozel_Mantik_Cozum_Haritasi.docx', size: '920 KB', type: 'word' }
    ],
    tags: ['LGS Türkçe', 'Paragraf', 'Sözel Mantık', '8. Sınıf', 'Çalışma Kağıdı'],
    commentsCount: 5,
    comments: [
      { id: 'c1', author: 'Sibel Öğretmen', role: 'Türkçe Öğretmeni (Kayseri)', date: '19 Ağustos 2026', content: 'Çalışma kağıdını hemen indirdim. Sözel mantık tablosu kodlaması harika olmuş, öğrencilerim çok rahat anladı!' },
      { id: 'c2', author: 'Hasan Yılmaz', role: 'Türkçe Öğretmeni (İzmir)', date: '19 Ağustos 2026', content: 'Özellikle soru kökü okuma taktiği 8. sınıflar için tam zamanında bir paylaşım.' }
    ]
  },
  {
    id: '2',
    slug: 'fiilimsiler-eylemsiler-konu-anlatimi-ve-kodlama-kartlari',
    title: 'Fiilimsiler (Eylemsiler) Eğlenceli Konu Anlatımı ve Kodlama Kartları',
    excerpt: 'İsim-fiil (Mayışmak), Sıfat-fiil (Anası mezar dikecekmiş) ve Zarf-fiil eklerini öğrencilerin hiç unutmayacağı görsel kodlama kartları ve sınıf içi renkli bulmaca.',
    coverImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1200&auto=format&fit=crop',
    category: 'Dil Bilgisi',
    categorySlug: 'dil-bilgisi',
    date: '16 Ağustos 2026',
    readTime: '7 dk okuma',
    isFeatured: true,
    author: {
      name: 'Bozok Öğretmen',
      title: 'Ortaokul Türkçe Öğretmeni',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      bio: '14 yıllık ortaokul Türkçe öğretmenliği deneyimi ile LGS Türkçe hazırlık materyalleri ve yaratıcı okuma teknikleri geliştirmektedir.'
    },
    content: `
      <h2>Dil Bilgisini Ezberden Çıkarıp Eğlenceye Dönüştürün</h2>
      <p>Fiilimsiler konusu 8. sınıf müfredatının ilk ve en kritik dil bilgisi konusudur. Öğrenciler genellikle kalıplaşmış isimlerle fiilimsileri karıştırabilirler.</p>

      <h3>Görsel Kodlama Tekniği</h3>
      <p>Sınıfta tahtaya renkli kartpostallar asarak 3 ayrı grup oluşturuyoruz:</p>
      <ul>
        <li><strong>İsim-Fiil Grubu:</strong> -ma, -ış, -mak (Kodlama: <em>MA-YIŞ-MAK</em>)</li>
        <li><strong>Sıfat-Fiil Grubu:</strong> -an, -ası, -mez, -ar, -dik, -ecek, -miş (Kodlama: <em>ANASI MEZAR DİKECEKMİŞ</em>)</li>
        <li><strong>Zarf-Fiil Grubu:</strong> -ken, -alı, -eli, -meden, -ince, -ip, -erek... (Kodlama: <em>ALİ CAN İP ATLAYARAK...</em>)</li>
      </ul>

      <h3>Ders Etkinlik Materyali</h3>
      <p>Öğrencilerin cümleler içinde fiilimsileri bularak renkli kalemlerle boyadığı ve gizli şifreyi çözdüğü bulmaca kartlarını PDF formatında indirebilirsiniz.</p>
    `,
    attachments: [
      { name: 'Fiilimsiler_Etkilesimli_Bulmaca.pdf', size: '2.4 MB', type: 'pdf' },
      { name: 'Fiilimsi_Kodlama_Kartlari_Seti.docx', size: '1.1 MB', type: 'word' }
    ],
    tags: ['Fiilimsiler', 'Dil Bilgisi', '8. Sınıf', 'Bulmaca Etkinliği'],
    commentsCount: 3,
    comments: [
      { id: 'c3', author: 'Mehmet Ali Öğretmen', role: 'Ortaokul Türkçe Öğretmeni', date: '17 Ağustos 2026', content: 'Kodlama kartlarını çıktı alıp panoya astım. Teşekkürler Bozok Hocam!' }
    ]
  },
  {
    id: '3',
    slug: 'ortaokul-yaratici-yazma-etkinlikleri-ve-hikaye-haritasi',
    title: '5, 6 ve 7. Sınıflar İçin Yaratıcı Yazma Etkinlikleri ve Hikaye Haritası',
    excerpt: 'Öğrencilerin "Ne yazacağım?" kaygısını sonlandıran, serim-düğüm-çözüm şablonları, zar atarak karakter belirleme oyunu ve betimleme çalışma kağıdı.',
    coverImage: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=1200&auto=format&fit=crop',
    category: 'Yazma & İfade',
    categorySlug: 'yazma-ifade',
    date: '12 Ağustos 2026',
    readTime: '5 dk okuma',
    isFeatured: false,
    author: {
      name: 'Bozok Öğretmen',
      title: 'Ortaokul Türkçe Öğretmeni',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      bio: '14 yıllık ortaokul Türkçe öğretmenliği deneyimi ile LGS Türkçe hazırlık materyalleri ve yaratıcı okuma teknikleri geliştirmektedir.'
    },
    content: `
      <h2>Ortaokulda Yazma Becerisini Geliştirme Yolları</h2>
      <p>Öğrenciler yazılı anlatım derslerinde boş bir kağıtla karşı karşıya kaldıklarında nereden başlayacaklarını bilemeyebilirler. Yazma sürecini eğlenceli adımlara bölmek öğrenci motivasyonunu katlar.</p>

      <h3>Hikaye Çarkı Oyunu</h3>
      <p>Öğrenciye bir zar verilir: Zarda gelen sayıya göre Karakter (örn: Uzaylı bir kedi), Mekan (örn: Terk edilmiş kütüphane) ve Olay (örn: Şifreli bir günlük bulma) seçilir. Öğrenci bu 3 ögeyi birleştirerek kısa bir öykü yazar.</p>

      <h3>Şablon İndir</h3>
      <p>Aşağıdaki ek dosyalarda yer alan <strong>Hikaye Haritası Çalışma Kağıdı</strong> ile olay örgüsü, zaman, mekan ve şahıs kadrosunu planlamak çok daha kolay!</p>
    `,
    attachments: [
      { name: 'Yaratici_Yazma_Hikaye_Haritasi.pdf', size: '1.2 MB', type: 'pdf' }
    ],
    tags: ['Yaratıcı Yazma', 'Hikaye Haritası', '5. Sınıf', '6. Sınıf', 'Kompozisyon'],
    commentsCount: 2,
    comments: [
      { id: 'c4', author: 'Zeynep Aksoy', role: 'Türkçe Öğretmeni', date: '14 Ağustos 2026', content: 'Zar atarak hikaye yazma oyununu 6. sınıflarımda uyguladım, inanılmaz yaratıcı öyküler çıktı.' }
    ]
  },
  {
    id: '4',
    slug: 'turkce-dersinde-kullanilabilecek-5-interaktif-web2-araci',
    title: 'Türkçe Dersinde Eğlenceyi Artıran 5 Etkileşimli Web 2.0 Uygulaması',
    excerpt: 'Deyimler, atasözleri, kelime bilgisi ve noktalama işaretlerini Wordwall, Kahoot ve Canva kullanarak akıllı tahtada yarışmaya dönüştürün.',
    coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop',
    category: 'Türkçe Web 2.0',
    categorySlug: 'turkce-web2',
    date: '08 Ağustos 2026',
    readTime: '8 dk okuma',
    isFeatured: false,
    author: {
      name: 'Bozok Öğretmen',
      title: 'Ortaokul Türkçe Öğretmeni',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      bio: '14 yıllık ortaokul Türkçe öğretmenliği deneyimi ile LGS Türkçe hazırlık materyalleri ve yaratıcı okuma teknikleri geliştirmektedir.'
    },
    content: `
      <h2>Akıllı Tahtada Türkçe Oyunları</h2>
      <p>Geleneksel soru çözümlerinin yanı sıra akıllı tahta uygulamaları öğrencilerin Türkçe dersine ilgisini canlı tutmaktadır.</p>

      <h3>1. Wordwall ile Deyim Eşleştirme</h3>
      <p>Çarkıfelek ve kutu açma oyunlarıyla deyim ve atasözleri anlamlarını öğretmek çok pratik.</p>

      <h3>2. Canva for Education ile Kitap Kapağı Tasarımı</h3>
      <p>Okudukları romanlar için öğrencilere Canva üzerinde kendi kitap kapaklarını tasarlatıyoruz.</p>

      <h3>3. Bamboozle ile Hızlı Türkçe Bilgi Yarışması</h3>
      <p>Özellikle ders sonu 5 dakikalık değerlendirmelerde eşsiz bir oyundur.</p>
    `,
    attachments: [
      { name: 'Wordwall_Turkce_Etkinlik_Linkleri.pdf', size: '650 KB', type: 'pdf' }
    ],
    tags: ['Web 2.0', 'Türkçe Oyunları', 'Akıllı Tahta', 'Wordwall'],
    commentsCount: 1,
    comments: [
      { id: 'c5', author: 'Emre Hoca', role: 'Türkçe Öğretmeni', date: '09 Ağustos 2026', content: 'Wordwall linkleri için teşekkürler Bozok Hocam!' }
    ]
  },
  {
    id: '5',
    slug: 'deyimler-ve-atasozleri-gorsellestirme-sinif-ici-materyali',
    title: 'Deyimler ve Atasözleri Görselleştirme Etkinliği ve Pano Materyal Seti',
    excerpt: 'Öğrencilerin deyimleri resmederek kalıcı öğrendiği, sınıf panolarını süsleyen "Çizimlerle Deyimlerimiz" materyal seti ve renkli kartlar.',
    coverImage: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1200&auto=format&fit=crop',
    category: 'Ders Materyalleri',
    categorySlug: 'ders-materyalleri',
    date: '03 Ağustos 2026',
    readTime: '5 dk okuma',
    isFeatured: false,
    author: {
      name: 'Bozok Öğretmen',
      title: 'Ortaokul Türkçe Öğretmeni',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      bio: '14 yıllık ortaokul Türkçe öğretmenliği deneyimi ile LGS Türkçe hazırlık materyalleri ve yaratıcı okuma teknikleri geliştirmektedir.'
    },
    content: `
      <h2>Somutlaştırarak Öğrenme: Deyimler Şenliği</h2>
      <p>Deyimlerin mecaz anlamlarını kavratmak için "Deyim Çizme Etkinliği" ortaokul seviyesinde en sevilen aktivitelerden biridir.</p>

      <p>"Etekleri tutuşmak", "Gözden düşmek", "Kulak kabartmak" gibi deyimleri öğrenciler önce mecaz anlamıyla resmediyor, ardından sınıfta tahmin yürütme yarışması yapıyoruz.</p>

      <h3>Pano Şablonu İndir</h3>
      <p>Ekten 40 farklı renkli deyim resim kartını indirip sınıf panonuzda sergileyebilirsiniz.</p>
    `,
    attachments: [
      { name: 'Deyimler_Cizim_Kartlari_Pano_Seti.pdf', size: '3.5 MB', type: 'pdf' }
    ],
    tags: ['Deyimler', 'Atasözleri', 'Sınıf Panosu', 'Ders Materyali'],
    commentsCount: 2,
    comments: [
      { id: 'c6', author: 'Nesrin Öğretmen', role: 'Türkçe Öğretmeni', date: '05 Ağustos 2026', content: 'Pano görsellerini bastırdım, koridordaki Türkçe panomuza astık. Çok şık oldu.' }
    ]
  }
];
