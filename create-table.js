const mysql = require('mysql2/promise');

async function createTable() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'kampanye_db',
      port: 3306
    });
    
    await connection.query(`
      CREATE TABLE IF NOT EXISTS Aspirasi (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        message TEXT NOT NULL,
        isAnonymous BOOLEAN DEFAULT false,
        createdAt DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3)
      );
    `);
    console.log('Tabel Aspirasi berhasil dibuat!');
    await connection.end();
  } catch (error) {
    console.error('Error creating table:', error);
    process.exit(1);
  }
}

createTable();
