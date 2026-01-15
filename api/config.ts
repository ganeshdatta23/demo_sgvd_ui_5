export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000',
};

// Helper function to decode JWT token
const decodeToken = (token: string): any => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

export const TokenManager = {
  getToken: () => localStorage.getItem('access_token'),

  setToken: (token: string) => {
    localStorage.setItem('access_token', token);
  },

  removeToken: () => {
    localStorage.removeItem('access_token');
  },

  isTokenValid: (token: string): boolean => {
    const payload = decodeToken(token);
    if (!payload || !payload.exp) return false;

    // Check if token is expired (exp is in seconds, Date.now() is in milliseconds)
    const expirationTime = payload.exp * 1000;
    return Date.now() < expirationTime;
  },

  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('access_token');
    if (!token) return false;
    return TokenManager.isTokenValid(token);
  },

  getTokenExpiry: (): Date | null => {
    const token = localStorage.getItem('access_token');
    if (!token) return null;

    const payload = decodeToken(token);
    if (!payload || !payload.exp) return null;

    return new Date(payload.exp * 1000);
  },

  getUserFromToken: (): { email?: string; sub?: string } | null => {
    const token = localStorage.getItem('access_token');
    if (!token) return null;

    const payload = decodeToken(token);
    return payload ? { email: payload.email, sub: payload.sub } : null;
  },
};
