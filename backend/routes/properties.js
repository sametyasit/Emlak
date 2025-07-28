const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { body, validationResult } = require('express-validator');
const { dbAsync } = require('../database/db');

const router = express.Router();

// Multer konfigürasyonu
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads/properties');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'property-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Sadece resim dosyaları yüklenebilir'));
    }
  }
});

// Tüm emlakları getir (filtreleme ile)
router.get('/', async (req, res) => {
  try {
    const {
      search, type, city, district, minPrice, maxPrice, rooms,
      minArea, maxArea, age, heating, parking, balcony, furnished,
      elevator, security, inComplex, seaView, nearMetro, garden,
      pool, gym, petFriendly, loanEligible, page = 1, limit = 20
    } = req.query;

    let sql = `
      SELECT p.*, u.name as user_name, u.email as user_email,
             GROUP_CONCAT(pi.image_url) as images
      FROM properties p
      LEFT JOIN users u ON p.user_id = u.id
      LEFT JOIN property_images pi ON p.id = pi.property_id
      WHERE p.is_active = 1
    `;

    const params = [];
    const conditions = [];

    // Arama filtresi
    if (search) {
      conditions.push(`(p.title LIKE ? OR p.description LIKE ? OR p.location LIKE ? OR p.city LIKE ?)`);
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm, searchTerm);
    }

    // Diğer filtreler
    if (type) {
      conditions.push('p.type = ?');
      params.push(type);
    }

    if (city) {
      conditions.push('p.city = ?');
      params.push(city);
    }

    if (district) {
      conditions.push('p.district = ?');
      params.push(district);
    }

    if (minPrice) {
      conditions.push('p.price >= ?');
      params.push(parseInt(minPrice));
    }

    if (maxPrice) {
      conditions.push('p.price <= ?');
      params.push(parseInt(maxPrice));
    }

    if (rooms) {
      conditions.push('p.rooms = ?');
      params.push(rooms);
    }

    if (minArea) {
      conditions.push('p.area >= ?');
      params.push(parseInt(minArea));
    }

    if (maxArea) {
      conditions.push('p.area <= ?');
      params.push(parseInt(maxArea));
    }

    if (age) {
      conditions.push('p.building_age = ?');
      params.push(age);
    }

    if (heating) {
      conditions.push('p.heating = ?');
      params.push(heating);
    }

    if (parking) {
      conditions.push('p.parking = ?');
      params.push(parking);
    }

    if (balcony) {
      conditions.push('p.balcony = ?');
      params.push(balcony);
    }

    if (furnished) {
      conditions.push('p.furnished = ?');
      params.push(furnished);
    }

    if (elevator) {
      conditions.push('p.elevator = ?');
      params.push(elevator);
    }

    if (security) {
      conditions.push('p.security = ?');
      params.push(security);
    }

    if (inComplex) {
      conditions.push('p.in_complex = ?');
      params.push(inComplex);
    }

    if (seaView) {
      conditions.push('p.sea_view = ?');
      params.push(seaView);
    }

    if (nearMetro) {
      conditions.push('p.near_metro = ?');
      params.push(nearMetro);
    }

    if (garden) {
      conditions.push('p.garden = ?');
      params.push(garden);
    }

    if (pool) {
      conditions.push('p.pool = ?');
      params.push(pool);
    }

    if (gym) {
      conditions.push('p.gym = ?');
      params.push(gym);
    }

    if (petFriendly) {
      conditions.push('p.pet_friendly = ?');
      params.push(petFriendly);
    }

    if (loanEligible) {
      conditions.push('p.loan_eligible = ?');
      params.push(loanEligible);
    }

    if (conditions.length > 0) {
      sql += ' AND ' + conditions.join(' AND ');
    }

    sql += ' GROUP BY p.id ORDER BY p.created_at DESC';

    // Sayfalama
    const offset = (page - 1) * limit;
    sql += ` LIMIT ? OFFSET ?`;
    params.push(parseInt(limit), offset);

    const properties = await dbAsync.all(sql, params);

    // Resimleri parse et
    properties.forEach(property => {
      if (property.images) {
        property.images = property.images.split(',');
      } else {
        property.images = [];
      }
    });

    // Toplam sayıyı al
    let countSql = 'SELECT COUNT(*) as total FROM properties WHERE is_active = 1';
    if (conditions.length > 0) {
      countSql += ' AND ' + conditions.join(' AND ');
    }
    const countResult = await dbAsync.get(countSql, params.slice(0, -2));
    const total = countResult.total;

    res.json({
      properties,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Emlak listesi hatası:', error);
    res.status(500).json({ error: 'Emlak listesi alınamadı' });
  }
});

// Tek emlak detayı getir
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const property = await dbAsync.get(`
      SELECT p.*, u.name as user_name, u.email as user_email, u.phone as user_phone
      FROM properties p
      LEFT JOIN users u ON p.user_id = u.id
      WHERE p.id = ? AND p.is_active = 1
    `, [id]);

    if (!property) {
      return res.status(404).json({ error: 'Emlak bulunamadı' });
    }

    // Resimleri getir
    const images = await dbAsync.all(`
      SELECT * FROM property_images 
      WHERE property_id = ? 
      ORDER BY is_primary DESC, image_order ASC
    `, [id]);

    property.images = images.map(img => img.image_url);

    res.json({ property });

  } catch (error) {
    console.error('Emlak detay hatası:', error);
    res.status(500).json({ error: 'Emlak detayı alınamadı' });
  }
});

