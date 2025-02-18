"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = [
      {
        name: "Category 1",
        imageUrl: "http://example.com/category1.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Category 2",
        imageUrl: "http://example.com/category2.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("Categories", categories, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};