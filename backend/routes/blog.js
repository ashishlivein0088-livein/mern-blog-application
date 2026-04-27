const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const blogController = require('../controllers/blogController');
const auth = require('../middleware/auth');

// Validation rules
const blogValidation = [
  body('title').trim().notEmpty().withMessage('Title is required')
    .isLength({ max: 200 }).withMessage('Title cannot exceed 200 characters'),
  body('content').trim().notEmpty().withMessage('Content is required')
];

// @route   GET /api/blogs
// @desc    Get all blogs
// @access  Public
router.get('/', blogController.getAllBlogs);

// @route   GET /api/blogs/my-blogs
// @desc    Get current user's blogs
// @access  Private
router.get('/my-blogs', auth, blogController.getUserBlogs);

// @route   GET /api/blogs/:id
// @desc    Get single blog by ID
// @access  Public
router.get('/:id', blogController.getBlogById);

// @route   POST /api/blogs
// @desc    Create new blog
// @access  Private
router.post('/', auth, blogValidation, blogController.createBlog);

// @route   PUT /api/blogs/:id
// @desc    Update blog
// @access  Private
router.put('/:id', auth, blogValidation, blogController.updateBlog);

// @route   DELETE /api/blogs/:id
// @desc    Delete blog
// @access  Private
router.delete('/:id', auth, blogController.deleteBlog);

module.exports = router;
