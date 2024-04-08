"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Status", null, {});

    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkInsert(
        "Status",
        [
          { id: 1, name: "pendiente", createdAt: new Date(), updatedAt: new Date() },
          { id: 2, name: "confirmado", createdAt: new Date(), updatedAt: new Date() },
          { id: 3, name: "terminado", createdAt: new Date(), updatedAt: new Date() },
          { id: 4, name: "entregado", createdAt: new Date(), updatedAt: new Date() },
        ],
        { transaction }
      );

      await queryInterface.sequelize.query("ALTER TABLE Status AUTO_INCREMENT = 1", { transaction });
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Status", null, {});
  },
};
