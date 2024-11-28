'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

async function initDatabase() {
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
    logging: console.log
  });

  try {
    console.log('Checking database connection...');
    await sequelize.authenticate();
    console.log('Database connection OK');
    
    const [results] = await sequelize.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    if (results.length === 0) {
      console.log('No tables found. Creating initial schema...');
      
      // Definir modelos con la misma estructura que tienen actualmente
      const Business = sequelize.define('Business', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
        }
      }, {
        tableName: 'businesses',
        timestamps: false
      });

      const User = sequelize.define('User', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        business_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'businesses',
            key: 'id'
          }
        }
      }, {
        tableName: 'users',
        timestamps: false
      });

      // Definir relaciones exactamente igual que en los modelos
      User.belongsTo(Business, {
        foreignKey: 'business_id',
        as: 'Business'
      });

      console.log('Syncing database...');
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