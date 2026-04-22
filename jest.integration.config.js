// Debe ejecutarse antes de que los tests importen `app` (imports hoisteados)
process.env.NODE_ENV = "test";
process.env.SECRET_KEY =
  process.env.SECRET_KEY || "test-secret-key-for-jest-min-32-chars";
process.env.MYSQL_URL =
  process.env.MYSQL_URL ||
  "mysql://test:test@127.0.0.1:3306/test_db_placeholder";

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/integration/**/*.test.ts"],
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.d.ts",
    "!src/migrations/**",
    "!src/seeders/**",
  ],
};

