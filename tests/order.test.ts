import request from "supertest";
import { app, io } from "../src/app";
import * as orderService from "../src/services/orderService";
import * as orderProductService from "../src/services/orderProductService";
import { generateToken } from "../src/helpers/tokenManager";

jest.mock("../src/services/orderService");
jest.mock("../src/services/orderProductService");

describe("Order endpoints", () => {
  beforeEach(() => {
    jest.spyOn(io, "emit").mockImplementation(() => false);
  });

  describe("POST /order/new", () => {
    it("creates a new order (público / invitado)", async () => {
      (orderService.createOrderService as jest.Mock).mockResolvedValue({
        id: 1,
      });
      (
        orderProductService.createOrderProductService as jest.Mock
      ).mockResolvedValue(undefined);
      (
        orderProductService.getAllOrderProductsByIdService as jest.Mock
      ).mockResolvedValue([]);

      const body = {
        deliveryMethod: "delivery",
        userInfo: { name: "John", phone: "123", address: "Street" },
        simplifiedCartItems: [{ productId: 1, quantity: 2 }],
        totalAmount: 100,
        totalCostPrice: 80,
      };

      const response = await request(app).post("/order/new").send(body);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ status: "OK", orderId: 1 });
    });
  });

  describe("GET /order/", () => {
    it("returns 401 without token", async () => {
      const res = await request(app).get("/order/");
      expect(res.status).toBe(401);
    });

    it("returns 403 for non-admin", async () => {
      const token = generateToken({
        id: 2,
        name: "user",
        email: "u@example.com",
        roleId: 2,
      });
      const res = await request(app)
        .get("/order/")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(403);
    });

    it("returns 200 for admin", async () => {
      (
        orderProductService.getAllOrdersProductService as jest.Mock
      ).mockResolvedValue([]);
      const token = generateToken({
        id: 1,
        name: "admin",
        email: "a@example.com",
        roleId: 1,
      });
      const res = await request(app)
        .get("/order/")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
    });
  });
});
