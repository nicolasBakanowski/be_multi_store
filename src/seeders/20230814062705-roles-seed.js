"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Eliminar datos existentes
    await queryInterface.bulkDelete("Roles", null, {});

    // Insertar nuevos datos con IDs específicos
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkInsert(
        "Roles",
        [
          { id: 1, name: "Admin", createdAt: new Date(), updatedAt: new Date() },
          { id: 2, name: "Usuario", createdAt: new Date(), updatedAt: new Date() },
          { id: 3, name: "Empleado", createdAt: new Date(), updatedAt: new Date() },
        ],
        { transaction }
      );

      // Reiniciar la secuencia de autoincrementación a 1
      await queryInterface.sequelize.query("ALTER TABLE Roles AUTO_INCREMENT = 1", { transaction });
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Eliminar datos existentes
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
