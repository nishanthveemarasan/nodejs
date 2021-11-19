"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn("Likes", "gender", {
        type: Sequelize.STRING,
        unique: true,
      }),
    ];
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return [
      queryInterface.removeColumn("Likes", "gender", {
        type: Sequelize.STRING,
        unique: true,
      }),
    ];
  },
};
