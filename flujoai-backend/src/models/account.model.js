const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Business = require('./business.model');

class Account extends Model {}

Account.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  business_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Business,
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'Account',
  tableName: 'accounts',
  timestamps: false,
});

Account.belongsTo(Business, { foreignKey: 'business_id' });

module.exports = Account;

