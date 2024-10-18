const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Business extends Model {}

Business.init({
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
}, {
  sequelize,
  modelName: 'Business',
  tableName: 'businesses',
  timestamps: false,
});

module.exports = Business;
