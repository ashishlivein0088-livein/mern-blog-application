import { describe, it, expect } from 'vitest';

// Basic utility function tests
describe('Utility Functions', () => {
  it('should validate email format', () => {
    const isValidEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('invalid-email')).toBe(false);
    expect(isValidEmail('test@')).toBe(false);
  });

  it('should truncate long text', () => {
    const truncate = (text, maxLength) => {
      if (text.length <= maxLength) return text;
      return text.slice(0, maxLength) + '...';
    };

    expect(truncate('Short text', 20)).toBe('Short text');
    expect(truncate('This is a very long text that needs truncation', 20)).toBe('This is a very long ...');
  });

  it('should format date strings', () => {
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const result = formatDate('2024-01-15');
    expect(result).toContain('January');
    expect(result).toContain('2024');
  });
});
