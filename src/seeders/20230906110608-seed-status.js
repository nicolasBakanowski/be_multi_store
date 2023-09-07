"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Status", [
      {
        name: "en cola",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "confirmado",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "rechazado",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "en camino",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "listo en el local",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "devolucion",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Status", null, {});
  },
};
