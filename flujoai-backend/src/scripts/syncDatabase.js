const { sequelize } = require('../models');
const { User, Business, Account, Category, Transaction } = require('../models/associations');

async function syncDatabase() {
  try {
    console.log('Starting database sync...');
    console.log('Database config:', {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      // No mostramos credenciales sensibles
    });

    // Verificar conexión
    await sequelize.authenticate();
    console.log('Database connection successful');

    // Sincronizar modelos
    await sequelize.sync({ alter: true });
    console.log('Models synchronized');

    // Verificar tablas creadas
    const tables = await sequelize.showAllSchemas();
    console.log('Created tables:', tables);

    process.exit(0);
  } catch (error) {
    console.error('Error during database sync:', error);
    process.exit(1);
  }
}

syncDatabase(); 