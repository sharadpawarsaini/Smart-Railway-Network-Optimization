import { API_URL } from '../utils/constants.js';
import { AuthService } from './authService.js';

export const BookingService = {
  async searchTickets(source, destination, date) {
    try {
      const response = await fetch(`${API_URL}/ticketing/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...AuthService.getAuthHeaders()
        },
        body: JSON.stringify({
          source,
          destination,
          date
        })
      });

      if (!response.ok) {
        throw new Error('Failed to search tickets');
      }

      return await response.json();
    } catch (error) {
      console.error('Error searching tickets:', error);
      throw error;
    }
  },

  async bookTicket(bookingData) {
    try {
      const response = await fetch(`${API_URL}/ticketing/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...AuthService.getAuthHeaders()
        },
        body: JSON.stringify(bookingData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to book ticket');
      }

      return await response.json();
    } catch (error) {
      console.error('Error booking ticket:', error);
      throw error;
    }
  },

  async getUserBookings() {
    try {
      const response = await fetch(`${API_URL}/ticketing/user-bookings`, {
        headers: {
          ...AuthService.getAuthHeaders()
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user bookings');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching user bookings:', error);
      throw error;
    }
  },

  async getDynamicPricing(source, destination, date, time) {
    try {
      const response = await fetch(`${API_URL}/ticketing/price`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...AuthService.getAuthHeaders()
        },
        body: JSON.stringify({
          source,
          destination,
          date,
          time
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get dynamic pricing');
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting dynamic pricing:', error);
      throw error;
    }
  },

  async getAlternativeRoutes(source, destination, date) {
    try {
      const response = await fetch(`${API_URL}/optimization/alternatives`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...AuthService.getAuthHeaders()
        },
        body: JSON.stringify({
          source,
          destination,
          date
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get alternative routes');
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting alternative routes:', error);
      throw error;
    }
  }
};