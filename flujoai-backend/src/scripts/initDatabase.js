'use strict';

const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

async function initDatabase() {
  // Usar la misma configuración que database.js
  const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
  });

  try {
    console.log('Checking database connection...');
    await sequelize.authenticate();
    console.log('Database connection OK');
    
    // Verificar si las tablas existen
    const [results] = await sequelize.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    if (results.length === 0) {
      console.log('No tables found. Creating initial schema...');
      
      // Cargar modelos manualmente manteniendo CommonJS
      const models = {
        User: require('../models/user.model')(sequelize, Sequelize.DataTypes),
        Business: require('../models/business.model')(sequelize, Sequelize.DataTypes),
        Account: require('../models/account.model')(sequelize, Sequelize.DataTypes),
        Category: require('../models/category.model')(sequelize, Sequelize.DataTypes),
        Transaction: require('../models/transaction.model')(sequelize, Sequelize.DataTypes)
      };

      // Cargar asociaciones
      require('../models/associations')(models);

      await sequelize.sync({ alter: true });
      console.log('Initial schema created successfully');
    } else {
      console.log('Tables already exist. Skipping sync.');
      console.log('Existing tables:', results.map(r => r.table_name));
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Database initialization failed:', error);
    console.error('Error details:', error.message);
    console.error('Error stack:', error.stack);
    process.exit(1);
  }
}

initDatabase();