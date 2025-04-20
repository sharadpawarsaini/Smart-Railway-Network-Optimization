import { UserService } from '../services/userService.js';
import { BookingService } from '../services/bookingService.js';
import { formatDate, formatTime } from '../utils/helpers.js';
import { AuthService } from '../services/authService.js';

class UserProfile {
  constructor(container) {
    this.container = container;
    this.user = null;
    this.travelHistory = [];
    this.savedRoutes = [];
    this.activeTab = 'profile'; // Default active tab
    this.render();
  }
  
  createProfile() {
    return `
      <div class="max-w-4xl mx-auto p-4">
        <div class="card overflow-hidden">
          <!-- Header -->
          <div class="p-6 bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-800 dark:to-primary-900">
            <div class="flex flex-col md:flex-row items-center">
              <div class="w-24 h-24 bg-white dark:bg-dark-200 rounded-full flex items-center justify-center mb-4 md:mb-0 md:mr-6">
                <svg class="w-16 h-16 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <div class="text-center md:text-left">
                <h2 class="text-2xl font-bold text-white" id="user-name">Loading...</h2>
                <p class="text-primary-100" id="user-email">Loading...</p>
                <div class="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-700 text-primary-100">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span id="user-member-since">Member since: Loading...</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Tabs -->
          <div class="flex border-b border-gray-200 dark:border-gray-700">
            <button id="profile-tab" class="tab-button px-4 py-3 text-sm font-medium text-primary-600 dark:text-primary-400 border-b-2 border-primary-500 flex-1 text-center">
              My Profile
            </button>
            <button id="history-tab" class="tab-button px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 border-b-2 border-transparent hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 flex-1 text-center">
              Travel History
            </button>
            <button id="saved-routes-tab" class="tab-button px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 border-b-2 border-transparent hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 flex-1 text-center">
              Saved Routes
            </button>
          </div>
          
          <!-- Content -->
          <div class="p-6">
            <!-- Profile Form -->
            <div id="profile-content" class="tab-content">
              <form id="profile-form" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="profile-first-name" class="label">First Name</label>
                    <input type="text" id="profile-first-name" class="input" placeholder="First Name">
                  </div>
                  <div>
                    <label for="profile-last-name" class="label">Last Name</label>
                    <input type="text" id="profile-last-name" class="input" placeholder="Last Name">
                  </div>
                </div>
                
                <div>
                  <label for="profile-email" class="label">Email</label>
                  <input type="email" id="profile-email" class="input" placeholder="Email" disabled>
                </div>
                
                <div>
                  <label for="profile-phone" class="label">Phone Number</label>
                  <input type="tel" id="profile-phone" class="input" placeholder="Phone Number">
                </div>
                
                <div>
                  <label for="profile-address" class="label">Address</label>
                  <input type="text" id="profile-address" class="input" placeholder="Address">
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="profile-city" class="label">City</label>
                    <input type="text" id="profile-city" class="input" placeholder="City">
                  </div>
                  <div>
                    <label for="profile-postal-code" class="label">Postal Code</label>
                    <input type="text" id="profile-postal-code" class="input" placeholder="Postal Code">
                  </div>
                </div>
                
                <div>
                  <label for="profile-preferences" class="label">Travel Preferences</label>
                  <select id="profile-preferences" class="select">
                    <option value="fastest">Fastest Route</option>
                    <option value="cheapest">Cheapest Route</option>
                    <option value="least_congested">Least Congested</option>
                  </select>
                </div>
                
                <div class="pt-4">
                  <button type="submit" class="btn btn-primary w-full">Update Profile</button>
                </div>
              </form>
            </div>
            
            <!-- Travel History -->
            <div id="history-content" class="tab-content hidden">
              <div class="bg-gray-50 dark:bg-dark-400 p-4 rounded-md mb-4">
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-primary-600 dark:text-primary-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                  </svg>
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Travel History</h3>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">View your recent trips and travel patterns.</p>
              </div>
              
              <div id="travel-history-list" class="space-y-4">
                <div class="loader">
                  <div class="loader-spinner"></div>
                </div>
              </div>
            </div>
            
            <!-- Saved Routes -->
            <div id="saved-routes-content" class="tab-content hidden">
              <div class="bg-gray-50 dark:bg-dark-400 p-4 rounded-md mb-4">
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-primary-600 dark:text-primary-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                  </svg>
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Saved Routes</h3>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Quickly access your favorite and frequently used routes.</p>
              </div>
              
              <div id="saved-routes-list" class="space-y-4">
                <div class="loader">
                  <div class="loader-spinner"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  render() {
    this.container.innerHTML = this.createProfile();
    this.attachEventListeners();
    this.loadUserData();
  }
  
  attachEventListeners() {
    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Get the tab id
        const tabId = button.id.replace('-tab', '');
        
        // Update active tab state
        this.activeTab = tabId;
        
        // Update button styles
        tabButtons.forEach(btn => {
          if (btn.id === `${tabId}-tab`) {
            btn.classList.remove('text-gray-500', 'dark:text-gray-400', 'border-transparent');
            btn.classList.add('text-primary-600', 'dark:text-primary-400', 'border-primary-500');
          } else {
            btn.classList.remove('text-primary-600', 'dark:text-primary-400', 'border-primary-500');
            btn.classList.add('text-gray-500', 'dark:text-gray-400', 'border-transparent');
          }
        });
        
        // Show the selected tab content
        tabContents.forEach(content => {
          if (content.id === `${tabId}-content`) {
            content.classList.remove('hidden');
          } else {
            content.classList.add('hidden');
          }
        });
        
        // Load data for the selected tab if needed
        if (tabId === 'history' && this.travelHistory.length === 0) {
          this.loadTravelHistory();
        } else if (tabId === 'saved-routes' && this.savedRoutes.length === 0) {
          this.loadSavedRoutes();
        }
      });
    });
    
    // Profile form submission
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
      profileForm.addEventListener('submit', this.handleProfileUpdate.bind(this));
    }
  }
  
  async loadUserData() {
    try {
      // Get the user from auth service
      this.user = AuthService.getUser();
      
      // If no user is found, fetch from API
      if (!this.user) {
        const userProfile = await UserService.getUserProfile();
        this.user = userProfile;
      }
      
      // Update the profile display
      this.updateProfileDisplay();
      
      // Load data for the active tab
      if (this.activeTab === 'history') {
        this.loadTravelHistory();
      } else if (this.activeTab === 'saved-routes') {
        this.loadSavedRoutes();
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      // Show error message
      this.displayError('Failed to load user data. Please try again later.');
    }
  }
  
  updateProfileDisplay() {
    if (!this.user) return;
    
    // Update user info in header
    document.getElementById('user-name').textContent = `${this.user.firstName || ''} ${this.user.lastName || ''}`.trim() || 'User';
    document.getElementById('user-email').textContent = this.user.email || '';
    
    // Format member since date if available
    if (this.user.createdAt) {
      const memberSince = new Date(this.user.createdAt);
      document.getElementById('user-member-since').textContent = `Member since: ${memberSince.toLocaleDateString()}`;
    } else {
      document.getElementById('user-member-since').textContent = 'Member';
    }
    
    // Update form fields
    document.getElementById('profile-first-name').value = this.user.firstName || '';
    document.getElementById('profile-last-name').value = this.user.lastName || '';
    document.getElementById('profile-email').value = this.user.email || '';
    document.getElementById('profile-phone').value = this.user.phone || '';
    document.getElementById('profile-address').value = this.user.address || '';
    document.getElementById('profile-city').value = this.user.city || '';
    document.getElementById('profile-postal-code').value = this.user.postalCode || '';
    
    // Set preferences if available
    if (this.user.preferences) {
      document.getElementById('profile-preferences').value = this.user.preferences;
    }
  }
  
  async handleProfileUpdate(e) {
    e.preventDefault();
    
    // Get form values
    const firstName = document.getElementById('profile-first-name').value;
    const lastName = document.getElementById('profile-last-name').value;
    const phone = document.getElementById('profile-phone').value;
    const address = document.getElementById('profile-address').value;
    const city = document.getElementById('profile-city').value;
    const postalCode = document.getElementById('profile-postal-code').value;
    const preferences = document.getElementById('profile-preferences').value;
    
    try {
      // Disable form
      const submitButton = document.querySelector('#profile-form button[type="submit"]');
      submitButton.disabled = true;
      submitButton.textContent = 'Updating...';
      
      // Prepare update data
      const updateData = {
        firstName,
        lastName,
        phone,
        address,
        city,
        postalCode,
        preferences
      };
      
      // Update profile
      const updatedUser = await UserService.updateUserProfile(updateData);
      
      // Update local user data
      this.user = updatedUser;
      this.updateProfileDisplay();
      
      // Show success message
      this.displaySuccess('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      this.displayError('Failed to update profile. Please try again.');
    } finally {
      // Re-enable form
      const submitButton = document.querySelector('#profile-form button[type="submit"]');
      submitButton.disabled = false;
      submitButton.textContent = 'Update Profile';
    }
  }
  
  async loadTravelHistory() {
    try {
      const historyList = document.getElementById('travel-history-list');
      
      // Show loading indicator
      historyList.innerHTML = `
        <div class="loader">
          <div class="loader-spinner"></div>
        </div>
      `;
      
      // Fetch travel history
      this.travelHistory = await UserService.getTravelHistory();
      
      // Display travel history
      if (this.travelHistory.length === 0) {
        historyList.innerHTML = `
          <div class="text-center py-8">
            <svg class="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p class="mt-2 text-gray-500 dark:text-gray-400">No travel history yet.</p>
            <a href="/booking" class="btn btn-primary mt-4">Book Your First Trip</a>
          </div>
        `;
        return;
      }
      
      // Create HTML for each history item
      const historyItems = this.travelHistory.map(trip => `
        <div class="card p-4">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between">
            <div class="mb-2 md:mb-0">
              <div class="flex items-center">
                <span class="text-lg font-semibold text-gray-900 dark:text-white">${trip.source} to ${trip.destination}</span>
                <span class="ml-2 badge badge-${this.getTripStatusBadge(trip.status)}">${trip.status}</span>
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                <span>${formatDate(trip.date)}</span>
                <span class="mx-1">•</span>
                <span>${formatTime(trip.departureTime)}</span>
                <span class="mx-1">•</span>
                <span>Ticket #${trip.ticketReference}</span>
              </div>
            </div>
            <div class="flex items-center">
              <span class="text-lg font-bold text-gray-900 dark:text-white">${trip.price}</span>
              <button class="ml-4 btn btn-outline text-sm py-1 px-3" data-action="save-route" data-trip-id="${trip.id}">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                </svg>
                Save Route
              </button>
            </div>
          </div>
        </div>
      `).join('');
      
      historyList.innerHTML = historyItems;
      
      // Add event listeners to save route buttons
      document.querySelectorAll('[data-action="save-route"]').forEach(button => {
        button.addEventListener('click', async (e) => {
          const tripId = e.currentTarget.getAttribute('data-trip-id');
          const trip = this.travelHistory.find(t => t.id === tripId);
          
          if (trip) {
            try {
              button.disabled = true;
              button.textContent = 'Saving...';
              
              // Save the route
              await UserService.saveRoute({
                source: trip.source,
                destination: trip.destination,
                name: `${trip.source} to ${trip.destination}`
              });
              
              // Show success message
              this.displaySuccess('Route saved successfully!');
              
              // Reload saved routes if that tab is active
              if (this.activeTab === 'saved-routes') {
                this.loadSavedRoutes();
              }
            } catch (error) {
              console.error('Error saving route:', error);
              this.displayError('Failed to save route. Please try again.');
            } finally {
              button.disabled = false;
              button.innerHTML = `
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                </svg>
                Save Route
              `;
            }
          }
        });
      });
    } catch (error) {
      console.error('Error loading travel history:', error);
      
      // Show error message
      const historyList = document.getElementById('travel-history-list');
      historyList.innerHTML = `
        <div class="text-center py-4">
          <p class="text-danger-600 dark:text-danger-400">Failed to load travel history. Please try again.</p>
          <button id="retry-history-btn" class="btn btn-outline mt-2">Retry</button>
        </div>
      `;
      
      // Add retry button listener
      const retryButton = document.getElementById('retry-history-btn');
      if (retryButton) {
        retryButton.addEventListener('click', () => {
          this.loadTravelHistory();
        });
      }
    }
  }
  
  async loadSavedRoutes() {
    try {
      const routesList = document.getElementById('saved-routes-list');
      
      // Show loading indicator
      routesList.innerHTML = `
        <div class="loader">
          <div class="loader-spinner"></div>
        </div>
      `;
      
      // Fetch saved routes
      this.savedRoutes = await UserService.getSavedRoutes();
      
      // Display saved routes
      if (this.savedRoutes.length === 0) {
        routesList.innerHTML = `
          <div class="text-center py-8">
            <svg class="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
            </svg>
            <p class="mt-2 text-gray-500 dark:text-gray-400">No saved routes yet.</p>
            <a href="/route-optimizer" class="btn btn-primary mt-4">Find Routes</a>
          </div>
        `;
        return;
      }
      
      // Create HTML for each saved route
      const routeItems = this.savedRoutes.map(route => `
        <div class="card p-4">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between">
            <div class="mb-2 md:mb-0">
              <div class="text-lg font-semibold text-gray-900 dark:text-white">${route.name || `${route.source} to ${route.destination}`}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                <span>Source: ${route.source}</span>
                <span class="mx-1">•</span>
                <span>Destination: ${route.destination}</span>
                ${route.createdAt ? `<span class="mx-1">•</span><span>Saved on ${new Date(route.createdAt).toLocaleDateString()}</span>` : ''}
              </div>
            </div>
            <div class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
              <button class="btn btn-primary text-sm py-1 px-3" data-action="book-saved-route" data-route-id="${route.id}">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path>
                </svg>
                Book
              </button>
              <button class="btn btn-outline text-sm py-1 px-3" data-action="delete-saved-route" data-route-id="${route.id}">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                Delete
              </button>
            </div>
          </div>
        </div>
      `).join('');
      
      routesList.innerHTML = routeItems;
      
      // Add event listeners to action buttons
      document.querySelectorAll('[data-action="book-saved-route"]').forEach(button => {
        button.addEventListener('click', (e) => {
          const routeId = e.currentTarget.getAttribute('data-route-id');
          const route = this.savedRoutes.find(r => r.id === routeId);
          
          if (route) {
            // Redirect to booking page with route pre-selected
            window.location.href = `/booking?source=${route.source}&destination=${route.destination}`;
          }
        });
      });
      
      document.querySelectorAll('[data-action="delete-saved-route"]').forEach(button => {
        button.addEventListener('click', async (e) => {
          const routeId = e.currentTarget.getAttribute('data-route-id');
          
          if (confirm('Are you sure you want to delete this saved route?')) {
            try {
              button.disabled = true;
              button.textContent = 'Deleting...';
              
              // Delete the route
              await UserService.deleteSavedRoute(routeId);
              
              // Remove from local array
              this.savedRoutes = this.savedRoutes.filter(r => r.id !== routeId);
              
              // Show success message
              this.displaySuccess('Route deleted successfully!');
              
              // Reload saved routes
              this.loadSavedRoutes();
            } catch (error) {
              console.error('Error deleting route:', error);
              this.displayError('Failed to delete route. Please try again.');
              
              // Re-enable button
              button.disabled = false;
              button.innerHTML = `
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                Delete
              `;
            }
          }
        });
      });
    } catch (error) {
      console.error('Error loading saved routes:', error);
      
      // Show error message
      const routesList = document.getElementById('saved-routes-list');
      routesList.innerHTML = `
        <div class="text-center py-4">
          <p class="text-danger-600 dark:text-danger-400">Failed to load saved routes. Please try again.</p>
          <button id="retry-routes-btn" class="btn btn-outline mt-2">Retry</button>
        </div>
      `;
      
      // Add retry button listener
      const retryButton = document.getElementById('retry-routes-btn');
      if (retryButton) {
        retryButton.addEventListener('click', () => {
          this.loadSavedRoutes();
        });
      }
    }
  }
  
  getTripStatusBadge(status) {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'success';
      case 'upcoming':
        return 'primary';
      case 'cancelled':
        return 'danger';
      default:
        return 'secondary';
    }
  }
  
  displaySuccess(message) {
    // Create success message
    const successElement = document.createElement('div');
    successElement.className = 'fixed bottom-4 right-4 bg-success-500 text-white px-4 py-2 rounded-md shadow-lg z-50 transform translate-y-0 opacity-100 transition-all duration-300';
    successElement.textContent = message;
    
    // Add to body
    document.body.appendChild(successElement);
    
    // Remove after 3 seconds
    setTimeout(() => {
      successElement.classList.add('translate-y-2', 'opacity-0');
      setTimeout(() => {
        document.body.removeChild(successElement);
      }, 300);
    }, 3000);
  }
  
  displayError(message) {
    // Create error message
    const errorElement = document.createElement('div');
    errorElement.className = 'fixed bottom-4 right-4 bg-danger-500 text-white px-4 py-2 rounded-md shadow-lg z-50 transform translate-y-0 opacity-100 transition-all duration-300';
    errorElement.textContent = message;
    
    // Add to body
    document.body.appendChild(errorElement);
    
    // Remove after 3 seconds
    setTimeout(() => {
      errorElement.classList.add('translate-y-2', 'opacity-0');
      setTimeout(() => {
        document.body.removeChild(errorElement);
      }, 300);
    }, 3000);
  }
}

export default UserProfile;