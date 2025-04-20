import './index.css';
import App from './App.js';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the app
  App.init();

  // Check if user has dark mode preference
  if (localStorage.getItem('darkMode') === 'true' || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches && 
       localStorage.getItem('darkMode') !== 'false')) {
    document.documentElement.classList.add('dark');
  }
});