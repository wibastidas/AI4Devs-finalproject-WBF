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

    // Limpiar tablas existentes en orden inverso
    console.log('Limpiando tablas existentes...');
    await sequelize.query('TRUNCATE TABLE transactions CASCADE');
    await sequelize.query('TRUNCATE TABLE account_balances CASCADE');
    await sequelize.query('TRUNCATE TABLE accounts CASCADE');
    await sequelize.query('TRUNCATE TABLE categories CASCADE');
    await sequelize.query('TRUNCATE TABLE users CASCADE');
    await sequelize.query('TRUNCATE TABLE businesses CASCADE');
    console.log('Tablas limpiadas');

    // Reiniciar secuencias
    console.log('Reiniciando secuencias...');
    await sequelize.query("SELECT setval('businesses_id_seq', 1, false)");
    await sequelize.query("SELECT setval('users_id_seq', 1, false)");
    console.log('Secuencias reiniciadas');

    // Ejecutar las sentencias SQL en orden
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
      console.error('Detalles del error:', error.parent.message);
    }
    process.exit(1);
  }
}

importData();
