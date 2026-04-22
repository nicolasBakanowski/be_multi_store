import request from "supertest";
import { app } from "../../src/app";
import sequelize from "../../src/db";

describe("integration: auth", () => {
  afterAll(async () => {
    await sequelize.close();
  });

  it("registers then logs in (DB real)", async () => {
    const email = `it_${Date.now()}@example.com`;

    const registerRes = await request(app).post("/user/register").send({
      name: "Integration",
      email,
      password: "password1",
      phone: "123456789",
    });

    expect([200, 201]).toContain(registerRes.status);

    const loginRes = await request(app).post("/user/login").send({
      email,
      password: "password1",
    });

    expect(loginRes.status).toBe(200);
    expect(loginRes.body).toHaveProperty("token");
    expect(loginRes.body).toHaveProperty("user");
    expect(loginRes.body.user.email).toBe(email);
  });
});

