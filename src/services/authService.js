import jwtDecode from 'jwt-decode';
import { API_URL } from '../utils/constants.js';

export const AuthService = {
  async login(email, password) {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      const data = await response.json();
      this.setToken(data.token);
      return data.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  async register(userData) {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }

      const data = await response.json();
      this.setToken(data.token);
      return data.user;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.dispatchEvent(new CustomEvent('auth-change', { detail: { authenticated: false } }));
  },

  setToken(token) {
    localStorage.setItem('token', token);
    try {
      const user = jwtDecode(token);
      localStorage.setItem('user', JSON.stringify(user));
      window.dispatchEvent(new CustomEvent('auth-change', { detail: { authenticated: true } }));
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  },

  getToken() {
    return localStorage.getItem('token');
  },

  getUser() {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  },

  async checkAuth() {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    try {
      // Check if token is expired
      const user = jwtDecode(token);
      const isExpired = user.exp * 1000 < Date.now();
      
      if (isExpired) {
        this.logout();
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Token validation error:', error);
      this.logout();
      return false;
    }
  },

  async isAdmin() {
    const user = this.getUser();
    return user && user.role === 'admin';
  },

  getAuthHeaders() {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
};