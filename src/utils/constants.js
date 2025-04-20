// API URL - Change this to your actual backend URL
export const API_URL = 'http://localhost:5000/api';

// Map constants
export const MAP_WIDTH = 800;
export const MAP_HEIGHT = 600;

// Common station data for the app
export const STATIONS = [
  { id: 1, name: 'Central Station', code: 'CS', lat: 40.7128, lng: -74.0060 },
  { id: 2, name: 'Northgate', code: 'NG', lat: 40.7282, lng: -73.9942 },
  { id: 3, name: 'Westfield', code: 'WF', lat: 40.7098, lng: -74.0300 },
  { id: 4, name: 'Eastview', code: 'EV', lat: 40.7223, lng: -73.9874 },
  { id: 5, name: 'Southport', code: 'SP', lat: 40.6892, lng: -74.0445 },
  { id: 6, name: 'Riverside', code: 'RS', lat: 40.7489, lng: -73.9680 },
  { id: 7, name: 'Hilltop', code: 'HT', lat: 40.7420, lng: -74.0079 },
  { id: 8, name: 'Valleytown', code: 'VT', lat: 40.6782, lng: -73.9442 },
  { id: 9, name: 'Mountainview', code: 'MV', lat: 40.7731, lng: -73.9712 },
  { id: 10, name: 'Lakeside', code: 'LS', lat: 40.7214, lng: -74.0430 }
];

// Train types and their features
export const TRAIN_TYPES = [
  { id: 1, type: 'Express', speed: 'High', comfort: 'Premium' },
  { id: 2, type: 'Regular', speed: 'Medium', comfort: 'Standard' },
  { id: 3, type: 'Local', speed: 'Low', comfort: 'Basic' }
];

// Chart color schemes
export const CHART_COLORS = {
  primary: [
    'rgba(59, 130, 246, 0.8)',
    'rgba(37, 99, 235, 0.8)',
    'rgba(29, 78, 216, 0.8)'
  ],
  secondary: [
    'rgba(14, 165, 233, 0.8)',
    'rgba(2, 132, 199, 0.8)',
    'rgba(3, 105, 161, 0.8)'
  ],
  accent: [
    'rgba(239, 68, 68, 0.8)',
    'rgba(220, 38, 38, 0.8)',
    'rgba(185, 28, 28, 0.8)'
  ],
  success: [
    'rgba(16, 185, 129, 0.8)',
    'rgba(5, 150, 105, 0.8)',
    'rgba(4, 120, 87, 0.8)'
  ],
  warning: [
    'rgba(245, 158, 11, 0.8)',
    'rgba(217, 119, 6, 0.8)',
    'rgba(180, 83, 9, 0.8)'
  ]
};