const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

// Veritabanı dosyası yolu
const dbPath = path.join(__dirname, 'emlak.db');

// Veritabanı bağlantısı
const db = new sqlite3.Database(dbPath);

// Şema dosyasını oku
const schemaPath = path.join(__dirname, 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf8');

console.log('🗄️ Veritabanı başlatılıyor...');

// Veritabanını oluştur
db.serialize(() => {
  // Şemayı çalıştır
  db.exec(schema, (err) => {
    if (err) {
      console.error('❌ Şema oluşturulurken hata:', err);
      return;
    }
    console.log('✅ Veritabanı şeması oluşturuldu');

    // Varsayılan admin kullanıcısı oluştur
    const adminPassword = bcrypt.hashSync('admin123', 10);
    const adminUser = {
      name: 'Admin Kullanıcı',
      email: 'admin@emlak.com',
      password: adminPassword,
      phone: '+90 555 123 4567',
      role: 'admin'
    };

    db.run(`
      INSERT OR IGNORE INTO users (name, email, password, phone, role)
      VALUES (?, ?, ?, ?, ?)
    `, [adminUser.name, adminUser.email, adminUser.password, adminUser.phone, adminUser.role], function(err) {
      if (err) {
        console.error('❌ Admin kullanıcısı oluşturulurken hata:', err);
      } else {
        console.log('✅ Admin kullanıcısı oluşturuldu');
        console.log('📧 Email: admin@emlak.com');
        console.log('🔑 Şifre: admin123');
      }

      // Örnek emlak verileri ekle
      insertSampleProperties();
    });
  });
});

function insertSampleProperties() {
  const sampleProperties = [
    {
      title: 'Kadıköy\'de Lüks 3+1 Daire',
      description: 'Deniz manzaralı, yeni binada lüks daire',
      type: 'Satılık',
      price: 2500000,
      location: 'Kadıköy',
      city: 'İstanbul',
      district: 'Kadıköy',
      rooms: '3+1',
      area: 120,
      floor: '5',
      building_age: '2-5',
      heating: 'Merkezi',
      parking: 'Var',
      balcony: 'Var',
      furnished: 'Hayır',
      elevator: 'Var',
      security: 'Var',
      in_complex: 'Evet',
      sea_view: 'Evet',
      near_metro: 'Evet',
      garden: 'Hayır',
      pool: 'Var',
      gym: 'Var',
      pet_friendly: 'Evet',
      loan_eligible: 'Evet',
      contact_phone: '+90 555 123 4567',
      contact_email: 'info@emlak.com'
    },
    {
      title: 'Beşiktaş\'ta Kiralık 2+1',
      description: 'Merkezi konumda, ulaşımı kolay daire',
      type: 'Kiralık',
      price: 8500,
      location: 'Beşiktaş',
      city: 'İstanbul',
      district: 'Beşiktaş',
      rooms: '2+1',
      area: 85,
      floor: '3',
      building_age: '6-10',
      heating: 'Kombi',
      parking: 'Yok',
      balcony: 'Var',
      furnished: 'Evet',
      elevator: 'Var',
      security: 'Hayır',
      in_complex: 'Hayır',
      sea_view: 'Hayır',
      near_metro: 'Evet',
      garden: 'Hayır',
      pool: 'Hayır',
      gym: 'Hayır',
      pet_friendly: 'Hayır',
      loan_eligible: 'Hayır',
      contact_phone: '+90 555 123 4568',
      contact_email: 'info@emlak.com'
    }
  ];

  const stmt = db.prepare(`
    INSERT INTO properties (
      title, description, type, price, location, city, district, rooms, area, floor,
      building_age, heating, parking, balcony, furnished, elevator, security,
      in_complex, sea_view, near_metro, garden, pool, gym, pet_friendly, loan_eligible,
      contact_phone, contact_email, user_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  sampleProperties.forEach((property, index) => {
    stmt.run([
      property.title, property.description, property.type, property.price,
      property.location, property.city, property.district, property.rooms,
      property.area, property.floor, property.building_age, property.heating,
      property.parking, property.balcony, property.furnished, property.elevator,
      property.security, property.in_complex, property.sea_view, property.near_metro,
      property.garden, property.pool, property.gym, property.pet_friendly,
      property.loan_eligible, property.contact_phone, property.contact_email, 1
    ], function(err) {
      if (err) {
        console.error(`❌ Örnek emlak ${index + 1} eklenirken hata:`, err);
      } else {
        console.log(`✅ Örnek emlak ${index + 1} eklendi: ${property.title}`);
      }
    });
  });

  stmt.finalize(() => {
    console.log('🎉 Veritabanı başlatma tamamlandı!');
    db.close();
  });
} 