// flujoai-backend/src/models/associations.js
const Business = require('./business.model');
const User = require('./user.model');
const Account = require('./account.model');
const Category = require('./category.model');
const Transaction = require('./transaction.model');
const TransactionHistory = require('./transactionHistory.model');
const AccountBalance = require('./accountBalance.model');

// Define las asociaciones aquí
Business.belongsToMany(User, { through: 'UserBusiness' });
Business.hasMany(Account, { foreignKey: 'business_id' });
Business.hasMany(Category, { foreignKey: 'business_id' });

Account.belongsTo(Business, { foreignKey: 'business_id' });
Account.hasOne(AccountBalance, { foreignKey: 'account_id' });
AccountBalance.belongsTo(Account, { foreignKey: 'account_id' });
// Agrega otras asociaciones si es necesario

Transaction.hasMany(TransactionHistory, {
    foreignKey: 'transaction_id',
    as: 'history'
});

TransactionHistory.belongsTo(Transaction, {
    foreignKey: 'transaction_id'
});

module.exports = {
    User,
    Business,
    Account,
    Category,
    Transaction,
    TransactionHistory,
    AccountBalance
};
