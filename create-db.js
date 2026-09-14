const mysql = require('mysql2/promise');

async function createDb() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      port: 3306
    });
    
    await connection.query('CREATE DATABASE IF NOT EXISTS kampanye_db;');
    console.log('Database kampanye_db created successfully.');
    await connection.end();
  } catch (error) {
    console.error('Error creating database:', error);
    process.exit(1);
  }
}

createDb();
