'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('stagedJobs', {
      id: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      filamentUsed: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      date: {
        allowNull: false,
        type: Sequelize.DataTypes.DATEONLY
      }
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('stagedJobs');
  }
};
