"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("AnalyticsEvents", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      eventId: {
        type: Sequelize.STRING(64),
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      timestamp: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      userId: {
        type: Sequelize.STRING(128),
        allowNull: true,
      },
      anonymousId: {
        type: Sequelize.STRING(128),
        allowNull: false,
      },
      sessionId: {
        type: Sequelize.STRING(128),
        allowNull: false,
      },
      platform: {
        type: Sequelize.STRING(32),
        allowNull: false,
      },
      appVersion: {
        type: Sequelize.STRING(32),
        allowNull: true,
      },
      path: {
        type: Sequelize.STRING(512),
        allowNull: true,
      },
      referrer: {
        type: Sequelize.STRING(512),
        allowNull: true,
      },
      utmSource: {
        type: Sequelize.STRING(128),
        allowNull: true,
      },
      utmMedium: {
        type: Sequelize.STRING(128),
        allowNull: true,
      },
      utmCampaign: {
        type: Sequelize.STRING(128),
        allowNull: true,
      },
      utmContent: {
        type: Sequelize.STRING(128),
        allowNull: true,
      },
      utmTerm: {
        type: Sequelize.STRING(128),
        allowNull: true,
      },
      properties: {
        type: Sequelize.JSON,
        allowNull: false,
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
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("AnalyticsEvents");
  },
};

