const sequelize = require('../config/database');
require('../models/associations');

async function syncDatabase() {
  try {
    console.log('Sincronizando base de datos...');
    await sequelize.sync({ alter: true });
    console.log('Base de datos sincronizada exitosamente');
    process.exit(0);
  } catch (error) {
    console.error('Error sincronizando la base de datos:', error);
    process.exit(1);
  }
}

if (process.env.NODE_ENV === 'development') {
  syncDatabase();
} 