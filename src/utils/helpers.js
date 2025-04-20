// Format date to YYYY-MM-DD
export const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Format time to HH:MM
export const formatTime = (time) => {
  const d = new Date(time);
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
};

// Duration formatter (minutes to HH:MM)
export const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

// Debounce function for input handlers
export const debounce = (func, delay) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
};

// Create tooltip element
export const createTooltip = (content) => {
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.textContent = content;
  document.body.appendChild(tooltip);
  return tooltip;
};

// Position and show tooltip
export const showTooltip = (tooltip, event) => {
  tooltip.style.left = `${event.pageX + 10}px`;
  tooltip.style.top = `${event.pageY + 10}px`;
  tooltip.classList.add('tooltip-visible');
};

// Hide tooltip
export const hideTooltip = (tooltip) => {
  tooltip.classList.remove('tooltip-visible');
};

// Get random congestion level for demo purposes
export const getRandomCongestionLevel = () => {
  const levels = ['low', 'medium', 'high'];
  return levels[Math.floor(Math.random() * levels.length)];
};

// Get color based on congestion level
export const getCongestionColor = (level) => {
  const colors = {
    low: '#10B981', // success-500
    medium: '#F59E0B', // warning-500
    high: '#EF4444' // danger-500
  };
  return colors[level] || colors.low;
};

// Generate a random ID
export const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Toggle dark mode
export const toggleDarkMode = () => {
  const isDarkMode = document.documentElement.classList.toggle('dark');
  localStorage.setItem('darkMode', isDarkMode);
  return isDarkMode;
};

// Check if dark mode is enabled
export const isDarkMode = () => {
  return document.documentElement.classList.contains('dark');
};