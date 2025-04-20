import { API_URL } from '../utils/constants.js';
import { AuthService } from './authService.js';

export const UserService = {
  async getUserProfile() {
    try {
      const response = await fetch(`${API_URL}/auth/profile`, {
        headers: {
          ...AuthService.getAuthHeaders()
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  async updateUserProfile(profileData) {
    try {
      const response = await fetch(`${API_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...AuthService.getAuthHeaders()
        },
        body: JSON.stringify(profileData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update user profile');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },

  async getTravelHistory() {
    try {
      const response = await fetch(`${API_URL}/auth/travel-history`, {
        headers: {
          ...AuthService.getAuthHeaders()
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch travel history');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching travel history:', error);
      throw error;
    }
  },

  async getSavedRoutes() {
    try {
      const response = await fetch(`${API_URL}/auth/saved-routes`, {
        headers: {
          ...AuthService.getAuthHeaders()
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch saved routes');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching saved routes:', error);
      throw error;
    }
  },

  async saveRoute(routeData) {
    try {
      const response = await fetch(`${API_URL}/auth/saved-routes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...AuthService.getAuthHeaders()
        },
        body: JSON.stringify(routeData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to save route');
      }

      return await response.json();
    } catch (error) {
      console.error('Error saving route:', error);
      throw error;
    }
  },

  async deleteSavedRoute(routeId) {
    try {
      const response = await fetch(`${API_URL}/auth/saved-routes/${routeId}`, {
        method: 'DELETE',
        headers: {
          ...AuthService.getAuthHeaders()
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete saved route');
      }

      return await response.json();
    } catch (error) {
      console.error('Error deleting saved route:', error);
      throw error;
    }
  }
};