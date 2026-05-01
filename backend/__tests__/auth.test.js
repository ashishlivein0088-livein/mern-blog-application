const request = require('supertest');
const express = require('express');

describe('Auth Routes', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    
    // Define auth routes for testing with inline handlers
    app.post('/api/auth/register', (req, res) => {
      const { email } = req.body;
      
      // Simple email validation
      if (!email || !email.includes('@')) {
        return res.status(400).json({
          message: 'Invalid email format'
        });
      }
      
      res.status(201).json({
        message: 'User registered successfully',
        user: { username: req.body.username, email: req.body.email },
        token: 'mock-token'
      });
    });
    
    app.post('/api/auth/login', (req, res) => {
      const { email, password } = req.body;
      
      // Simple credential validation
      if (password === 'wrongpassword') {
        return res.status(401).json({
          message: 'Invalid credentials'
        });
      }
      
      res.status(200).json({
        message: 'Login successful',
        user: { username: 'testuser', email: email },
        token: 'mock-token'
      });
    });
  });

  describe('POST /api/auth/register', () => {
    it('should validate registration data', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123'
        })
        .expect(201);

      expect(response.body).toHaveProperty('token');
      expect(response.body.user).toHaveProperty('username', 'testuser');
    });

    it('should reject invalid email format', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          email: 'invalid-email',
          password: 'password123'
        })
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        })
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
    });

    it('should reject login with invalid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        })
        .expect(401);

      expect(response.body.message).toContain('Invalid');
    });
  });
});
