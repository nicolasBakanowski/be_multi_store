"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Lotteries", "status", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "active",
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn("Lotteries", "status");
  },
};
