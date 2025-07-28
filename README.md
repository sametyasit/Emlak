# 🏠 Emlak Sitesi

Modern ve kullanıcı dostu emlak sitesi. React frontend ve Node.js backend ile geliştirilmiştir.

## 🚀 Özellikler

### Frontend (React + TypeScript)
- ✅ Modern ve responsive tasarım
- ✅ Yeşil tema
- ✅ Gelişmiş filtreleme sistemi
- ✅ Resim galerisi ve zoom özelliği
- ✅ Admin paneli
- ✅ Kullanıcı yönetimi
- ✅ Mesajlaşma sistemi
- ✅ Bildirim sistemi
- ✅ Favori ekleme/çıkarma

### Backend (Node.js + SQLite)
- ✅ RESTful API
- ✅ JWT authentication
- ✅ SQLite veritabanı
- ✅ Resim yükleme
- ✅ Dosya yönetimi
- ✅ Güvenlik önlemleri

## 📋 Gereksinimler

- Node.js (v16 veya üzeri)
- npm veya yarn

## 🛠️ Kurulum

### 1. Backend Kurulumu

```bash
# Backend klasörüne git
cd backend

# Bağımlılıkları yükle
npm install

# Veritabanını başlat
npm run init-db

# Geliştirme sunucusunu başlat
npm run dev
```

Backend sunucusu `http://localhost:5000` adresinde çalışacak.

### 2. Frontend Kurulumu

```bash
# Ana proje klasörüne git
cd ..

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm start
```

Frontend uygulaması `http://localhost:3000` adresinde çalışacak.

## 🗄️ Veritabanı

### Varsayılan Kullanıcılar

**Admin Kullanıcısı:**
- Email: `admin@emlak.com`
- Şifre: `admin123`

### Veritabanı Şeması

- **users**: Kullanıcı bilgileri
- **properties**: Emlak ilanları
- **property_images**: Emlak resimleri
- **favorites**: Favori emlaklar
- **messages**: Kullanıcı mesajları
- **notifications**: Bildirimler
- **appointments**: Randevular
- **user_settings**: Kullanıcı ayarları

## 📡 API Endpoints

### Auth
- `POST /api/auth/login` - Giriş yap
- `POST /api/auth/register` - Kayıt ol
- `GET /api/auth/me` - Kullanıcı bilgilerini getir

### Properties
- `GET /api/properties` - Tüm emlakları getir
- `GET /api/properties/:id` - Emlak detayı getir
- `POST /api/properties` - Yeni emlak ekle
- `PUT /api/properties/:id` - Emlak güncelle
- `DELETE /api/properties/:id` - Emlak sil

### Users
- `GET /api/users` - Tüm kullanıcıları getir
- `GET /api/users/:id` - Kullanıcı detayı getir
- `PUT /api/users/:id` - Kullanıcı güncelle
- `PATCH /api/users/:id/status` - Kullanıcı durumunu değiştir

### Messages
- `GET /api/messages/conversations/:userId` - Konuşmaları getir
- `GET /api/messages/:userId/:otherUserId` - Mesajları getir
- `POST /api/messages` - Mesaj gönder

### Notifications
- `GET /api/notifications/:userId` - Bildirimleri getir
- `POST /api/notifications` - Bildirim oluştur
- `PATCH /api/notifications/:id/read` - Bildirimi okundu işaretle

## 🎨 Tema

Proje yeşil tema kullanmaktadır:
- Ana renk: `#10b981` (Emerald-500)
- Koyu yeşil: `#059669` (Emerald-600)
- Açık yeşil: `#34d399` (Emerald-400)

## 🔧 Geliştirme

### Backend Geliştirme
```bash
cd backend
npm run dev  # Nodemon ile otomatik yeniden başlatma
```

### Frontend Geliştirme
```bash
npm start    # React development server
npm run build # Production build
```

## 📁 Proje Yapısı

```
Emlak/
├── backend/                 # Backend API
│   ├── database/           # Veritabanı dosyaları
│   ├── routes/             # API route'ları
│   ├── uploads/            # Yüklenen dosyalar
│   ├── package.json
│   └── server.js
├── src/                    # Frontend React uygulaması
│   ├── components/         # React bileşenleri
│   ├── pages/             # Sayfa bileşenleri
│   ├── contexts/          # React context'leri
│   ├── services/          # API servisleri
│   ├── styles/            # Stil dosyaları
│   └── types/             # TypeScript tipleri
├── public/                # Statik dosyalar
└── package.json
```

## 🚀 Deployment

### Backend Deployment
```bash
cd backend
npm install --production
npm start
```

### Frontend Deployment
```bash
npm run build
# build/ klasörünü web sunucusuna yükle
```

## 🔒 Güvenlik

- JWT token authentication
- Password hashing (bcrypt)
- Input validation
- SQL injection koruması
- CORS yapılandırması
- Helmet güvenlik middleware'i

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