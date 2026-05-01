import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BlogCard from '../BlogCard';

describe('BlogCard Component', () => {
  const mockBlog = {
    _id: '123',
    title: 'Test Blog Title',
    excerpt: 'This is a test excerpt',
    author: {
      username: 'testuser'
    },
    createdAt: '2024-01-01T00:00:00.000Z',
    tags: ['javascript', 'testing']
  };

  it('should render blog title', () => {
    render(
      <BrowserRouter>
        <BlogCard blog={mockBlog} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Test Blog Title')).toBeInTheDocument();
  });

  it('should render blog excerpt', () => {
    render(
      <BrowserRouter>
        <BlogCard blog={mockBlog} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('This is a test excerpt')).toBeInTheDocument();
  });

  it('should render author username', () => {
    render(
      <BrowserRouter>
        <BlogCard blog={mockBlog} />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/testuser/)).toBeInTheDocument();
  });

  it('should render all tags', () => {
    render(
      <BrowserRouter>
        <BlogCard blog={mockBlog} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('javascript')).toBeInTheDocument();
    expect(screen.getByText('testing')).toBeInTheDocument();
  });

  it('should render without tags if none provided', () => {
    const blogWithoutTags = { ...mockBlog, tags: [] };
    render(
      <BrowserRouter>
        <BlogCard blog={blogWithoutTags} />
      </BrowserRouter>
    );
    
    expect(screen.queryByText('javascript')).not.toBeInTheDocument();
  });

  it('should render anonymous if no author', () => {
    const blogWithoutAuthor = { ...mockBlog, author: null };
    render(
      <BrowserRouter>
        <BlogCard blog={blogWithoutAuthor} />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Anonymous/)).toBeInTheDocument();
  });
});
