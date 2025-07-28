const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Veritabanı dosyası yolu
const dbPath = path.join(__dirname, 'emlak.db');

// Veritabanı bağlantısı
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Veritabanına bağlanırken hata:', err);
  } else {
    console.log('✅ SQLite veritabanına bağlandı');
  }
});

// Promise wrapper fonksiyonları
const dbAsync = {
  // Tek satır getir
  get: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },

  // Tüm satırları getir
  all: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  // Çalıştır (INSERT, UPDATE, DELETE)
  run: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, changes: this.changes });
      });
    });
  },

  // Transaction başlat
  beginTransaction: () => {
    return dbAsync.run('BEGIN TRANSACTION');
  },

  // Transaction commit
  commit: () => {
    return dbAsync.run('COMMIT');
  },

  // Transaction rollback
  rollback: () => {
    return dbAsync.run('ROLLBACK');
  }
};

module.exports = { db, dbAsync }; 