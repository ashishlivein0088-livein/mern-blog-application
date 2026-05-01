import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar';
import { AuthContext } from '../../context/AuthContext';

describe('Navbar Component', () => {
  const mockLogout = vi.fn();

  it('should render navigation links when not authenticated', () => {
    const authValue = {
      isAuthenticated: false,
      user: null,
      logout: mockLogout
    };

    render(
      <BrowserRouter>
        <AuthContext.Provider value={authValue}>
          <Navbar />
        </AuthContext.Provider>
      </BrowserRouter>
    );
    
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  it('should render user-specific links when authenticated', () => {
    const authValue = {
      isAuthenticated: true,
      user: { username: 'testuser' },
      logout: mockLogout
    };

    render(
      <BrowserRouter>
        <AuthContext.Provider value={authValue}>
          <Navbar />
        </AuthContext.Provider>
      </BrowserRouter>
    );
    
    expect(screen.getByText('Create Blog')).toBeInTheDocument();
    expect(screen.getByText('My Blogs')).toBeInTheDocument();
  });
});
