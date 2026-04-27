import { Link } from 'react-router-dom';
import './BlogCard.css';

const BlogCard = ({ blog }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="blog-card">
      <div className="blog-card-header">
        <h2 className="blog-card-title">
          <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
        </h2>
        <div className="blog-card-meta">
          <span className="blog-author">By {blog.author?.username || 'Anonymous'}</span>
          <span className="blog-date">{formatDate(blog.createdAt)}</span>
        </div>
      </div>
      
      <p className="blog-card-excerpt">{blog.excerpt}</p>
      
      {blog.tags && blog.tags.length > 0 && (
        <div className="blog-tags">
          {blog.tags.map((tag, index) => (
            <span key={index} className="blog-tag">{tag}</span>
          ))}
        </div>
      )}
      
      <Link to={`/blog/${blog._id}`} className="blog-read-more">
        Read More →
      </Link>
    </div>
  );
};

export default BlogCard;
