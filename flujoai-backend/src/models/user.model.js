const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Business = require('./business.model');

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  business_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Businesses',
      key: 'id'
    }
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: false,
});

User.belongsTo(Business, { foreignKey: 'business_id' });

module.exports = User;
