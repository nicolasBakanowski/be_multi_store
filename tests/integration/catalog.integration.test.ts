import request from "supertest";
import { app } from "../../src/app";
import sequelize from "../../src/db";

describe("integration: catalog", () => {
  afterAll(async () => {
    await sequelize.close();
  });

  it("GET /category/all returns array", async () => {
    const res = await request(app).get("/category/all");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /product/all returns array", async () => {
    const res = await request(app).get("/product/all");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

