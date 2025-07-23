# 🏠 Emlak Web Sitesi

Modern ve kullanıcı dostu emlak web sitesi. React.js, TypeScript, Styled Components ve Chart.js kullanılarak geliştirilmiştir.

## ✨ Özellikler

### 🎨 Kullanıcı Arayüzü
- **Modern Tasarım**: Gradient renkler ve modern UI/UX prensipleri
- **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm
- **Animasyonlar**: Smooth hover efektleri ve geçişler
- **Sticky Header**: Kolay navigasyon için sabit header

### 🔐 Kimlik Doğrulama
- **Kullanıcı Girişi**: Normal kullanıcılar için giriş sistemi
- **Admin Girişi**: Yöneticiler için özel panel
- **Korumalı Rotalar**: Yetki kontrolü ile sayfa erişimi
- **Oturum Yönetimi**: LocalStorage ile oturum saklama

### 📊 Dashboard'lar
- **Kullanıcı Dashboard**: Favoriler, randevular, mesajlar
- **Admin Dashboard**: İstatistikler, grafikler, yönetim araçları
- **Chart.js Entegrasyonu**: Görsel veri analizi

### 🏠 Emlak Özellikleri
- **Emlak Listesi**: Grid layout ile emlak kartları
- **Detay Sayfaları**: Kapsamlı emlak bilgileri
- **Arama Sistemi**: Konum ve fiyat bazlı arama
- **Filtreleme**: Çoklu kriter ile filtreleme

## 🚀 Kurulum

### Gereksinimler
- Node.js (v14 veya üzeri)
- npm veya yarn

### Adımlar

1. **Projeyi klonlayın**
```bash
git clone <repository-url>
cd Emlak
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Geliştirme sunucusunu başlatın**
```bash
npm start
```

4. **Tarayıcıda açın**
```
http://localhost:3000
```

## 📁 Proje Yapısı

```
src/
├── components/          # Yeniden kullanılabilir bileşenler
│   ├── Header.tsx      # Ana navigasyon
│   ├── Footer.tsx      # Site footer'ı
│   └── ProtectedRoute.tsx # Korumalı rotalar
├── pages/              # Sayfa bileşenleri
│   ├── HomePage.tsx    # Ana sayfa
│   ├── LoginPage.tsx   # Giriş sayfası
│   ├── PropertyList.tsx # Emlak listesi
│   ├── PropertyDetail.tsx # Emlak detayı
│   ├── UserDashboard.tsx # Kullanıcı paneli
│   └── AdminDashboard.tsx # Admin paneli
├── contexts/           # React Context'ler
│   └── AuthContext.tsx # Kimlik doğrulama context'i
├── styles/             # Global stiller
│   └── GlobalStyles.ts # Global CSS
└── types/              # TypeScript tip tanımları
```

## 🔑 Demo Hesap Bilgileri

### Admin Hesabı
- **E-posta**: admin@emlak.com
- **Şifre**: admin123

### Kullanıcı Hesabı
- **E-posta**: user@emlak.com
- **Şifre**: user123

## 🛠️ Kullanılan Teknolojiler

- **React.js**: Kullanıcı arayüzü framework'ü
- **TypeScript**: Tip güvenliği
- **React Router**: Sayfa yönlendirme
- **Styled Components**: CSS-in-JS styling
- **Chart.js**: Veri görselleştirme
- **Webpack**: Modül bundler

## 🎯 Özellikler Detayı

### Ana Sayfa
- Hero section ile etkileyici giriş
- Arama formu
- Özellik kartları
- İstatistik bölümü

### Emlak Listesi
- Grid layout ile emlak kartları
- Hover efektleri
- Responsive tasarım
- Filtreleme seçenekleri

### Dashboard'lar
- **Kullanıcı**: Favoriler, randevular, mesajlar
- **Admin**: İstatistikler, grafikler, yönetim araçları

### Kimlik Doğrulama
- Form validasyonu
- Hata mesajları
- Başarılı giriş yönlendirmesi
- Oturum yönetimi

## 🔧 Geliştirme

### Yeni Sayfa Ekleme
1. `src/pages/` klasörüne yeni sayfa bileşeni ekleyin
2. `src/App.tsx` dosyasına route ekleyin
3. Gerekirse header'a navigasyon linki ekleyin

### Yeni Bileşen Ekleme
1. `src/components/` klasörüne bileşeni ekleyin
2. TypeScript interface'lerini tanımlayın
3. Styled Components ile stillendirin

### Stil Değişiklikleri
- Global stiller: `src/styles/GlobalStyles.ts`
- Bileşen stilleri: Her bileşenin içinde Styled Components
- Renk paleti: Gradient ve solid renkler

## 📱 Responsive Tasarım

- **Desktop**: 1200px+ genişlik
- **Tablet**: 768px - 1199px genişlik
- **Mobile**: 767px ve altı genişlik

## 🚀 Production Build

```bash
npm run build
```

Build dosyaları `dist/` klasöründe oluşturulacaktır.

## 🔮 Gelecek Özellikler

- [ ] Gerçek API entegrasyonu
- [ ] Harita entegrasyonu
- [ ] Gelişmiş filtreleme
- [ ] Favori sistemi
- [ ] Mesajlaşma sistemi
- [ ] Bildirim sistemi
- [ ] Çoklu dil desteği
- [ ] Dark mode
- [ ] PWA desteği

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

- **E-posta**: info@emlak.com
- **Telefon**: +90 (212) 555 0123
- **Adres**: İstanbul, Türkiye

---

**Not**: Bu proje demo amaçlı geliştirilmiştir. Gerçek kullanım için backend API entegrasyonu gereklidir. 