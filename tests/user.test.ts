import request from 'supertest';
import { app } from '../src/app';
import * as userService from '../src/services/userService';

jest.mock('../src/services/userService');

describe('User endpoints', () => {
  describe('POST /user/login', () => {
    it('returns token for valid credentials', async () => {
      const mockUser = {
        id: 1,
        name: 'Test',
        email: 'test@example.com',
        roleId: 2,
      };
      (userService.loginUserService as jest.Mock).mockResolvedValue({
        token: 'mock-token',
        user: mockUser,
      });
      const response = await request(app)
        .post('/user/login')
        .send({ email: 'test@example.com', password: 'password' });
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        token: 'mock-token',
        user: {
          id: 1,
          name: 'Test',
          email: 'test@example.com',
          roleId: 2,
          googleId: null,
        },
      });
    });

    it('returns 401 for invalid credentials', async () => {
      (userService.loginUserService as jest.Mock).mockResolvedValue(null);
      const response = await request(app)
        .post('/user/login')
        .send({ email: 'wrong@example.com', password: 'wrong' });
      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'Invalid credentials' });
    });

    it('returns 400 for invalid body (Zod)', async () => {
      const response = await request(app)
        .post('/user/login')
        .send({ email: 'not-an-email', password: 'x' });
      expect(response.status).toBe(400);
    });

    it('expone el mismo login bajo /api/v1', async () => {
      const mockUser = {
        id: 1,
        name: 'Test',
        email: 'test@example.com',
        roleId: 2,
        googleId: null as string | null,
      };
      (userService.loginUserService as jest.Mock).mockResolvedValue({
        token: 't',
        user: mockUser,
      });
      const response = await request(app)
        .post('/api/v1/user/login')
        .send({ email: 'test@example.com', password: 'password' });
      expect(response.status).toBe(200);
      expect(response.body.token).toBe('t');
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
        googleId: null as string | null,
      };
      (userService.registerUserService as jest.Mock).mockResolvedValue(newUser);
      const response = await request(app)
        .post('/user/register')
        .send({
          name: 'Test',
          email: 'test@example.com',
          password: 'password1',
        });
      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        id: 1,
        name: 'Test',
        email: 'test@example.com',
        roleId: 2,
        googleId: null,
      });
    });
  });
});
