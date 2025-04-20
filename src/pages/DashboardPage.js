import { UserService } from '../services/userService.js';
import { BookingService } from '../services/bookingService.js';
import { formatDate, formatTime, formatCurrency } from '../utils/helpers.js';
import Chart from 'chart.js/auto';
import { CHART_COLORS } from '../utils/constants.js';

export default function DashboardPage() {
  const pageContent = `
    <div class="pt-16 mt-4">
      <div class="page-container">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2 md:mb-0">Personal Dashboard</h1>
          <div class="flex space-x-2">
            <a href="/booking" class="btn btn-primary">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path>
              </svg>
              Book Ticket
            </a>
            <a href="/route-optimizer" class="btn btn-outline">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
              </svg>
              Find Routes
            </a>
          </div>
        </div>
        
        <!-- Stats Overview -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div class="card p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-primary-100 dark:bg-primary-900 dark:bg-opacity-50 rounded-md p-3">
                <svg class="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Trips</h3>
                <p class="text-3xl font-bold text-primary-600 dark:text-primary-400" id="upcoming-trips-count">-</p>
              </div>
            </div>
          </div>
          
          <div class="card p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-success-100 dark:bg-success-900 dark:bg-opacity-50 rounded-md p-3">
                <svg class="w-6 h-6 text-success-600 dark:text-success-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Past Trips</h3>
                <p class="text-3xl font-bold text-success-600 dark:text-success-400" id="past-trips-count">-</p>
              </div>
            </div>
          </div>
          
          <div class="card p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-warning-100 dark:bg-warning-900 dark:bg-opacity-50 rounded-md p-3">
                <svg class="w-6 h-6 text-warning-600 dark:text-warning-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Savings</h3>
                <p class="text-3xl font-bold text-warning-600 dark:text-warning-400" id="total-savings">-</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Upcoming Trips -->
        <div class="card mb-6">
          <div class="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white">Upcoming Trips</h2>
          </div>
          <div class="p-4">
            <div id="upcoming-trips-list" class="space-y-4">
              <div class="loader">
                <div class="loader-spinner"></div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Travel History Chart -->
        <div class="card mb-6">
          <div class="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white">Travel Patterns</h2>
          </div>
          <div class="p-4">
            <canvas id="travel-patterns-chart" height="250"></canvas>
          </div>
        </div>
        
        <!-- Travel Suggestions -->
        <div class="card">
          <div class="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white">Personalized Suggestions</h2>
          </div>
          <div class="p-4">
            <div id="travel-suggestions" class="space-y-4">
              <div class="loader">
                <div class="loader-spinner"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Initialize dashboard data after the page is rendered
  setTimeout(() => {
    loadDashboardData();
  }, 0);
  
  return pageContent;
}

async function loadDashboardData() {
  try {
    // Fetch user bookings
    const bookings = await BookingService.getUserBookings();
    
    // Fetch user travel history
    const travelHistory = await UserService.getTravelHistory();
    
    // Display the data
    displayStats(bookings, travelHistory);
    displayUpcomingTrips(bookings);
    displayTravelPatterns(travelHistory);
    displayTravelSuggestions(travelHistory);
  } catch (error) {
    console.error('Error loading dashboard data:', error);
    
    // Display error messages
    document.getElementById('upcoming-trips-list').innerHTML = `
      <div class="text-center py-4">
        <p class="text-danger-600 dark:text-danger-400">Failed to load trip data. Please try again.</p>
        <button id="retry-dashboard-btn" class="btn btn-outline mt-2">Retry</button>
      </div>
    `;
    
    document.getElementById('travel-suggestions').innerHTML = `
      <div class="text-center py-4">
        <p class="text-danger-600 dark:text-danger-400">Failed to load suggestions. Please try again.</p>
      </div>
    `;
    
    // Add retry button listener
    const retryButton = document.getElementById('retry-dashboard-btn');
    if (retryButton) {
      retryButton.addEventListener('click', () => {
        loadDashboardData();
      });
    }
  }
}

function displayStats(bookings, travelHistory) {
  // Count upcoming and past trips
  const upcomingTrips = bookings.filter(booking => 
    booking.status.toLowerCase() === 'upcoming' || booking.status.toLowerCase() === 'confirmed'
  );
  
  const pastTrips = travelHistory.filter(trip => 
    trip.status.toLowerCase() === 'completed'
  );
  
  // Calculate savings (example calculation - in a real app this would be more sophisticated)
  let savings = 0;
  travelHistory.forEach(trip => {
    if (trip.originalPrice && trip.price) {
      savings += (trip.originalPrice - trip.price);
    }
  });
  
  // Update the stats
  document.getElementById('upcoming-trips-count').textContent = upcomingTrips.length;
  document.getElementById('past-trips-count').textContent = pastTrips.length;
  document.getElementById('total-savings').textContent = formatCurrency(savings);
}

function displayUpcomingTrips(bookings) {
  const upcomingTripsElement = document.getElementById('upcoming-trips-list');
  
  // Filter upcoming trips
  const upcomingTrips = bookings.filter(booking => 
    booking.status.toLowerCase() === 'upcoming' || booking.status.toLowerCase() === 'confirmed'
  ).sort((a, b) => new Date(a.date) - new Date(b.date));
  
  // Display upcoming trips or a message if none
  if (upcomingTrips.length === 0) {
    upcomingTripsElement.innerHTML = `
      <div class="text-center py-8">
        <svg class="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="mt-2 text-gray-500 dark:text-gray-400">No upcoming trips.</p>
        <a href="/booking" class="btn btn-primary mt-4">Book Your Next Trip</a>
      </div>
    `;
    return;
  }
  
  // Create HTML for each upcoming trip
  const tripsHTML = upcomingTrips.slice(0, 3).map(trip => `
    <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <div class="mb-4 md:mb-0">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-primary-600 dark:text-primary-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">${trip.source} to ${trip.destination}</h3>
            <span class="ml-2 badge badge-primary">${trip.status}</span>
          </div>
          <div class="mt-1 text-sm text-gray-600 dark:text-gray-400">
            <span>${formatDate(trip.date)}</span>
            <span class="mx-1">•</span>
            <span>Departure: ${trip.departureTime}</span>
            <span class="mx-1">•</span>
            <span>Ticket #${trip.ticketReference}</span>
          </div>
        </div>
        <div>
          <span class="text-lg font-bold text-gray-900 dark:text-white">${trip.price}</span>
          <a href="#" class="ml-4 btn btn-outline text-sm py-1 px-3">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
            View
          </a>
        </div>
      </div>
    </div>
  `).join('');
  
  // Add a "View All" button if there are more than 3 trips
  const viewAllButton = upcomingTrips.length > 3 ? `
    <div class="text-center mt-4">
      <a href="/profile" class="btn btn-outline">
        View All ${upcomingTrips.length} Trips
      </a>
    </div>
  ` : '';
  
  upcomingTripsElement.innerHTML = tripsHTML + viewAllButton;
}

function displayTravelPatterns(travelHistory) {
  const ctx = document.getElementById('travel-patterns-chart');
  if (!ctx) return;
  
  // Calculate travel frequency by day of week
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayFrequency = Array(7).fill(0);
  
  travelHistory.forEach(trip => {
    const date = new Date(trip.date);
    const day = date.getDay();
    dayFrequency[day]++;
  });
  
  // Create the chart
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: daysOfWeek,
      datasets: [{
        label: 'Travel Frequency',
        data: dayFrequency,
        backgroundColor: CHART_COLORS.primary,
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Your Travel Patterns by Day of Week',
          font: {
            size: 16
          },
          padding: {
            bottom: 10
          },
          color: '#4B5563'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.parsed.y} trips`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#9CA3AF'
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(156, 163, 175, 0.1)'
          },
          ticks: {
            precision: 0,
            color: '#9CA3AF'
          }
        }
      }
    }
  });
}

