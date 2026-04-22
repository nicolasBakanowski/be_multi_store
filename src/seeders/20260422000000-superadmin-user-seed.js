"use strict";

const bcrypt = require("bcrypt");

function nowRow(extra) {
  return { ...extra, createdAt: new Date(), updatedAt: new Date() };
}

module.exports = {
  up: async (queryInterface) => {
    const email =
      process.env.SEED_SUPERADMIN_EMAIL || "superadmin@local.dev";
    const password =
      process.env.SEED_SUPERADMIN_PASSWORD || "superadmin123";

    const hashedPassword = await bcrypt.hash(password, 10);

    // Nota: usamos upsert para que sea idempotente si se corre más de una vez.
    // En MySQL, Sequelize traduce a INSERT ... ON DUPLICATE KEY UPDATE.
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkDelete(
        "Users",
        { email },
        { transaction }
      );

      await queryInterface.bulkInsert(
        "Users",
        [
          nowRow({
            name: "Superadmin",
            email,
            password: hashedPassword,
            googleId: null,
            phone: null,
            roleId: 4,
          }),
        ],
        { transaction }
      );
    });
  },

  down: async (queryInterface) => {
    const email =
      process.env.SEED_SUPERADMIN_EMAIL || "superadmin@local.dev";
    await queryInterface.bulkDelete("Users", { email }, {});
  },
};

