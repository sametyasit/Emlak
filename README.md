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

## 📋 Gereksinimler

- Node.js (v16 veya üzeri)
- npm veya yarn

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

## 🔐 Giriş Bilgileri

### Admin Girişi
- **Email**: `admin@emlak.com`
- **Şifre**: `admin123`

### Test Kullanıcısı
- **Email**: `user@emlak.com`
- **Şifre**: `user123`

## 📁 Proje Yapısı

```
src/
├── components/          # Yeniden kullanılabilir bileşenler
├── contexts/           # React Context'leri
├── data/              # Statik veriler
├── pages/             # Sayfa bileşenleri
├── styles/            # Global stiller
└── types/             # TypeScript tip tanımları
```

## 🎨 Tema

Proje yeşil tema kullanmaktadır:
- Ana renk: `#10b981` (Emerald-500)
- Koyu yeşil: `#059669` (Emerald-600)
- Açık yeşil: `#34d399` (Emerald-400)

## 🔧 Geliştirme

### Frontend Geliştirme
```bash
npm start    # React development server
npm run build # Production build
```

## 🚀 Deployment

### Frontend Deployment
```bash
npm run build
# build/ klasörünü web sunucusuna yükle
```

## 🔒 Güvenlik

- LocalStorage ile oturum yönetimi
- Protected routes ile sayfa erişim kontrolü
- Input validation
- XSS koruması

## 📝 Lisans

MIT License

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📞 İletişim

Proje ile ilgili sorularınız için issue açabilirsiniz. 