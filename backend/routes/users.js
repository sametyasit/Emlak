const express = require('express');
const { body, validationResult } = require('express-validator');
const { dbAsync } = require('../database/db');

const router = express.Router();

// Tüm kullanıcıları getir (admin için)
router.get('/', async (req, res) => {
  try {
    const users = await dbAsync.all(`
      SELECT id, name, email, phone, role, is_active, created_at
      FROM users
      ORDER BY created_at DESC
    `);

    res.json({ users });

  } catch (error) {
    console.error('Kullanıcı listesi hatası:', error);
    res.status(500).json({ error: 'Kullanıcı listesi alınamadı' });
  }
});

// Kullanıcı detayı getir
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const user = await dbAsync.get(`
      SELECT id, name, email, phone, role, is_active, created_at
      FROM users WHERE id = ?
    `, [id]);

    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }

    // Kullanıcı ayarlarını getir
    const settings = await dbAsync.get(`
      SELECT * FROM user_settings WHERE user_id = ?
    `, [id]);

    res.json({ user, settings });

  } catch (error) {
    console.error('Kullanıcı detay hatası:', error);
    res.status(500).json({ error: 'Kullanıcı detayı alınamadı' });
  }
});

// Kullanıcı güncelle
router.put('/:id', [
  body('name').optional().trim().isLength({ min: 2 }).withMessage('İsim en az 2 karakter olmalı'),
  body('email').optional().isEmail().withMessage('Geçerli bir email adresi girin'),
  body('phone').optional().isMobilePhone('tr-TR').withMessage('Geçerli bir telefon numarası girin')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { name, email, phone, role } = req.body;

    // Kullanıcı var mı kontrol et
    const existingUser = await dbAsync.get('SELECT id FROM users WHERE id = ?', [id]);
    if (!existingUser) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }

    // Email kontrolü (eğer değiştiriliyorsa)
    if (email) {
      const emailExists = await dbAsync.get(
        'SELECT id FROM users WHERE email = ? AND id != ?',
        [email, id]
      );
      if (emailExists) {
        return res.status(400).json({ error: 'Bu email adresi zaten kullanılıyor' });
      }
    }

    // Güncelleme alanlarını hazırla
    const updateFields = [];
    const updateValues = [];

    if (name) {
      updateFields.push('name = ?');
      updateValues.push(name);
    }

    if (email) {
      updateFields.push('email = ?');
      updateValues.push(email);
    }

    if (phone) {
      updateFields.push('phone = ?');
      updateValues.push(phone);
    }

    if (role) {
      updateFields.push('role = ?');
      updateValues.push(role);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ error: 'Güncellenecek alan bulunamadı' });
    }

    updateValues.push(id);

    // Kullanıcıyı güncelle
    await dbAsync.run(`
      UPDATE users SET ${updateFields.join(', ')} WHERE id = ?
    `, updateValues);

    res.json({ message: 'Kullanıcı başarıyla güncellendi' });

  } catch (error) {
    console.error('Kullanıcı güncelleme hatası:', error);
    res.status(500).json({ error: 'Kullanıcı güncellenemedi' });
  }
});

// Kullanıcı durumunu değiştir (aktif/pasif)
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { is_active } = req.body;

    // Kullanıcı var mı kontrol et
    const existingUser = await dbAsync.get('SELECT id, role FROM users WHERE id = ?', [id]);
    if (!existingUser) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }

    // Admin kullanıcıları pasif yapmaya izin verme
    if (existingUser.role === 'admin' && !is_active) {
      return res.status(400).json({ error: 'Admin kullanıcıları pasif yapamazsınız' });
    }

    await dbAsync.run('UPDATE users SET is_active = ? WHERE id = ?', [is_active, id]);

    res.json({ 
      message: `Kullanıcı ${is_active ? 'aktif' : 'pasif'} yapıldı` 
    });

  } catch (error) {
    console.error('Kullanıcı durum değiştirme hatası:', error);
    res.status(500).json({ error: 'Kullanıcı durumu değiştirilemedi' });
  }
});

// Kullanıcı ayarlarını güncelle
router.put('/:id/settings', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      email_notifications, push_notifications, sms_notifications,
      language, theme
    } = req.body;

    // Kullanıcı var mı kontrol et
    const existingUser = await dbAsync.get('SELECT id FROM users WHERE id = ?', [id]);
    if (!existingUser) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }

    // Ayarları güncelle
    await dbAsync.run(`
      UPDATE user_settings SET 
        email_notifications = ?,
        push_notifications = ?,
        sms_notifications = ?,
        language = ?,
        theme = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE user_id = ?
    `, [email_notifications, push_notifications, sms_notifications, language, theme, id]);

    res.json({ message: 'Kullanıcı ayarları güncellendi' });

  } catch (error) {
    console.error('Kullanıcı ayarları güncelleme hatası:', error);
    res.status(500).json({ error: 'Kullanıcı ayarları güncellenemedi' });
  }
});

// Kullanıcının emlaklarını getir
router.get('/:id/properties', async (req, res) => {
  try {
    const { id } = req.params;

    const properties = await dbAsync.all(`
      SELECT p.*, GROUP_CONCAT(pi.image_url) as images
      FROM properties p
      LEFT JOIN property_images pi ON p.id = pi.property_id
      WHERE p.user_id = ? AND p.is_active = 1
      GROUP BY p.id
      ORDER BY p.created_at DESC
    `, [id]);

    // Resimleri parse et
    properties.forEach(property => {
      if (property.images) {
        property.images = property.images.split(',');
      } else {
        property.images = [];
      }
    });

    res.json({ properties });

  } catch (error) {
    console.error('Kullanıcı emlakları hatası:', error);
    res.status(500).json({ error: 'Kullanıcı emlakları alınamadı' });
  }
});

// Kullanıcının favorilerini getir
router.get('/:id/favorites', async (req, res) => {
  try {
    const { id } = req.params;

    const favorites = await dbAsync.all(`
      SELECT p.*, GROUP_CONCAT(pi.image_url) as images
      FROM favorites f
      JOIN properties p ON f.property_id = p.id
      LEFT JOIN property_images pi ON p.id = pi.property_id
      WHERE f.user_id = ? AND p.is_active = 1
      GROUP BY p.id
      ORDER BY f.created_at DESC
    `, [id]);

    // Resimleri parse et
    favorites.forEach(property => {
      if (property.images) {
        property.images = property.images.split(',');
      } else {
        property.images = [];
      }
    });

    res.json({ favorites });

  } catch (error) {
    console.error('Kullanıcı favorileri hatası:', error);
    res.status(500).json({ error: 'Kullanıcı favorileri alınamadı' });
  }
});

module.exports = router; 