function displayTravelSuggestions(travelHistory) {
  const suggestionsElement = document.getElementById('travel-suggestions');
  
  // Create suggestions based on travel history
  // In a real app, this would use more sophisticated AI algorithms
  if (travelHistory.length === 0) {
    suggestionsElement.innerHTML = `
      <div class="text-center py-4">
        <p class="text-gray-500 dark:text-gray-400">We need more travel data to provide personalized suggestions.</p>
        <a href="/booking" class="btn btn-primary mt-2">Book Your First Trip</a>
      </div>
    `;
    return;
  }
  
  // Find most frequent route
  const routeFrequency = {};
  travelHistory.forEach(trip => {
    const route = `${trip.source}-${trip.destination}`;
    routeFrequency[route] = (routeFrequency[route] || 0) + 1;
  });
  
  const mostFrequentRoute = Object.keys(routeFrequency).reduce((a, b) => 
    routeFrequency[a] > routeFrequency[b] ? a : b
  );
  
  const [frequentSource, frequentDestination] = mostFrequentRoute.split('-');
  
  // Calculate best travel time
  const dayFrequency = Array(7).fill(0);
  travelHistory.forEach(trip => {
    const date = new Date(trip.date);
    const day = date.getDay();
    dayFrequency[day]++;
  });
  
  const bestDayIndex = dayFrequency.indexOf(Math.max(...dayFrequency));
  const bestDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][bestDayIndex];
  
  // Generate suggestions
  suggestionsElement.innerHTML = `
    <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Frequent Route</h3>
      <p class="text-gray-600 dark:text-gray-400 mb-2">
        You travel from <strong>${frequentSource}</strong> to <strong>${frequentDestination}</strong> frequently.
        Consider saving this route for quick booking.
      </p>
      <a href="/route-optimizer?source=${frequentSource}&destination=${frequentDestination}" class="btn btn-primary text-sm">
        Optimize This Route
      </a>
    </div>
    
    <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Best Travel Time</h3>
      <p class="text-gray-600 dark:text-gray-400 mb-2">
        Based on your travel history, <strong>${bestDay}</strong> seems to be your preferred travel day.
        For this day, booking tickets between 10:00 AM and 2:00 PM typically offers lower congestion and better pricing.
      </p>
      <a href="/booking" class="btn btn-outline text-sm">
        Book for ${bestDay}
      </a>
    </div>
    
    <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Travel Habits Insight</h3>
      <p class="text-gray-600 dark:text-gray-400 mb-2">
        You've traveled ${travelHistory.length} times in the past. 
        Your travel pattern indicates a preference for ${
          dayFrequency[0] + dayFrequency[6] > dayFrequency[1] + dayFrequency[2] + dayFrequency[3] + dayFrequency[4] + dayFrequency[5] 
            ? 'weekend' 
            : 'weekday'
        } travel.
      </p>
      <div class="mt-2 bg-primary-50 dark:bg-primary-900 dark:bg-opacity-20 p-3 rounded-md">
        <div class="flex items-start">
          <svg class="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p class="text-sm text-primary-700 dark:text-primary-300">
            You could save up to 15% by traveling during off-peak hours on ${
              dayFrequency[0] + dayFrequency[6] > dayFrequency[1] + dayFrequency[2] + dayFrequency[3] + dayFrequency[4] + dayFrequency[5] 
                ? 'weekends' 
                : 'weekdays'
            }.
          </p>
        </div>
      </div>
    </div>
  `;
}