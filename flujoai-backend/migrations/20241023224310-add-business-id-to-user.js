'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'business_id', {
      type: Sequelize.INTEGER,
      allowNull: true, // Cambia a false si el campo es obligatorio
      references: {
        model: 'businesses', // Asegúrate de que este nombre también sea correcto
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'business_id');
  }
};
