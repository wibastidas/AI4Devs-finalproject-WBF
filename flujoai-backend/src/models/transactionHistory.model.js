const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TransactionHistory = sequelize.define('TransactionHistory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    transaction_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Transactions',
            key: 'id'
        }
    },
    previous_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    new_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    previous_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    new_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    previous_type: {
        type: DataTypes.ENUM('income', 'expense'),
        allowNull: false
    },
    new_type: {
        type: DataTypes.ENUM('income', 'expense'),
        allowNull: false
    },
    previous_description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    new_description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    modified_by: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    modified_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = TransactionHistory;
