import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { blogAPI } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import './BlogDetails.css';

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await blogAPI.getBlogById(id);
      setBlog(response.data.blog);
      setError('');
    } catch (err) {
      setError('Failed to fetch blog. It may have been deleted.');
      console.error('Error fetching blog:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogAPI.deleteBlog(id);
        navigate('/');
      } catch (err) {
        setError('Failed to delete blog. Please try again.');
        console.error('Error deleting blog:', err);
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading blog...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="container">
        <div className="error-message">{error || 'Blog not found'}</div>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    );
  }

  const isAuthor = user && blog.author._id === user.id;

  return (
    <div className="container">
      <div className="blog-details">
        <div className="blog-details-header">
          <Link to="/" className="back-link">← Back to all blogs</Link>
          
          {isAuthor && (
            <div className="blog-actions">
              <Link to={`/edit/${blog._id}`} className="btn btn-sm btn-secondary">
                Edit
              </Link>
              <button onClick={handleDelete} className="btn btn-sm btn-danger">
                Delete
              </button>
            </div>
          )}
        </div>

        <article className="blog-content">
          <h1 className="blog-title">{blog.title}</h1>
          
          <div className="blog-meta">
            <span className="blog-author">By {blog.author.username}</span>
            <span className="blog-date">{formatDate(blog.createdAt)}</span>
            {blog.updatedAt !== blog.createdAt && (
              <span className="blog-updated">(Updated: {formatDate(blog.updatedAt)})</span>
            )}
          </div>

          {blog.tags && blog.tags.length > 0 && (
            <div className="blog-tags">
              {blog.tags.map((tag, index) => (
                <span key={index} className="blog-tag">{tag}</span>
              ))}
            </div>
          )}

          <div className="blog-text">
            {blog.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetails;
