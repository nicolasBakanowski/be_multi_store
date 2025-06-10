import request from 'supertest';
import { app } from '../src/app';
import * as lotteryService from '../src/services/lotteryService';

describe('GET /lotery/current', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return the current lottery when active', async () => {
    const mockLottery = { id: 1, isActive: true, targetAmount: 100, status: 'active' } as any;
    jest.spyOn(lotteryService, 'getCurrentLotteryService').mockResolvedValue(mockLottery);
    const res = await request(app).get('/lotery/current');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockLottery);
  });

  it('should return 404 when there is no active lottery', async () => {
    jest.spyOn(lotteryService, 'getCurrentLotteryService').mockResolvedValue(null as any);
    const res = await request(app).get('/lotery/current');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'No hay una lotería activa' });
  });
});
