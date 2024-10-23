// src/test.js
const sequelize = require('./config/database');
const User = require('./models/user.model');
const Business = require('./models/business.model');

async function test() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Crear un nuevo usuario
    const user = await User.create({
      username: 'Will',
      email: 'will@gmail.com',
      password: '123456',
    });

    // Crear un nuevo negocio
    const business = await Business.create({
      name: 'Dtx',
    });

    // Asociar el usuario con el negocio
    await user.addBusiness(business);

    console.log('Test data created successfully.');
  } catch (error) {
    console.error('Error during test:', error);
  } finally {
    await sequelize.close();
  }
}

test();

