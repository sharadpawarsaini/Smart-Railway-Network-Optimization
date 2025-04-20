import RouteOptimizer from '../components/RouteOptimizer.js';

export default function RouteOptimizerPage() {
  const pageContent = `
    <div class="pt-16 mt-4">
      <div class="page-container">
        <div class="bg-white dark:bg-dark-200 rounded-lg shadow-md p-6 mb-6">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">AI-Powered Route Optimizer</h1>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Find the optimal route for your journey using our advanced AI algorithms. We analyze multiple factors
            including distance, congestion, and price to provide you with the best options.
          </p>
          
          <div id="route-optimizer-container">
            <!-- Route optimizer component will be rendered here by JavaScript -->
            <div class="loader">
              <div class="loader-spinner"></div>
            </div>
          </div>
        </div>
        
        <div class="bg-white dark:bg-dark-200 rounded-lg shadow-md p-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">About Our Routing Algorithms</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div class="flex items-center mb-3">
                <div class="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 dark:bg-opacity-50 flex items-center justify-center mr-3">
                  <svg class="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">Dijkstra's Algorithm</h3>
              </div>
              <p class="text-gray-600 dark:text-gray-400">
                Finds the shortest path between stations by considering the distance between each station. Perfect when you need to get to your destination quickly.
              </p>
            </div>
            
            <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div class="flex items-center mb-3">
                <div class="w-10 h-10 rounded-full bg-success-100 dark:bg-success-900 dark:bg-opacity-50 flex items-center justify-center mr-3">
                  <svg class="w-6 h-6 text-success-600 dark:text-success-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">Bellman-Ford Algorithm</h3>
              </div>
              <p class="text-gray-600 dark:text-gray-400">
                Considers ticket prices as weights to find the most economical route. This algorithm ensures you get the best value for your money.
              </p>
            </div>
            
            <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div class="flex items-center mb-3">
                <div class="w-10 h-10 rounded-full bg-warning-100 dark:bg-warning-900 dark:bg-opacity-50 flex items-center justify-center mr-3">
                  <svg class="w-6 h-6 text-warning-600 dark:text-warning-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">A* Algorithm</h3>
              </div>
              <p class="text-gray-600 dark:text-gray-400">
                Uses heuristics to find paths with the least congestion. This ensures a comfortable journey with minimal crowding and potential delays.
              </p>
            </div>
          </div>
          
          <div class="mt-6 p-4 bg-primary-50 dark:bg-primary-900 dark:bg-opacity-10 rounded-lg">
            <div class="flex items-start">
              <svg class="w-6 h-6 text-primary-600 dark:text-primary-400 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p class="text-gray-700 dark:text-gray-300">
                <strong>How it works:</strong> Our AI combines these algorithms with real-time data from our network to provide 
                you with multiple route options. You can choose the one that best fits your preferences - whether you prioritize 
                speed, cost, or comfort. The system also considers historical data and current conditions to make accurate predictions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Initialize route optimizer after the page is rendered
  setTimeout(() => {
    initRouteOptimizer();
  }, 0);
  
  return pageContent;
}

function initRouteOptimizer() {
  const container = document.getElementById('route-optimizer-container');
  if (!container) return;
  
  // Clear loading indicator
  container.innerHTML = '';
  
  // Create the route optimizer
  new RouteOptimizer(container);
}