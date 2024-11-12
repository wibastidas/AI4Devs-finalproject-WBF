const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const transactionRoutes = require('./routes/transaction.routes'); // Importar las rutas de transacciones
const accountRoutes = require('./routes/account.routes');
const userRoutes = require('./routes/user.routes');
const categoryRoutes = require('./routes/category.routes');
const businessRoutes = require('./routes/business.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const openaiRoutes = require('./routes/openai.routes');

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

// Usar las rutas de transacciones
app.use('/api', transactionRoutes);
app.use('/api', accountRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', businessRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/openai', openaiRoutes);

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection to the database has been established successfully.');
      console.log(`Server is running on port ${PORT}`);
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  });
}

module.exports = app; // Exportar la aplicación para las pruebas
