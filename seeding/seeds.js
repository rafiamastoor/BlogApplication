const mysql = require('mysql2/promise');

async function seedCategories() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database',
  });

  await connection.execute(`
    INSERT INTO category (category_name) VALUES 
    ('Technology'), 
    ('Travel'), 
    ('Food'), 
    ('Lifestyle'), 
    ('Finance');
  `);

  console.log('Categories inserted!');
  await connection.end();
}

seedCategories();

