import request from 'supertest';
import { app } from '../src/app';
import * as userService from '../src/services/userService';

jest.mock('../src/services/userService');

describe('User endpoints', () => {
  describe('POST /user/login', () => {
    it('returns token for valid credentials', async () => {
      (userService.loginUserService as jest.Mock).mockResolvedValue('mock-token');
      const response = await request(app)
        .post('/user/login')
        .send({ email: 'test@example.com', password: 'password' });
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ token: 'mock-token' });
    });

    it('returns 401 for invalid credentials', async () => {
      (userService.loginUserService as jest.Mock).mockResolvedValue(null);
      const response = await request(app)
        .post('/user/login')
        .send({ email: 'wrong@example.com', password: 'wrong' });
      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'Invalid credentials' });
    });
  });

  describe('POST /user/register', () => {
    it('creates a new user', async () => {
      const newUser = {
        id: 1,
        name: 'Test',
        email: 'test@example.com',
        password: 'hashed',
        roleId: 2,
      };
      (userService.registerUserService as jest.Mock).mockResolvedValue(newUser);
      const response = await request(app)
        .post('/user/register')
        .send({ name: 'Test', email: 'test@example.com', password: 'password' });
      expect(response.status).toBe(201);
      expect(response.body).toEqual(newUser);
    });
  });
});
