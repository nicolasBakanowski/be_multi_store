"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Status", [
      {
        name: "pendiente",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "confirmado",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "terminado",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "entregado",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Status", null, {});
  },
};
