import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogAPI } from '../services/api';
import './BlogForm.css';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    tags: ''
  });
  const [loading, setLoading] = useState(false);
  const [fetchingBlog, setFetchingBlog] = useState(true);
  const [error, setError] = useState('');

  const fetchBlog = useCallback(async () => {
    try {
      const response = await blogAPI.getBlogById(id);
      const blog = response.data.blog;
      setFormData({
        title: blog.title,
        content: blog.content,
        excerpt: blog.excerpt || '',
        tags: blog.tags ? blog.tags.join(', ') : ''
      });
      setError('');
    } catch (err) {
      setError('Failed to fetch blog. It may have been deleted.');
      console.error('Error fetching blog:', err);
    } finally {
      setFetchingBlog(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const blogData = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : []
      };

      await blogAPI.updateBlog(id, blogData);
      navigate(`/blog/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update blog. Please try again.');
      console.error('Error updating blog:', err);
    } finally {
      setLoading(false);
    }
  };

  if (fetchingBlog) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading blog...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="blog-form-container">
        <h1>Edit Blog Post</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="blog-form">
          <div className="form-group">
            <label htmlFor="title" className="form-label">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your blog title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="excerpt" className="form-label">Excerpt</label>
            <input
              type="text"
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              className="form-input"
              placeholder="Brief description (optional)"
            />
            <small className="form-help">If left empty, will be auto-generated from content</small>
          </div>

          <div className="form-group">
            <label htmlFor="content" className="form-label">Content *</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Write your blog content here..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="tags" className="form-label">Tags</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="form-input"
              placeholder="javascript, react, nodejs (comma separated)"
            />
            <small className="form-help">Separate tags with commas</small>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Blog'}
            </button>
            <button 
              type="button" 
              onClick={() => navigate(`/blog/${id}`)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
