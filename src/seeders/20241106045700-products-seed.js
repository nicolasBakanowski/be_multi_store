"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const products = [];

    for (let i = 1; i <= 500; i++) {
      products.push({
        name: `Producto ${i}`,
        description: `Descripción del Producto ${i}`,
        shortDescription: `Descripción corta del Producto ${i}`,
        stock: Math.floor(Math.random() * 100) + 1, // Stock aleatorio entre 1 y 100
        price: parseFloat((Math.random() * 100).toFixed(2)), // Precio aleatorio entre 0 y 100
        imageUrl: "http://192.168.0.46:30001/dist/uploads/product/absolut-raspberri.webp",
        costPrice: parseFloat((Math.random() * 50).toFixed(2)), // Costo aleatorio entre 0 y 50
        available: true,
        categoryId: 1, // ID de categoría aleatorio entre 1 y 10
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return queryInterface.bulkInsert("Products", products, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
