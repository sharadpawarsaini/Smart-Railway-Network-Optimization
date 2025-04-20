import { OptimizationService } from '../services/optimizationService.js';
import { formatDuration, formatCurrency } from '../utils/helpers.js';
import { STATIONS } from '../utils/constants.js';

class RouteOptimizer {
  constructor(container) {
    this.container = container;
    this.stations = STATIONS;
    this.selectedSource = null;
    this.selectedDestination = null;
    this.routes = {
      shortest: null,
      cheapest: null,
      leastCongested: null
    };
    this.render();
  }
  
  createForm() {
    return `
      <div class="card p-6 max-w-3xl mx-auto">
        <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">AI-Powered Route Optimizer</h2>
        
        <div class="bg-primary-50 dark:bg-dark-400 p-4 rounded-md mb-6">
          <div class="flex items-start">
            <svg class="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p class="text-sm text-gray-700 dark:text-gray-300">
              Our AI algorithm analyzes current network conditions to find the best route options for your journey. 
              Compare routes based on duration, price, and congestion levels.
            </p>
          </div>
        </div>
        
        <form id="route-optimizer-form" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="optimizer-source" class="label">From</label>
              <select id="optimizer-source" class="select" required>
                <option value="">Select departure station</option>
                ${this.stations.map(station => `
                  <option value="${station.id}">${station.name} (${station.code})</option>
                `).join('')}
              </select>
            </div>
            
            <div>
              <label for="optimizer-destination" class="label">To</label>
              <select id="optimizer-destination" class="select" required>
                <option value="">Select arrival station</option>
                ${this.stations.map(station => `
                  <option value="${station.id}">${station.name} (${station.code})</option>
                `).join('')}
              </select>
            </div>
          </div>
          
          <div class="flex justify-end">
            <button type="submit" id="find-routes-btn" class="btn btn-primary">
              Find Best Routes
            </button>
          </div>
        </form>
        
        <div id="routes-result" class="hidden mt-6 space-y-6">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">Optimal Routes</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Shortest Route -->
            <div id="shortest-route" class="card p-4">
              <div class="flex justify-between items-center mb-3">
                <h4 class="font-medium text-gray-900 dark:text-white">Shortest Route</h4>
                <span class="badge badge-primary">Dijkstra's Algorithm</span>
              </div>
              <div id="shortest-route-content" class="text-sm text-gray-600 dark:text-gray-400">
                <!-- Shortest route details will be inserted here -->
              </div>
            </div>
            
            <!-- Cheapest Route -->
            <div id="cheapest-route" class="card p-4">
              <div class="flex justify-between items-center mb-3">
                <h4 class="font-medium text-gray-900 dark:text-white">Cheapest Route</h4>
                <span class="badge badge-success">Bellman-Ford Algorithm</span>
              </div>
              <div id="cheapest-route-content" class="text-sm text-gray-600 dark:text-gray-400">
                <!-- Cheapest route details will be inserted here -->
              </div>
            </div>
            
            <!-- Least Congested Route -->
            <div id="least-congested-route" class="card p-4">
              <div class="flex justify-between items-center mb-3">
                <h4 class="font-medium text-gray-900 dark:text-white">Least Congested</h4>
                <span class="badge badge-warning">A* Algorithm</span>
              </div>
              <div id="least-congested-content" class="text-sm text-gray-600 dark:text-gray-400">
                <!-- Least congested route details will be inserted here -->
              </div>
            </div>
          </div>
          
          <div id="route-details" class="mt-6">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">Route Visualization</h3>
            <div id="route-visualization" class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 h-64 bg-gray-50 dark:bg-dark-400">
              <!-- Route visualization will be inserted here -->
              <div class="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                <p>Select a route to see detailed visualization</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  render() {
    this.container.innerHTML = this.createForm();
    this.attachEventListeners();
  }
  
  attachEventListeners() {
    const form = document.getElementById('route-optimizer-form');
    const sourceSelect = document.getElementById('optimizer-source');
    const destinationSelect = document.getElementById('optimizer-destination');
    
    // Update state when form values change
    sourceSelect.addEventListener('change', () => {
      this.selectedSource = sourceSelect.value ? parseInt(sourceSelect.value, 10) : null;
    });
    
    destinationSelect.addEventListener('change', () => {
      this.selectedDestination = destinationSelect.value ? parseInt(destinationSelect.value, 10) : null;
    });
    
    // Form submission
    form.addEventListener('submit', this.handleFindRoutes.bind(this));
  }
  
  async handleFindRoutes(e) {
    e.preventDefault();
    
    // Validate inputs
    if (!this.selectedSource || !this.selectedDestination) {
      alert('Please select both source and destination stations');
      return;
    }
    
    // Don't allow same source and destination
    if (this.selectedSource === this.selectedDestination) {
      alert('Source and destination stations cannot be the same');
      return;
    }
    
    try {
      // Show loading state
      const findRoutesBtn = document.getElementById('find-routes-btn');
      findRoutesBtn.disabled = true;
      findRoutesBtn.textContent = 'Finding Routes...';
      
      // Get routes from service
      const response = await OptimizationService.findRoutes(
        this.selectedSource,
        this.selectedDestination
      );
      
      // Store routes
      this.routes = {
        shortest: response.shortest,
        cheapest: response.cheapest,
        leastCongested: response.leastCongested
      };
      
      // Display the results
      this.displayRoutes();
      
      // Show results section
      document.getElementById('routes-result').classList.remove('hidden');
    } catch (error) {
      console.error('Error finding routes:', error);
      alert('Failed to find routes. Please try again.');
    } finally {
      // Restore button state
      const findRoutesBtn = document.getElementById('find-routes-btn');
      findRoutesBtn.disabled = false;
      findRoutesBtn.textContent = 'Find Best Routes';
    }
  }
  
  displayRoutes() {
    const shortestRouteContent = document.getElementById('shortest-route-content');
    const cheapestRouteContent = document.getElementById('cheapest-route-content');
    const leastCongestedContent = document.getElementById('least-congested-content');
    
    // Display shortest route
    if (this.routes.shortest) {
      shortestRouteContent.innerHTML = `
        <div>
          <div class="mb-2">
            <strong class="text-gray-900 dark:text-white">Stations:</strong>
            <p>${this.formatRoute(this.routes.shortest.stations)}</p>
          </div>
          <div class="mb-2">
            <strong class="text-gray-900 dark:text-white">Duration:</strong>
            <p>${formatDuration(this.routes.shortest.duration)}</p>
          </div>
          <div class="mb-2">
            <strong class="text-gray-900 dark:text-white">Price:</strong>
            <p>${formatCurrency(this.routes.shortest.price)}</p>
          </div>
          <div>
            <strong class="text-gray-900 dark:text-white">Congestion:</strong>
            <span class="inline-block w-full h-2 bg-gray-200 dark:bg-dark-500 rounded mt-1">
              <span class="inline-block h-2 bg-${this.getCongestionColor(this.routes.shortest.congestionLevel)} rounded" style="width: ${this.getCongestionPercentage(this.routes.shortest.congestionLevel)}%"></span>
            </span>
          </div>
          <button class="btn btn-outline mt-3 w-full text-sm py-1" data-route="shortest">View Details</button>
        </div>
      `;
    } else {
      shortestRouteContent.innerHTML = `<p>No shortest route found</p>`;
    }
    
    // Display cheapest route
    if (this.routes.cheapest) {
      cheapestRouteContent.innerHTML = `
        <div>
          <div class="mb-2">
            <strong class="text-gray-900 dark:text-white">Stations:</strong>
            <p>${this.formatRoute(this.routes.cheapest.stations)}</p>
          </div>
          <div class="mb-2">
            <strong class="text-gray-900 dark:text-white">Duration:</strong>
            <p>${formatDuration(this.routes.cheapest.duration)}</p>
          </div>
          <div class="mb-2">
            <strong class="text-gray-900 dark:text-white">Price:</strong>
            <p>${formatCurrency(this.routes.cheapest.price)}</p>
          </div>
          <div>
            <strong class="text-gray-900 dark:text-white">Congestion:</strong>
            <span class="inline-block w-full h-2 bg-gray-200 dark:bg-dark-500 rounded mt-1">
              <span class="inline-block h-2 bg-${this.getCongestionColor(this.routes.cheapest.congestionLevel)} rounded" style="width: ${this.getCongestionPercentage(this.routes.cheapest.congestionLevel)}%"></span>
            </span>
          </div>
          <button class="btn btn-outline mt-3 w-full text-sm py-1" data-route="cheapest">View Details</button>
        </div>
      `;
    } else {
      cheapestRouteContent.innerHTML = `<p>No cheapest route found</p>`;
    }
    
    // Display least congested route
    if (this.routes.leastCongested) {
      leastCongestedContent.innerHTML = `
        <div>
          <div class="mb-2">
            <strong class="text-gray-900 dark:text-white">Stations:</strong>
            <p>${this.formatRoute(this.routes.leastCongested.stations)}</p>
          </div>
          <div class="mb-2">
            <strong class="text-gray-900 dark:text-white">Duration:</strong>
            <p>${formatDuration(this.routes.leastCongested.duration)}</p>
          </div>
          <div class="mb-2">
            <strong class="text-gray-900 dark:text-white">Price:</strong>
            <p>${formatCurrency(this.routes.leastCongested.price)}</p>
          </div>
          <div>
            <strong class="text-gray-900 dark:text-white">Congestion:</strong>
            <span class="inline-block w-full h-2 bg-gray-200 dark:bg-dark-500 rounded mt-1">
              <span class="inline-block h-2 bg-${this.getCongestionColor(this.routes.leastCongested.congestionLevel)} rounded" style="width: ${this.getCongestionPercentage(this.routes.leastCongested.congestionLevel)}%"></span>
            </span>
          </div>
          <button class="btn btn-outline mt-3 w-full text-sm py-1" data-route="leastCongested">View Details</button>
        </div>
      `;
    } else {
      leastCongestedContent.innerHTML = `<p>No least congested route found</p>`;
    }
    
    // Add event listeners to view detail buttons
    document.querySelectorAll('[data-route]').forEach(button => {
      button.addEventListener('click', () => {
        const routeType = button.getAttribute('data-route');
        this.displayRouteVisualization(routeType);
      });
    });
  }
  
  displayRouteVisualization(routeType) {
    const route = this.routes[routeType];
    if (!route) return;
    
    const visualizationElement = document.getElementById('route-visualization');
    const sourceStation = this.getStationById(this.selectedSource);
    const destinationStation = this.getStationById(this.selectedDestination);
    
    // Sample visualization
    let algorithmName = '';
    let algorithmDescription = '';
    
    switch (routeType) {
      case 'shortest':
        algorithmName = 'Dijkstra\'s Algorithm';
        algorithmDescription = 'Finds the shortest path between nodes in a graph, which may represent, for example, railway stations.';
        break;
      case 'cheapest':
        algorithmName = 'Bellman-Ford Algorithm';
        algorithmDescription = 'Computes shortest paths from a single source vertex to all other vertices in a weighted digraph, even with negative weight edges.';
        break;
      case 'leastCongested':
        algorithmName = 'A* Algorithm';
        algorithmDescription = 'Uses heuristics to find the most efficient path through a network, incorporating real-time congestion data.';
        break;
    }
    
    visualizationElement.innerHTML = `
      <div class="h-full flex flex-col justify-between">
        <div>
          <h4 class="font-medium text-gray-900 dark:text-white">${algorithmName}</h4>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">${algorithmDescription}</p>
          
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <div class="text-xs text-gray-500 dark:text-gray-400">From</div>
              <div class="text-sm font-medium text-gray-900 dark:text-white">${sourceStation.name}</div>
            </div>
            <div class="flex-1 text-center">
              <svg class="w-6 h-6 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </div>
            <div class="flex-1 text-right">
              <div class="text-xs text-gray-500 dark:text-gray-400">To</div>
              <div class="text-sm font-medium text-gray-900 dark:text-white">${destinationStation.name}</div>
            </div>
          </div>
        </div>
        
        <div class="relative w-full h-16 bg-gray-100 dark:bg-dark-500 rounded-md overflow-hidden mt-3">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3">
            <div class="w-4 h-4 rounded-full bg-primary-500"></div>
          </div>
          <div class="absolute inset-y-0 right-0 flex items-center pr-3">
            <div class="w-4 h-4 rounded-full bg-accent-500"></div>
          </div>
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="flex space-x-1">
              ${route.stations.slice(1, -1).map((stationId) => `
                <div class="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600"></div>
              `).join('')}
            </div>
          </div>
          <div class="absolute inset-x-0 bottom-0 h-1 bg-${this.getCongestionColor(route.congestionLevel)}"></div>
        </div>
        
        <div class="flex justify-between items-center mt-3">
          <div>
            <span class="text-xs text-gray-500 dark:text-gray-400">Stops: </span>
            <span class="text-sm font-medium text-gray-900 dark:text-white">${route.stations.length - 2}</span>
          </div>
          <div>
            <span class="text-xs text-gray-500 dark:text-gray-400">Duration: </span>
            <span class="text-sm font-medium text-gray-900 dark:text-white">${formatDuration(route.duration)}</span>
          </div>
          <div>
            <span class="text-xs text-gray-500 dark:text-gray-400">Price: </span>
            <span class="text-sm font-medium text-gray-900 dark:text-white">${formatCurrency(route.price)}</span>
          </div>
        </div>
        
        <button class="btn btn-primary mt-3" data-action="book" data-route-type="${routeType}">
          Book This Route
        </button>
      </div>
    `;
    
    // Add event listener for booking button
    const bookButton = visualizationElement.querySelector('[data-action="book"]');
    if (bookButton) {
      bookButton.addEventListener('click', () => {
        // Redirect to booking page with this route pre-selected
        window.location.href = `/booking?source=${this.selectedSource}&destination=${this.selectedDestination}`;
      });
    }
  }
  
  formatRoute(stationIds) {
    return stationIds.map(id => this.getStationById(id).code).join(' → ');
  }
  
  getStationById(id) {
    return this.stations.find(station => station.id === id) || { name: 'Unknown', code: '???' };
  }
  
  getCongestionColor(level) {
    switch (level) {
      case 'low':
        return 'success-500';
      case 'medium':
        return 'warning-500';
      case 'high':
        return 'danger-500';
      default:
        return 'gray-500';
    }
  }
  
  getCongestionPercentage(level) {
    switch (level) {
      case 'low':
        return 30;
      case 'medium':
        return 60;
      case 'high':
        return 90;
      default:
        return 0;
    }
  }
}

export default RouteOptimizer;