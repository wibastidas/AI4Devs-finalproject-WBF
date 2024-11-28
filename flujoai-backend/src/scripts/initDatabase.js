const { Sequelize } = require('sequelize');
require('dotenv').config();

async function initDatabase() {
  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
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
    }
  );

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
      
      // Importar definiciones de modelos
      const User = require('../models/user.model');
      const Business = require('../models/business.model');
      const Account = require('../models/account.model');
      const Category = require('../models/category.model');
      const Transaction = require('../models/transaction.model');

      // Inicializar modelos
      const models = {
        User: User(sequelize, Sequelize.DataTypes),
        Business: Business(sequelize, Sequelize.DataTypes),
        Account: Account(sequelize, Sequelize.DataTypes),
        Category: Category(sequelize, Sequelize.DataTypes),
        Transaction: Transaction(sequelize, Sequelize.DataTypes)
      };

      // Establecer asociaciones
      Object.values(models).forEach(model => {
        if (model.associate) {
          model.associate(models);
        }
      });

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
    process.exit(1);
  }
}

initDatabase();