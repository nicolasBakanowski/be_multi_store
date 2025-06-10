import request from 'supertest';
import { app } from '../src/app';
import * as productService from '../src/services/productService';

jest.mock('../src/services/productService');

describe('Product endpoints', () => {
  describe('GET /product/all', () => {
    it('returns list of products', async () => {
      const products = [{ id: 1, name: 'Prod1' }];
      (productService.getAllProductsService as jest.Mock).mockResolvedValue(products);
      const response = await request(app).get('/product/all');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(products);
    });
  });

  describe('GET /product/:id', () => {
    it('returns a product when found', async () => {
      const product = { id: 1, name: 'Prod1' };
      (productService.getProductByIdService as jest.Mock).mockResolvedValue(product);
      const response = await request(app).get('/product/1');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(product);
    });

    it('returns 404 when not found', async () => {
      (productService.getProductByIdService as jest.Mock).mockResolvedValue(null);
      const response = await request(app).get('/product/999');
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Product not found' });
    });
  });
});
