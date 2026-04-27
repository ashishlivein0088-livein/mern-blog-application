import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogAPI } from '../services/api';
import './MyBlogs.css';

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const fetchMyBlogs = async () => {
    try {
      setLoading(true);
      const response = await blogAPI.getUserBlogs();
      setBlogs(response.data.blogs);
      setError('');
    } catch (err) {
      setError('Failed to fetch your blogs. Please try again later.');
      console.error('Error fetching user blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogAPI.deleteBlog(id);
        setBlogs(blogs.filter(blog => blog._id !== id));
      } catch (err) {
        setError('Failed to delete blog. Please try again.');
        console.error('Error deleting blog:', err);
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading your blogs...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="my-blogs-header">
        <h1>My Blogs</h1>
        <Link to="/create" className="btn btn-primary">Create New Blog</Link>
      </div>

      {error && <div className="error-message">{error}</div>}

      {blogs.length === 0 ? (
        <div className="no-blogs">
          <h2>You haven't created any blogs yet</h2>
          <p>Start sharing your thoughts with the world!</p>
          <Link to="/create" className="btn btn-primary mt-2">Write Your First Blog</Link>
        </div>
      ) : (
        <div className="my-blogs-list">
          {blogs.map((blog) => (
            <div key={blog._id} className="my-blog-item">
              <div className="my-blog-content">
                <h2>
                  <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
                </h2>
                <p className="my-blog-excerpt">{blog.excerpt}</p>
                <div className="my-blog-meta">
                  <span>Created: {formatDate(blog.createdAt)}</span>
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="my-blog-tags">
                      {blog.tags.map((tag, index) => (
                        <span key={index} className="blog-tag">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="my-blog-actions">
                <Link to={`/blog/${blog._id}`} className="btn btn-sm btn-secondary">
                  View
                </Link>
                <Link to={`/edit/${blog._id}`} className="btn btn-sm btn-secondary">
                  Edit
                </Link>
                <button 
                  onClick={() => handleDelete(blog._id)} 
                  className="btn btn-sm btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBlogs;
