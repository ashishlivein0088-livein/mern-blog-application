import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            📝 MERN Blog
          </Link>
          
          <div className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/my-blogs" className="nav-link">My Blogs</Link>
                <Link to="/create" className="nav-link">Create Blog</Link>
                <div className="nav-user">
                  <span className="user-name">{user?.username || 'User'}</span>
                  <button onClick={handleLogout} className="btn btn-sm btn-secondary">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-sm btn-secondary">Login</Link>
                <Link to="/register" className="btn btn-sm btn-primary">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
