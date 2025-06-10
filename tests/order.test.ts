import request from 'supertest';
import { app, io } from '../src/app';
import * as orderService from '../src/services/orderService';
import * as orderProductService from '../src/services/orderProductService';

jest.mock('../src/services/orderService');
jest.mock('../src/services/orderProductService');

describe('Order endpoints', () => {
  beforeEach(() => {
    jest.spyOn(io, 'emit').mockImplementation(() => false);
  });

  describe('POST /order/new', () => {
    it('creates a new order', async () => {
      (orderService.createOrderService as jest.Mock).mockResolvedValue({ id: 1 });
      (orderProductService.createOrderProductService as jest.Mock).mockResolvedValue(undefined);
      (orderProductService.getAllOrderProductsByIdService as jest.Mock).mockResolvedValue([]);

      const body = {
        deliveryMethod: 'delivery',
        userInfo: { name: 'John', phone: '123', address: 'Street' },
        simplifiedCartItems: [{ productId: 1, quantity: 2 }],
        totalAmount: 100,
        totalCostPrice: 80
      };

      const response = await request(app).post('/order/new').send(body);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ status: 'OK' });
    });
  });
});
