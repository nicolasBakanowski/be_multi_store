"use strict";

function nowRow(extra) {
  return { ...extra, createdAt: new Date(), updatedAt: new Date() };
}

module.exports = {
  up: async (queryInterface) => {
    // keep deterministic IDs for referencing from Products seeds
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    await queryInterface.bulkDelete("Brands", null, {});
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1");

    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkInsert(
        "Brands",
        [
          nowRow({
            id: 1,
            name: "Absolut",
            imageUrl: "http://localhost:30001/dist/uploads/brand/1/main.webp",
          }),
          nowRow({
            id: 2,
            name: "Coca-Cola",
            imageUrl: "http://localhost:30001/dist/uploads/brand/2/main.webp",
          }),
          nowRow({
            id: 3,
            name: "Pepsi",
            imageUrl: "http://localhost:30001/dist/uploads/brand/3/main.webp",
          }),
          nowRow({
            id: 4,
            name: "Heineken",
            imageUrl: "http://localhost:30001/dist/uploads/brand/4/main.webp",
          }),
        ],
        { transaction }
      );

      await queryInterface.sequelize.query(
        "ALTER TABLE Brands AUTO_INCREMENT = 5",
        { transaction }
      );
    });
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    await queryInterface.bulkDelete("Brands", null, {});
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
  },
};

