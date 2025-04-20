import { API_URL } from '../utils/constants.js';
import { AuthService } from './authService.js';

export const TrainService = {
  async getTrains() {
    try {
      const response = await fetch(`${API_URL}/trains`, {
        headers: {
          ...AuthService.getAuthHeaders()
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch trains');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching trains:', error);
      throw error;
    }
  },

  async getTrainById(id) {
    try {
      const response = await fetch(`${API_URL}/trains/${id}`, {
        headers: {
          ...AuthService.getAuthHeaders()
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch train');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching train:', error);
      throw error;
    }
  },

  async getCongestionPrediction() {
    try {
      const response = await fetch(`${API_URL}/predict/congestion`, {
        headers: {
          ...AuthService.getAuthHeaders()
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch congestion prediction');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching congestion prediction:', error);
      throw error;
    }
  },

  async getTrainSchedules() {
    try {
      const response = await fetch(`${API_URL}/schedule`, {
        headers: {
          ...AuthService.getAuthHeaders()
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch train schedules');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching train schedules:', error);
      throw error;
    }
  }
};