const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Business extends Model {}

Business.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Business',
  tableName: 'businesses',
  timestamps: false,
});

module.exports = Business;
