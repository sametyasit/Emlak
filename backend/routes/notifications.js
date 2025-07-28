const express = require('express');
const { body, validationResult } = require('express-validator');
const { dbAsync } = require('../database/db');

const router = express.Router();

// Kullanıcının bildirimlerini getir
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 20, unread_only = false } = req.query;

    let sql = `
      SELECT * FROM notifications 
      WHERE user_id = ?
    `;
    const params = [userId];

    if (unread_only === 'true') {
      sql += ' AND is_read = 0';
    }

    sql += ' ORDER BY created_at DESC';

    // Sayfalama
    const offset = (page - 1) * limit;
    sql += ` LIMIT ? OFFSET ?`;
    params.push(parseInt(limit), offset);

    const notifications = await dbAsync.all(sql, params);

    // Toplam sayıyı al
    let countSql = 'SELECT COUNT(*) as total FROM notifications WHERE user_id = ?';
    const countParams = [userId];

    if (unread_only === 'true') {
      countSql += ' AND is_read = 0';
    }

    const countResult = await dbAsync.get(countSql, countParams);
    const total = countResult.total;

    res.json({
      notifications,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Bildirimler hatası:', error);
    res.status(500).json({ error: 'Bildirimler alınamadı' });
  }
});

// Yeni bildirim oluştur
router.post('/', [
  body('user_id').isInt().withMessage('Geçerli bir kullanıcı ID girin'),
  body('title').trim().notEmpty().withMessage('Başlık gerekli'),
  body('message').trim().notEmpty().withMessage('Mesaj gerekli'),
  body('type').optional().isIn(['info', 'success', 'warning', 'error']).withMessage('Geçerli bir tür seçin')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { user_id, title, message, type = 'info' } = req.body;

    // Kullanıcı var mı kontrol et
    const user = await dbAsync.get('SELECT id FROM users WHERE id = ?', [user_id]);
    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }

    // Bildirimi oluştur
    const result = await dbAsync.run(`
      INSERT INTO notifications (user_id, title, message, type)
      VALUES (?, ?, ?, ?)
    `, [user_id, title, message, type]);

    res.status(201).json({
      message: 'Bildirim oluşturuldu',
      notificationId: result.id
    });

  } catch (error) {
    console.error('Bildirim oluşturma hatası:', error);
    res.status(500).json({ error: 'Bildirim oluşturulamadı' });
  }
});

// Bildirimi okundu olarak işaretle
router.patch('/:notificationId/read', async (req, res) => {
  try {
    const { notificationId } = req.params;

    const result = await dbAsync.run(`
      UPDATE notifications SET is_read = 1 WHERE id = ?
    `, [notificationId]);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Bildirim bulunamadı' });
    }

    res.json({ message: 'Bildirim okundu olarak işaretlendi' });

  } catch (error) {
    console.error('Bildirim okundu işaretleme hatası:', error);
    res.status(500).json({ error: 'Bildirim işaretlenemedi' });
  }
});

// Tüm bildirimleri okundu olarak işaretle
router.patch('/:userId/read-all', async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await dbAsync.run(`
      UPDATE notifications SET is_read = 1 WHERE user_id = ? AND is_read = 0
    `, [userId]);

    res.json({ 
      message: 'Tüm bildirimler okundu olarak işaretlendi',
      updatedCount: result.changes
    });

  } catch (error) {
    console.error('Tüm bildirimleri okundu işaretleme hatası:', error);
    res.status(500).json({ error: 'Bildirimler işaretlenemedi' });
  }
});

// Bildirimi sil
router.delete('/:notificationId', async (req, res) => {
  try {
    const { notificationId } = req.params;

    const result = await dbAsync.run(`
      DELETE FROM notifications WHERE id = ?
    `, [notificationId]);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Bildirim bulunamadı' });
    }

    res.json({ message: 'Bildirim silindi' });

  } catch (error) {
    console.error('Bildirim silme hatası:', error);
    res.status(500).json({ error: 'Bildirim silinemedi' });
  }
});

// Kullanıcının okunmamış bildirim sayısını getir
router.get('/:userId/unread-count', async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await dbAsync.get(`
      SELECT COUNT(*) as count FROM notifications 
      WHERE user_id = ? AND is_read = 0
    `, [userId]);

    res.json({ unreadCount: result.count });

  } catch (error) {
    console.error('Okunmamış bildirim sayısı hatası:', error);
    res.status(500).json({ error: 'Okunmamış bildirim sayısı alınamadı' });
  }
});

// Toplu bildirim oluştur (admin için)
router.post('/bulk', [
  body('user_ids').isArray().withMessage('Kullanıcı ID listesi gerekli'),
  body('title').trim().notEmpty().withMessage('Başlık gerekli'),
  body('message').trim().notEmpty().withMessage('Mesaj gerekli'),
  body('type').optional().isIn(['info', 'success', 'warning', 'error']).withMessage('Geçerli bir tür seçin')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { user_ids, title, message, type = 'info' } = req.body;

    // Transaction başlat
    await dbAsync.beginTransaction();

    try {
      let createdCount = 0;

      for (const userId of user_ids) {
        // Kullanıcı var mı kontrol et
        const user = await dbAsync.get('SELECT id FROM users WHERE id = ?', [userId]);
        if (user) {
          await dbAsync.run(`
            INSERT INTO notifications (user_id, title, message, type)
            VALUES (?, ?, ?, ?)
          `, [userId, title, message, type]);
          createdCount++;
        }
      }

      await dbAsync.commit();

      res.status(201).json({
        message: `${createdCount} kullanıcıya bildirim gönderildi`,
        createdCount
      });

    } catch (error) {
      await dbAsync.rollback();
      throw error;
    }

  } catch (error) {
    console.error('Toplu bildirim hatası:', error);
    res.status(500).json({ error: 'Toplu bildirim oluşturulamadı' });
  }
});

module.exports = router; 