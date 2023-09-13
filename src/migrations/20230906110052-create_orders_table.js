"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Orders", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userInfo: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      extraCommentary: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      statusId: {
        type: Sequelize.INTEGER,
        allowNull: true, // Puede ser nulo si lo deseas
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
