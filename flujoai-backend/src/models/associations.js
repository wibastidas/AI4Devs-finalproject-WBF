// flujoai-backend/src/models/associations.js
const Business = require('./business.model');
const User = require('./user.model');
const Account = require('./account.model');
const Category = require('./category.model');
const Transaction = require('./transaction.model');
const AccountBalance = require('./accountBalance.model');

// Un usuario pertenece a un negocio
User.belongsTo(Business, { 
    foreignKey: 'business_id'
});

// Un negocio tiene muchos usuarios
Business.hasMany(User, { 
    foreignKey: 'business_id'
});

Business.hasMany(Account, { foreignKey: 'business_id' });
Business.hasMany(Category, { foreignKey: 'business_id' });

Account.belongsTo(Business, { foreignKey: 'business_id' });
Account.hasOne(AccountBalance, { foreignKey: 'account_id' });
AccountBalance.belongsTo(Account, { foreignKey: 'account_id' });

module.exports = {
    User,
    Business,
    Account,
    Category,
    Transaction,
    AccountBalance
};