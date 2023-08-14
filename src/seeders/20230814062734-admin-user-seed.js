"use strict";

import { hashPassword } from "../helpers/hashPassword";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await hashPassword("admin");

    await queryInterface.bulkInsert("Users", [
      {
        nombre: "admin",
        email: "admin@example.com",
        password: hashedPassword,
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
