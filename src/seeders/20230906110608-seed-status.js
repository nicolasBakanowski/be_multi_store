"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Status", [
      {
        id: 1,
        name: "pendiente",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "confirmado",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: "terminado",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: "rechazado",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Status", null, {});
  },
};
