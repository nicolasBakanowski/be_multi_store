import request from 'supertest';
process.env.SECRET_KEY = 'testsecret';
jest.mock('../src/controllers/earningController', () => ({
  createOrUpdateDailyEarningController: (_req: any, res: any) => res.status(201).json({ ok: true }),
}));

import { app } from '../src/app';
import { generateToken } from '../src/helpers/tokenManager';

describe('POST /earning/earningGenerate auth checks', () => {

  it('should return 401 if no token provided', async () => {
    const res = await request(app)
      .post('/earning/earningGenerate')
      .send({ date: '2023-01-01' });
    expect(res.status).toBe(401);
  });

  it('should return 403 if user is not admin', async () => {
    const token = generateToken({ id: 1, name: 'user', email: 'user@example.com', roleId: 2 });
    const res = await request(app)
      .post('/earning/earningGenerate')
      .set('Authorization', `Bearer ${token}`)
      .send({ date: '2023-01-01' });
    expect(res.status).toBe(403);
  });
});
