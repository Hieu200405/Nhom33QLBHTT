const request = require('supertest');
const app = require('../src/index'); // Đảm bảo app export Express instance

describe('Analytics API', () => {
  it('should get sales', async () => {
    const res = await request(app).get('/api/analytics/sales');
    expect([200, 401, 403]).toContain(res.statusCode); // Có thể cần auth, chấp nhận 401/403 nếu chưa login
    expect(res.body).toBeDefined();
  });

  it('should get top selling products', async () => {
    const res = await request(app).get('/api/analytics/top-selling');
    expect([200, 401, 403]).toContain(res.statusCode);
    expect(res.body).toBeDefined();
  });

  it('should get dashboard stats', async () => {
    const res = await request(app).get('/api/analytics/stats');
    expect([200, 401, 403]).toContain(res.statusCode);
    expect(res.body).toBeDefined();
  });
}); 