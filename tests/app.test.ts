import request from 'supertest';
import { app } from '../src/app';

describe('GET /test', () => {
  it('should return success message', async () => {
    const response = await request(app).get('/test');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: '¡La prueba fue exitosa!' });
  });
});
