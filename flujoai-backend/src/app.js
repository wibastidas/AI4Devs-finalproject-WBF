const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

// Importar modelos para que Sequelize los reconozca
require('./models/user.model');
require('./models/business.model');
require('./models/account.model');
require('./models/category.model');
require('./models/transaction.model');
require('./models/associations');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Aquí puedes agregar tus rutas
// app.use('/api', require('./routes'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');

    // Sincronizar modelos con la base de datos
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  console.log(`Server is running on port ${PORT}`);
});
