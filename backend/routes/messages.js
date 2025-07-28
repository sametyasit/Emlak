const express = require('express');
const { body, validationResult } = require('express-validator');
const { dbAsync } = require('../database/db');

const router = express.Router();

// Kullanıcının konuşmalarını getir
router.get('/conversations/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const conversations = await dbAsync.all(`
      SELECT DISTINCT
        CASE 
          WHEN m.sender_id = ? THEN m.receiver_id
          ELSE m.sender_id
        END as other_user_id,
        u.name as other_user_name,
        u.email as other_user_email,
        u.role as other_user_role,
        (
          SELECT message 
          FROM messages 
          WHERE (sender_id = ? AND receiver_id = other_user_id) 
             OR (sender_id = other_user_id AND receiver_id = ?)
          ORDER BY created_at DESC 
          LIMIT 1
        ) as last_message,
        (
          SELECT created_at 
          FROM messages 
          WHERE (sender_id = ? AND receiver_id = other_user_id) 
             OR (sender_id = other_user_id AND receiver_id = ?)
          ORDER BY created_at DESC 
          LIMIT 1
        ) as last_message_time,
        (
          SELECT COUNT(*) 
          FROM messages 
          WHERE sender_id = other_user_id 
            AND receiver_id = ? 
            AND is_read = 0
        ) as unread_count
      FROM messages m
      JOIN users u ON (
        CASE 
          WHEN m.sender_id = ? THEN m.receiver_id
          ELSE m.sender_id
        END = u.id
      )
      WHERE m.sender_id = ? OR m.receiver_id = ?
      ORDER BY last_message_time DESC
    `, [userId, userId, userId, userId, userId, userId, userId, userId, userId]);

    res.json({ conversations });

  } catch (error) {
    console.error('Konuşmalar hatası:', error);
    res.status(500).json({ error: 'Konuşmalar alınamadı' });
  }
});

// İki kullanıcı arasındaki mesajları getir
router.get('/:userId/:otherUserId', async (req, res) => {
  try {
    const { userId, otherUserId } = req.params;

    const messages = await dbAsync.all(`
      SELECT m.*, 
             s.name as sender_name,
             r.name as receiver_name
      FROM messages m
      JOIN users s ON m.sender_id = s.id
      JOIN users r ON m.receiver_id = r.id
      WHERE (m.sender_id = ? AND m.receiver_id = ?)
         OR (m.sender_id = ? AND m.receiver_id = ?)
      ORDER BY m.created_at ASC
    `, [userId, otherUserId, otherUserId, userId]);

    // Okunmamış mesajları okundu olarak işaretle
    await dbAsync.run(`
      UPDATE messages 
      SET is_read = 1 
      WHERE sender_id = ? AND receiver_id = ? AND is_read = 0
    `, [otherUserId, userId]);

    res.json({ messages });

  } catch (error) {
    console.error('Mesajlar hatası:', error);
    res.status(500).json({ error: 'Mesajlar alınamadı' });
  }
});

// Mesaj gönder
router.post('/', [
  body('sender_id').isInt().withMessage('Geçerli bir gönderen ID girin'),
  body('receiver_id').isInt().withMessage('Geçerli bir alıcı ID girin'),
  body('message').trim().notEmpty().withMessage('Mesaj boş olamaz')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { sender_id, receiver_id, message } = req.body;

    // Kullanıcılar var mı kontrol et
    const sender = await dbAsync.get('SELECT id FROM users WHERE id = ?', [sender_id]);
    const receiver = await dbAsync.get('SELECT id FROM users WHERE id = ?', [receiver_id]);

    if (!sender || !receiver) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }

    // Mesajı kaydet
    const result = await dbAsync.run(`
      INSERT INTO messages (sender_id, receiver_id, message)
      VALUES (?, ?, ?)
    `, [sender_id, receiver_id, message]);

    // Gönderilen mesajı getir
    const sentMessage = await dbAsync.get(`
      SELECT m.*, 
             s.name as sender_name,
             r.name as receiver_name
      FROM messages m
      JOIN users s ON m.sender_id = s.id
      JOIN users r ON m.receiver_id = r.id
      WHERE m.id = ?
    `, [result.id]);

    res.status(201).json({
      message: 'Mesaj gönderildi',
      data: sentMessage
    });

  } catch (error) {
    console.error('Mesaj gönderme hatası:', error);
    res.status(500).json({ error: 'Mesaj gönderilemedi' });
  }
});

// Mesajı okundu olarak işaretle
router.patch('/:messageId/read', async (req, res) => {
  try {
    const { messageId } = req.params;

    const result = await dbAsync.run(`
      UPDATE messages SET is_read = 1 WHERE id = ?
    `, [messageId]);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Mesaj bulunamadı' });
    }

    res.json({ message: 'Mesaj okundu olarak işaretlendi' });

  } catch (error) {
    console.error('Mesaj okundu işaretleme hatası:', error);
    res.status(500).json({ error: 'Mesaj işaretlenemedi' });
  }
});

// Kullanıcının okunmamış mesaj sayısını getir
router.get('/:userId/unread-count', async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await dbAsync.get(`
      SELECT COUNT(*) as count FROM messages 
      WHERE receiver_id = ? AND is_read = 0
    `, [userId]);

    res.json({ unreadCount: result.count });

  } catch (error) {
    console.error('Okunmamış mesaj sayısı hatası:', error);
    res.status(500).json({ error: 'Okunmamış mesaj sayısı alınamadı' });
  }
});

module.exports = router; 