const request = require('supertest');
const express = require('express');

// Create a simple test app for health check
const createTestApp = () => {
  const app = express();
  app.use(express.json());
  
  // Health check route
  app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
  });

  return app;
};

describe('Server Health Check', () => {
  let app;

  beforeAll(() => {
    app = createTestApp();
  });

  it('should return OK status on health check', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('status', 'OK');
    expect(response.body).toHaveProperty('message');
  });

  it('should return 404 for non-existent routes', async () => {
    await request(app)
      .get('/api/nonexistent')
      .expect(404);
  });
});