// Yeni emlak ekle
router.post('/', upload.array('images', 10), [
  body('title').trim().isLength({ min: 5 }).withMessage('Başlık en az 5 karakter olmalı'),
  body('type').isIn(['Satılık', 'Kiralık', 'Günlük Kiralık', 'Proje']).withMessage('Geçerli bir tür seçin'),
  body('price').isInt({ min: 0 }).withMessage('Geçerli bir fiyat girin'),
  body('location').trim().notEmpty().withMessage('Konum gerekli'),
  body('city').trim().notEmpty().withMessage('Şehir gerekli')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title, description, type, price, location, city, district, rooms, area,
      floor, building_age, heating, parking, balcony, furnished, elevator,
      security, in_complex, sea_view, near_metro, garden, pool, gym,
      pet_friendly, loan_eligible, contact_phone, contact_email
    } = req.body;

    // Kullanıcı ID'sini token'dan al (gerçek uygulamada middleware kullanılır)
    const userId = req.user?.id || 1;

    // Emlak ekle
    const result = await dbAsync.run(`
      INSERT INTO properties (
        title, description, type, price, location, city, district, rooms, area,
        floor, building_age, heating, parking, balcony, furnished, elevator,
        security, in_complex, sea_view, near_metro, garden, pool, gym,
        pet_friendly, loan_eligible, contact_phone, contact_email, user_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      title, description, type, price, location, city, district, rooms, area,
      floor, building_age, heating, parking, balcony, furnished, elevator,
      security, in_complex, sea_view, near_metro, garden, pool, gym,
      pet_friendly, loan_eligible, contact_phone, contact_email, userId
    ]);

    // Resimleri kaydet
    if (req.files && req.files.length > 0) {
      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
        const imageUrl = `/uploads/properties/${file.filename}`;
        
        await dbAsync.run(`
          INSERT INTO property_images (property_id, image_url, image_order, is_primary)
          VALUES (?, ?, ?, ?)
        `, [result.id, imageUrl, i, i === 0 ? 1 : 0]);
      }
    }

    res.status(201).json({
      message: 'Emlak başarıyla eklendi',
      propertyId: result.id
    });

  } catch (error) {
    console.error('Emlak ekleme hatası:', error);
    res.status(500).json({ error: 'Emlak eklenemedi' });
  }
});

// Emlak güncelle
router.put('/:id', upload.array('images', 10), async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Emlak var mı kontrol et
    const existingProperty = await dbAsync.get('SELECT id FROM properties WHERE id = ?', [id]);
    if (!existingProperty) {
      return res.status(404).json({ error: 'Emlak bulunamadı' });
    }

    // Güncelleme alanlarını hazırla
    const updateFields = [];
    const updateValues = [];

    Object.keys(updateData).forEach(key => {
      if (key !== 'id' && key !== 'images') {
        updateFields.push(`${key} = ?`);
        updateValues.push(updateData[key]);
      }
    });

    updateFields.push('last_updated = CURRENT_TIMESTAMP');
    updateValues.push(id);

    // Emlak güncelle
    await dbAsync.run(`
      UPDATE properties SET ${updateFields.join(', ')} WHERE id = ?
    `, updateValues);

    // Yeni resimler varsa ekle
    if (req.files && req.files.length > 0) {
      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
        const imageUrl = `/uploads/properties/${file.filename}`;
        
        await dbAsync.run(`
          INSERT INTO property_images (property_id, image_url, image_order)
          VALUES (?, ?, ?)
        `, [id, imageUrl, i]);
      }
    }

    res.json({ message: 'Emlak başarıyla güncellendi' });

  } catch (error) {
    console.error('Emlak güncelleme hatası:', error);
    res.status(500).json({ error: 'Emlak güncellenemedi' });
  }
});

// Emlak sil
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Emlak var mı kontrol et
    const existingProperty = await dbAsync.get('SELECT id FROM properties WHERE id = ?', [id]);
    if (!existingProperty) {
      return res.status(404).json({ error: 'Emlak bulunamadı' });
    }

    // Soft delete - is_active = 0
    await dbAsync.run('UPDATE properties SET is_active = 0 WHERE id = ?', [id]);

    res.json({ message: 'Emlak başarıyla silindi' });

  } catch (error) {
    console.error('Emlak silme hatası:', error);
    res.status(500).json({ error: 'Emlak silinemedi' });
  }
});

module.exports = router; 