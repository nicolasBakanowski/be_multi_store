"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("LotteryParticipants", "orderId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      unique: true,
      references: {
        model: "Orders",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    await queryInterface.addColumn("LotteryParticipants", "amount", {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("LotteryParticipants", "orderId");
    await queryInterface.removeColumn("LotteryParticipants", "amount");
  },
};
