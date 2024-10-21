// flujoai-backend/src/models/associations.js
const Business = require('./business.model');
const User = require('./user.model');
const Account = require('./account.model');
const Category = require('./category.model');
const Transaction = require('./transaction.model');

// Define las asociaciones aquí
Business.belongsToMany(User, { through: 'UserBusiness' });
Business.hasMany(Account, { foreignKey: 'business_id' });
Business.hasMany(Category, { foreignKey: 'business_id' });

Account.belongsTo(Business, { foreignKey: 'business_id' });
// Agrega otras asociaciones si es necesario

module.exports = {
  User,
  Business,
  Account,
  Category,
  Transaction,
};
