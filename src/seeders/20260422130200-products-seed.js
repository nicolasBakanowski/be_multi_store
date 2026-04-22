"use strict";

function nowRow(extra) {
  return { ...extra, createdAt: new Date(), updatedAt: new Date() };
}

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    await queryInterface.bulkDelete("Products", null, {});
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1");

    const products = [
      // Vodka (brand Absolut)
      nowRow({
        id: 1,
        name: "Absolut Raspberry",
        description: "Vodka sabor frambuesa. Ideal para tragos.",
        shortDescription: "Vodka frambuesa",
        stock: 50,
        price: 25.99,
        costPrice: 14.5,
        available: true,
        categoryId: 1,
        brandId: 1,
        imageUrl: "http://localhost:30001/dist/uploads/product/1/main.webp",
      }),
      nowRow({
        id: 2,
        name: "Absolut Original",
        description: "Vodka clásico para coctelería.",
        shortDescription: "Vodka clásico",
        stock: 35,
        price: 22.5,
        costPrice: 12.2,
        available: true,
        categoryId: 1,
        brandId: 1,
        imageUrl: "http://localhost:30001/dist/uploads/product/2/main.webp",
      }),

      // Gaseosas (Coca-Cola / Pepsi)
      nowRow({
        id: 3,
        name: "Coca-Cola 2L",
        description: "Bebida gaseosa 2 litros.",
        shortDescription: "2L",
        stock: 120,
        price: 3.99,
        costPrice: 2.1,
        available: true,
        categoryId: 2,
        brandId: 2,
        imageUrl: "http://localhost:30001/dist/uploads/product/3/main.webp",
      }),
      nowRow({
        id: 4,
        name: "Pepsi 2L",
        description: "Bebida gaseosa 2 litros.",
        shortDescription: "2L",
        stock: 110,
        price: 3.89,
        costPrice: 2.0,
        available: true,
        categoryId: 2,
        brandId: 3,
        imageUrl: "http://localhost:30001/dist/uploads/product/4/main.webp",
      }),

      // Cerveza (Heineken)
      nowRow({
        id: 5,
        name: "Heineken 330ml",
        description: "Cerveza lager 330ml.",
        shortDescription: "330ml",
        stock: 200,
        price: 2.49,
        costPrice: 1.1,
        available: true,
        categoryId: 3,
        brandId: 4,
        imageUrl: "http://localhost:30001/dist/uploads/product/5/main.webp",
      }),
    ];

    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkInsert("Products", products, { transaction });
      await queryInterface.sequelize.query(
        "ALTER TABLE Products AUTO_INCREMENT = 6",
        { transaction }
      );
    });
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    await queryInterface.bulkDelete("Products", null, {});
    await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
  },
};

