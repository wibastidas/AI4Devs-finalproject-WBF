'use strict';

const sequelize = require('../config/database');
const fs = require('fs').promises;
const path = require('path');

// Importar todos los modelos
const Business = require('../models/business');
const User = require('../models/user');
const Category = require('../models/category');
const Account = require('../models/account');
const Transaction = require('../models/transaction');
const AccountBalance = require('../models/accountBalance');

async function importData() {
  try {
    console.log('Iniciando importación de datos...');
    
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida.');

    // Sincronizar todos los modelos
    console.log('Sincronizando modelos...');
    await Business.sync();
    await User.sync();
    await Category.sync();
    await Account.sync();
    await Transaction.sync();
    await AccountBalance.sync();
    console.log('Modelos sincronizados.');

    // Verificar tablas existentes
    const [tables] = await sequelize.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log('Tablas existentes:', tables.map(t => t.table_name));
    
    // Leer los archivos SQL
    console.log('Leyendo archivos SQL...');
    const files = {
      businesses: await fs.readFile(path.join(__dirname, 'sql/businesses.sql'), 'utf-8'),
      users: await fs.readFile(path.join(__dirname, 'sql/users.sql'), 'utf-8'),
      categories: await fs.readFile(path.join(__dirname, 'sql/categories.sql'), 'utf-8'),
      accounts: await fs.readFile(path.join(__dirname, 'sql/accounts.sql'), 'utf-8'),
      transactions: await fs.readFile(path.join(__dirname, 'sql/transactions.sql'), 'utf-8'),
      account_balances: await fs.readFile(path.join(__dirname, 'sql/account_balances.sql'), 'utf-8')
    };

    // Importar datos en orden
    console.log('Importando businesses...');
    await sequelize.query(files.businesses);
    console.log('Businesses importados');
    
    console.log('Importando users...');
    await sequelize.query(files.users);
    console.log('Users importados');
    
    console.log('Importando categories...');
    await sequelize.query(files.categories);
    console.log('Categories importados');
    
    console.log('Importando accounts...');
    await sequelize.query(files.accounts);
    console.log('Accounts importados');
    
    console.log('Importando transactions...');
    await sequelize.query(files.transactions);
    console.log('Transactions importados');
    
    console.log('Importando account_balances...');
    await sequelize.query(files.account_balances);
    console.log('Account balances importados');

    console.log('Importación completada exitosamente');
    process.exit(0);
  } catch (error) {
    console.error('Error durante la importación:', error);
    console.error('Detalles del error:', error.message);
    if (error.parent) {
      console.error('SQL Error:', error.parent.detail);
      console.error('SQL Query:', error.sql);
    }
    process.exit(1);
  }
}

importData();
