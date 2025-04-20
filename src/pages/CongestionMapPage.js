import CongestionMap from '../components/CongestionMap.js';
import { TrainService } from '../services/trainService.js';

export default function CongestionMapPage() {
  const pageContent = `
    <div class="pt-16 mt-4">
      <div class="page-container">
        <div class="bg-white dark:bg-dark-200 rounded-lg shadow-md p-6 mb-6">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Real-Time Train Congestion Map</h1>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Visualize current network congestion levels and AI-predicted hotspots to plan your journey better.
            The map shows real-time data with color-coded congestion levels.
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div class="p-4 bg-success-100 dark:bg-success-900 dark:bg-opacity-20 rounded-lg text-center">
              <div class="text-sm font-medium text-success-800 dark:text-success-300">Low Congestion</div>
              <div class="mt-1 flex items-center justify-center">
                <div class="w-3 h-3 rounded-full bg-success-500 mr-1"></div>
                <span class="text-success-700 dark:text-success-400">Smooth travel</span>
              </div>
            </div>
            
            <div class="p-4 bg-warning-100 dark:bg-warning-900 dark:bg-opacity-20 rounded-lg text-center">
              <div class="text-sm font-medium text-warning-800 dark:text-warning-300">Medium Congestion</div>
              <div class="mt-1 flex items-center justify-center">
                <div class="w-3 h-3 rounded-full bg-warning-500 mr-1"></div>
                <span class="text-warning-700 dark:text-warning-400">Some delays</span>
              </div>
            </div>
            
            <div class="p-4 bg-danger-100 dark:bg-danger-900 dark:bg-opacity-20 rounded-lg text-center">
              <div class="text-sm font-medium text-danger-800 dark:text-danger-300">High Congestion</div>
              <div class="mt-1 flex items-center justify-center">
                <div class="w-3 h-3 rounded-full bg-danger-500 mr-1"></div>
                <span class="text-danger-700 dark:text-danger-400">Significant delays</span>
              </div>
            </div>
            
            <div class="p-4 bg-primary-100 dark:bg-primary-900 dark:bg-opacity-20 rounded-lg text-center">
              <div class="text-sm font-medium text-primary-800 dark:text-primary-300">AI Predictions</div>
              <div class="mt-1 flex items-center justify-center">
                <div class="w-3 h-3 rounded-full bg-primary-500 animate-pulse mr-1"></div>
                <span class="text-primary-700 dark:text-primary-400">Future congestion</span>
              </div>
            </div>
          </div>
          
          <div id="congestion-map-container" class="w-full flex justify-center">
            <!-- Map will be rendered here by JavaScript -->
            <div class="loader">
              <div class="loader-spinner"></div>
            </div>
          </div>
          
          <div class="flex justify-between mt-6">
            <button id="refresh-map-btn" class="btn btn-outline">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Refresh Data
            </button>
            <a href="/route-optimizer" class="btn btn-primary">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
              Find Optimal Route
            </a>
          </div>
        </div>
        
        <div class="bg-white dark:bg-dark-200 rounded-lg shadow-md p-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Understanding the Map</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">How to Use</h3>
              <ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Hover over a route to see detailed congestion information</li>
                <li>Station markers show major railway stations</li>
                <li>Moving train indicators show active trains</li>
                <li>Color-coded routes indicate current congestion levels</li>
                <li>Click on a station to see departures and arrivals</li>
              </ul>
            </div>
            
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">AI Prediction Overlay</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-2">
                Our AI model predicts future congestion based on:
              </p>
              <ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Historical traffic patterns for this time/day</li>
                <li>Current passenger volume throughout the network</li>
                <li>Special events happening nearby</li>
                <li>Weather conditions affecting travel</li>
                <li>Scheduled maintenance and service disruptions</li>
              </ul>
            </div>
          </div>
          
          <div class="mt-6 p-4 bg-primary-50 dark:bg-primary-900 dark:bg-opacity-10 rounded-lg">
            <div class="flex items-start">
              <svg class="w-6 h-6 text-primary-600 dark:text-primary-400 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p class="text-gray-700 dark:text-gray-300">
                <strong>Pro Tip:</strong> For the best travel experience, plan your journey for low-congestion periods or 
                choose alternative routes shown by our AI. You can also use the Route Optimizer to find the best path based 
                on your preferences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Initialize map after the page is rendered
  setTimeout(() => {
    initCongestionMap();
  }, 0);
  
  return pageContent;
}

function initCongestionMap() {
  const container = document.getElementById('congestion-map-container');
  if (!container) return;
  
  // Clear loading indicator
  container.innerHTML = '';
  
  // Create the map
  const map = new CongestionMap(container);
  map.render();
  
  // Add event listener for refresh button
  const refreshButton = document.getElementById('refresh-map-btn');
  if (refreshButton) {
    refreshButton.addEventListener('click', async () => {
      refreshButton.disabled = true;
      refreshButton.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Refreshing...
      `;
      
      try {
        // Fetch new congestion data
        const congestionData = await TrainService.getCongestionPrediction();
        
        // Update the map
        map.update(congestionData);
        
        // Show success message
        showToast('Map updated with latest data');
      } catch (error) {
        console.error('Error refreshing map:', error);
        showToast('Failed to refresh map data', 'error');
      } finally {
        // Reset button
        refreshButton.disabled = false;
        refreshButton.innerHTML = `
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          Refresh Data
        `;
      }
    });
  }
  
  // Track failed attempts for backoff strategy
  let failedAttempts = 0;
  const maxRetries = 3;
  
  // Auto-refresh the map every 60 seconds
  const autoRefreshInterval = setInterval(async () => {
    try {
      // If we've had too many consecutive failures, reduce frequency temporarily
      if (failedAttempts >= maxRetries) {
        console.log(`Auto-refresh temporarily paused due to ${failedAttempts} consecutive failures`);
        // Reset after extended pause (3x normal interval)
        setTimeout(() => {
          failedAttempts = 0;
          console.log('Auto-refresh resumed after backoff period');
        }, 180000);
        return;
      }
      
      // Attempt to fetch the congestion data
      const congestionData = await fetchWithTimeout(
        () => TrainService.getCongestionPrediction(),
        5000 // 5 second timeout
      );
      
      // If we get here, the fetch was successful
      failedAttempts = 0;
      
      // Update the map with the new data
      if (congestionData) {
        map.update(congestionData);
      }
    } catch (error) {
      failedAttempts++;
      
      // Detailed error logging
      if (error.name === 'TimeoutError') {
        console.error('Auto-refresh timed out:', error.message);
      } else if (error.status) {
        console.error(`Auto-refresh failed with status ${error.status}:`, error.statusText || error.message);
      } else {
        console.error('Error auto-refreshing map:', error.message || 'Network error');
      }
      
      // Log the retry attempt
      if (failedAttempts < maxRetries) {
        console.log(`Will retry auto-refresh. Attempt ${failedAttempts} of ${maxRetries}`);
      } else {
        console.warn(`Auto-refresh backing off after ${failedAttempts} failed attempts`);
      }
    }
  }, 60000);
  
  // Clean up interval when navigating away
  window.addEventListener('popstate', () => {
    clearInterval(autoRefreshInterval);
  });
}

// Utility to fetch with timeout
async function fetchWithTimeout(fetchFunc, timeoutMs) {
  return new Promise(async (resolve, reject) => {
    // Set timeout
    const timeoutId = setTimeout(() => {
      reject(new Error('Request timed out'));
    }, timeoutMs);
    
    try {
      // Perform the fetch
      const response = await fetchFunc();
      clearTimeout(timeoutId);
      resolve(response);
    } catch (error) {
      clearTimeout(timeoutId);
      reject(error);
    }
  });
}

function showToast(message, type = 'success') {
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `fixed bottom-4 right-4 ${type === 'success' ? 'bg-success-500' : 'bg-danger-500'} text-white px-4 py-2 rounded-md shadow-lg z-50 transform translate-y-0 opacity-100 transition-all duration-300`;
  toast.textContent = message;
  
  // Add to body
  document.body.appendChild(toast);
  
  // Remove after 3 seconds
  setTimeout(() => {
    toast.classList.add('translate-y-2', 'opacity-0');
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}