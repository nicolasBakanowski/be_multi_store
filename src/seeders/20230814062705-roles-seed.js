"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Roles", [
      {
        name: "Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Usuario",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Empledo",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
