const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Account = require('./account.model');

const AccountBalance = sequelize.define('AccountBalance', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    account_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Account,
            key: 'id'
        },
        unique: true
    },
    current_balance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
    },
    last_updated: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'account_balances',
    timestamps: true
});

AccountBalance.belongsTo(Account, { foreignKey: 'account_id' });

module.exports = AccountBalance;
