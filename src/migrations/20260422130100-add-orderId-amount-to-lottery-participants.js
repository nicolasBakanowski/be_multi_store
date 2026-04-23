"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Backfill: si la tabla no existe (en algunos entornos), la creamos acá
    let tableExists = true;
    try {
      await queryInterface.describeTable("LotteryParticipants");
    } catch {
      tableExists = false;
    }

    if (!tableExists) {
      await queryInterface.createTable("LotteryParticipants", {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "Users",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        lotteryId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "Lotteries",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        orderId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: true,
          references: {
            model: "Orders",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        amount: {
          type: Sequelize.FLOAT,
          allowNull: false,
          defaultValue: 0,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      });
      return;
    }

    const table = await queryInterface.describeTable("LotteryParticipants");

    if (!table.orderId) {
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
    }

    if (!table.amount) {
      await queryInterface.addColumn("LotteryParticipants", "amount", {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      });
    }
  },

  async down(queryInterface) {
    let tableExists = true;
    try {
      await queryInterface.describeTable("LotteryParticipants");
    } catch {
      tableExists = false;
    }
    if (!tableExists) return;

    const table = await queryInterface.describeTable("LotteryParticipants");
    if (table.orderId) await queryInterface.removeColumn("LotteryParticipants", "orderId");
    if (table.amount) await queryInterface.removeColumn("LotteryParticipants", "amount");
  },
};
