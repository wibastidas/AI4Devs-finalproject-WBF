const { sequelize } = require('../models');

async function initDatabase() {
  try {
    console.log('Checking database connection...');
    await sequelize.authenticate();
    
    // Verificar si las tablas existen
    const [results] = await sequelize.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    if (results.length === 0) {
      console.log('No tables found. Creating initial schema...');
      await sequelize.sync({ alter: true });
      console.log('Initial schema created successfully');
    } else {
      console.log('Tables already exist. Skipping sync.');
      console.log('Existing tables:', results.map(r => r.table_name));
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }
}

initDatabase();