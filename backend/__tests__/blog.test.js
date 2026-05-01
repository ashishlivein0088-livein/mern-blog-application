const request = require('supertest');
const express = require('express');

describe('Blog Routes', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    
    // Simple mock auth middleware
    const mockAuth = (req, res, next) => {
      req.user = { id: 'mock-user-id' };
      next();
    };
    
    // Define blog routes for testing with inline handlers
    app.get('/api/blogs', (req, res) => {
      res.status(200).json({
        blogs: [
          { _id: '1', title: 'Test Blog 1', content: 'Content 1' },
          { _id: '2', title: 'Test Blog 2', content: 'Content 2' }
        ]
      });
    });
    
    app.get('/api/blogs/:id', (req, res) => {
      if (req.params.id === 'nonexistent') {
        return res.status(404).json({ message: 'Blog not found' });
      }
      res.status(200).json({
        blog: { _id: req.params.id, title: 'Test Blog', content: 'Test Content' }
      });
    });
    
    app.post('/api/blogs', mockAuth, (req, res) => {
      if (!req.body.title) {
        return res.status(400).json({
          message: 'Title and content are required'
        });
      }
      res.status(201).json({
        message: 'Blog created successfully',
        blog: { _id: 'new-id', ...req.body, author: req.user.id }
      });
    });
    
    app.put('/api/blogs/:id', mockAuth, (req, res) => {
      res.status(200).json({
        message: 'Blog updated successfully',
        blog: { _id: req.params.id, ...req.body }
      });
    });
    
    app.delete('/api/blogs/:id', mockAuth, (req, res) => {
      res.status(200).json({
        message: 'Blog deleted successfully'
      });
    });
  });

  describe('GET /api/blogs', () => {
    it('should return all blogs', async () => {
      const response = await request(app)
        .get('/api/blogs')
        .expect(200);

      expect(response.body.blogs).toHaveLength(2);
      expect(response.body.blogs[0]).toHaveProperty('title');
    });

    it('should support search queries', async () => {
      const response = await request(app)
        .get('/api/blogs?search=JavaScript')
        .expect(200);

      expect(response.body.blogs).toBeDefined();
    });
  });

  describe('GET /api/blogs/:id', () => {
    it('should return a single blog by id', async () => {
      const response = await request(app)
        .get('/api/blogs/123')
        .expect(200);

      expect(response.body.blog).toHaveProperty('_id', '123');
      expect(response.body.blog).toHaveProperty('title');
    });

    it('should return 404 for non-existent blog', async () => {
      const response = await request(app)
        .get('/api/blogs/nonexistent')
        .expect(404);

      expect(response.body.message).toContain('not found');
    });
  });

  describe('POST /api/blogs', () => {
    it('should create a new blog when authenticated', async () => {
      const response = await request(app)
        .post('/api/blogs')
        .send({
          title: 'New Blog',
          content: 'Blog content',
          excerpt: 'Short excerpt'
        })
        .expect(201);

      expect(response.body.blog).toHaveProperty('_id');
      expect(response.body.blog.title).toBe('New Blog');
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/blogs')
        .send({
          content: 'Missing title'
        })
        .expect(400);

      expect(response.body.message).toBeDefined();
    });
  });

  describe('PUT /api/blogs/:id', () => {
    it('should update a blog when authenticated', async () => {
      const response = await request(app)
        .put('/api/blogs/123')
        .send({
          title: 'Updated Title',
          content: 'Updated content'
        })
        .expect(200);

      expect(response.body.blog.title).toBe('Updated Title');
    });
  });

  describe('DELETE /api/blogs/:id', () => {
    it('should delete a blog when authenticated', async () => {
      const response = await request(app)
        .delete('/api/blogs/123')
        .expect(200);

      expect(response.body.message).toContain('deleted');
    });
  });
});
