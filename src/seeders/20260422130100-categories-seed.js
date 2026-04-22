"use strict";

function nowRow(extra) {
  return { ...extra, createdAt: new Date(), updatedAt: new Date() };
}

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    await queryInterface.bulkDelete("Categories", null, {});
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1");

    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkInsert(
        "Categories",
        [
          nowRow({
            id: 1,
            name: "Vodka",
            imageUrl: "http://localhost:30001/dist/uploads/category/1/main.webp",
          }),
          nowRow({
            id: 2,
            name: "Gaseosas",
            imageUrl: "http://localhost:30001/dist/uploads/category/2/main.webp",
          }),
          nowRow({
            id: 3,
            name: "Cerveza",
            imageUrl: "http://localhost:30001/dist/uploads/category/3/main.webp",
          }),
        ],
        { transaction }
      );

      await queryInterface.sequelize.query(
        "ALTER TABLE Categories AUTO_INCREMENT = 4",
        { transaction }
      );
    });
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    await queryInterface.bulkDelete("Categories", null, {});
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
  },
};

