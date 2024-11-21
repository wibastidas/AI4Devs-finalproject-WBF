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
Business.hasMany(Transaction, { foreignKey: 'business_id' });

Account.belongsTo(Business, { foreignKey: 'business_id' });
Account.hasMany(Transaction, { foreignKey: 'account_id' });
Account.hasOne(AccountBalance, { foreignKey: 'account_id' });

Transaction.belongsTo(Business, { foreignKey: 'business_id' });
Transaction.belongsTo(Account, { foreignKey: 'account_id' });
Transaction.belongsTo(Category, { foreignKey: 'category_id' });

Category.belongsTo(Business, { foreignKey: 'business_id' });
Category.hasMany(Transaction, { foreignKey: 'category_id' });

AccountBalance.belongsTo(Account, { foreignKey: 'account_id' });

module.exports = {
    User,
    Business,
    Account,
    Category,
    Transaction,
    AccountBalance
};