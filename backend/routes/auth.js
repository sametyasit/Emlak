const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { dbAsync } = require('../database/db');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'emlak-secret-key-2024';

// Kayıt ol
router.post('/register', [
  body('name').trim().isLength({ min: 2 }).withMessage('İsim en az 2 karakter olmalı'),
  body('email').isEmail().withMessage('Geçerli bir email adresi girin'),
  body('password').isLength({ min: 6 }).withMessage('Şifre en az 6 karakter olmalı'),
  body('phone').optional().isMobilePhone('tr-TR').withMessage('Geçerli bir telefon numarası girin')
], async (req, res) => {
  try {
    // Validation kontrolü
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, phone } = req.body;

    // Email kontrolü
    const existingUser = await dbAsync.get('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUser) {
      return res.status(400).json({ error: 'Bu email adresi zaten kullanılıyor' });
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    // Kullanıcıyı oluştur
    const result = await dbAsync.run(
      'INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, phone]
    );

    // Kullanıcı ayarlarını oluştur
    await dbAsync.run(
      'INSERT INTO user_settings (user_id) VALUES (?)',
      [result.id]
    );

    // JWT token oluştur
    const token = jwt.sign(
      { userId: result.id, email, role: 'user' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Kullanıcı başarıyla oluşturuldu',
      token,
      user: {
        id: result.id,
        name,
        email,
        role: 'user'
      }
    });

  } catch (error) {
    console.error('Kayıt hatası:', error);
    res.status(500).json({ error: 'Kayıt işlemi başarısız' });
  }
});

// Giriş yap
router.post('/login', [
  body('email').isEmail().withMessage('Geçerli bir email adresi girin'),
  body('password').notEmpty().withMessage('Şifre gerekli')
], async (req, res) => {
  try {
    // Validation kontrolü
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Kullanıcıyı bul
    const user = await dbAsync.get(
      'SELECT id, name, email, password, role, is_active FROM users WHERE email = ?',
      [email]
    );

    if (!user) {
      return res.status(401).json({ error: 'Geçersiz email veya şifre' });
    }

    if (!user.is_active) {
      return res.status(401).json({ error: 'Hesabınız aktif değil' });
    }

    // Şifreyi kontrol et
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Geçersiz email veya şifre' });
    }

    // JWT token oluştur
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Giriş başarılı',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Giriş hatası:', error);
    res.status(500).json({ error: 'Giriş işlemi başarısız' });
  }
});

// Kullanıcı bilgilerini getir
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token gerekli' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await dbAsync.get(
      'SELECT id, name, email, phone, role, created_at FROM users WHERE id = ?',
      [decoded.userId]
    );

    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }

    res.json({ user });

  } catch (error) {
    console.error('Token doğrulama hatası:', error);
    res.status(401).json({ error: 'Geçersiz token' });
  }
});

module.exports = router; 