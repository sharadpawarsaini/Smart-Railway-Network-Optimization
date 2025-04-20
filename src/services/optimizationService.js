import { API_URL } from '../utils/constants.js';
import { AuthService } from './authService.js';

export const OptimizationService = {
  async findRoutes(source, destination) {
    try {
      const response = await fetch(`${API_URL}/optimization/routes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...AuthService.getAuthHeaders()
        },
        body: JSON.stringify({
          source,
          destination
        })
      });

      if (!response.ok) {
        throw new Error('Failed to find routes');
      }

      return await response.json();
    } catch (error) {
      console.error('Error finding routes:', error);
      throw error;
    }
  },

  async getStations() {
    try {
      const response = await fetch(`${API_URL}/trains/stations`, {
        headers: {
          ...AuthService.getAuthHeaders()
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch stations');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching stations:', error);
      throw error;
    }
  },

  async getCongestionData() {
    try {
      const response = await fetch(`${API_URL}/optimization/congestion`, {
        headers: {
          ...AuthService.getAuthHeaders()
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch congestion data');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching congestion data:', error);
      throw error;
    }
  },

  async triggerModelRetraining() {
    try {
      const response = await fetch(`${API_URL}/optimization/retrain-model`, {
        method: 'POST',
        headers: {
          ...AuthService.getAuthHeaders()
        }
      });

      if (!response.ok) {
        throw new Error('Failed to trigger model retraining');
      }

      return await response.json();
    } catch (error) {
      console.error('Error triggering model retraining:', error);
      throw error;
    }
  }
};