"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Orders", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      extraCommentary: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      delivery: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      totalAmount: {
        type: Sequelize.FLOAT, 
        allowNull: false,
        defaultValue: 0,
      },
      totalCostPriceAmount: {
        type: Sequelize.FLOAT, 
        allowNull: false,
        defaultValue: 0,
      },
      statusId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Status",
          key: "id",
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Orders");
  },
};
