'use strict';

const sequelize = require('../config/database');
const fs = require('fs').promises;
const path = require('path');

async function importData() {
  try {
    console.log('Iniciando importación de datos...');
    
    // Verificar conexión
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida.');
    
    // Leer los archivos SQL
    const files = {
      businesses: await fs.readFile(path.join(__dirname, 'sql/businesses.sql'), 'utf-8'),
      users: await fs.readFile(path.join(__dirname, 'sql/users.sql'), 'utf-8'),
      categories: await fs.readFile(path.join(__dirname, 'sql/categories.sql'), 'utf-8'),
      accounts: await fs.readFile(path.join(__dirname, 'sql/accounts.sql'), 'utf-8'),
      transactions: await fs.readFile(path.join(__dirname, 'sql/transactions.sql'), 'utf-8'),
      account_balances: await fs.readFile(path.join(__dirname, 'sql/account_balances.sql'), 'utf-8')
    };

    // Ejecutar las sentencias SQL en orden
    await sequelize.query(files.businesses);
    console.log('Businesses importados');
    
    await sequelize.query(files.users);
    console.log('Users importados');
    
    await sequelize.query(files.categories);
    console.log('Categories importados');
    
    await sequelize.query(files.accounts);
    console.log('Accounts importados');
    
    await sequelize.query(files.transactions);
    console.log('Transactions importados');
    
    await sequelize.query(files.account_balances);
    console.log('Account balances importados');

    console.log('Importación completada exitosamente');
    process.exit(0);
  } catch (error) {
    console.error('Error durante la importación:', error);
    console.error('Detalles del error:', error.message);
    process.exit(1);
  }
}

importData();
