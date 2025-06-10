"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("DailyEarnings", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        type: Sequelize.DATEONLY, 
        allowNull: false,
        unique: true,
      },
      totalRevenue: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      totalCost: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      totalProfit: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("DailyEarnings");
  },
};
