import { AuthService } from '../services/authService.js';
import { toggleDarkMode, isDarkMode } from '../utils/helpers.js';

const Navbar = {
  init() {
    this.isAuthenticated = false;
    
    // Listen for authentication changes
    window.addEventListener('auth-change', (e) => {
      this.updateAuthState(e.detail.authenticated);
    });
  },

  updateAuthState(isAuthenticated) {
    this.isAuthenticated = isAuthenticated;
    
    // If navbar is already in the DOM, update it
    const navbarElement = document.getElementById('main-navbar');
    if (navbarElement) {
      navbarElement.outerHTML = this.render().outerHTML;
      this.attachEventListeners();
    }
  },

  render() {
    const navbar = document.createElement('nav');
    navbar.id = 'main-navbar';
    navbar.className = 'bg-white dark:bg-dark-200 shadow-md fixed top-0 left-0 right-0 z-10 transition-colors duration-300';
    
    navbar.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <a href="/" class="flex-shrink-0 flex items-center">
              <svg class="h-8 w-8 text-primary-600 dark:text-primary-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 18C5 16.8954 5.89543 16 7 16H17C18.1046 16 19 16.8954 19 18V18C19 19.1046 18.1046 20 17 20H7C5.89543 20 5 19.1046 5 18V18Z" fill="currentColor"/>
                <path d="M7 9H11V13H7V9Z" fill="currentColor"/>
                <path d="M13 9H17V13H13V9Z" fill="currentColor"/>
                <path d="M2 8C2 7.44772 2.44772 7 3 7H21C21.5523 7 22 7.44772 22 8V8C22 8.55228 21.5523 9 21 9H3C2.44772 9 2 8.55228 2 8V8Z" fill="currentColor"/>
                <path d="M3 5C3 4.44772 3.44772 4 4 4H20C20.5523 4 21 4.44772 21 5V5C21 5.55228 20.5523 6 20 6H4C3.44772 6 3 5.55228 3 5V5Z" fill="currentColor"/>
              </svg>
              <span class="ml-2 text-xl font-bold text-gray-900 dark:text-white">SmartRail</span>
            </a>
            <div class="hidden md:ml-6 md:flex md:space-x-8">
              <a href="/" class="nav-link ${window.location.pathname === '/' ? 'nav-link-active' : ''}">
                Home
              </a>
              <a href="/congestion-map" class="nav-link ${window.location.pathname === '/congestion-map' ? 'nav-link-active' : ''}">
                Congestion Map
              </a>
              <a href="/route-optimizer" class="nav-link ${window.location.pathname === '/route-optimizer' ? 'nav-link-active' : ''}">
                Route Optimizer
              </a>
              ${this.isAuthenticated ? `
                <a href="/booking" class="nav-link ${window.location.pathname === '/booking' ? 'nav-link-active' : ''}">
                  Book Tickets
                </a>
                <a href="/dashboard" class="nav-link ${window.location.pathname === '/dashboard' ? 'nav-link-active' : ''}">
                  Dashboard
                </a>
              ` : ''}
            </div>
          </div>
          <div class="flex items-center">
            <button id="dark-mode-toggle" class="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500">
              <span class="sr-only">Toggle dark mode</span>
              ${isDarkMode() ? `
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              ` : `
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                </svg>
              `}
            </button>
            
            ${this.isAuthenticated ? `
              <div class="ml-3 relative">
                <div>
                  <button id="user-menu-button" class="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    <span class="sr-only">Open user menu</span>
                    <div class="h-8 w-8 rounded-full bg-primary-600 text-white flex items-center justify-center">
                      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                    </div>
                  </button>
                </div>
                <div id="user-dropdown" class="hidden origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-dark-300 ring-1 ring-black ring-opacity-5 focus:outline-none transition-all z-50" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                  <a href="/profile" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-400" role="menuitem">Your Profile</a>
                  <a href="/dashboard" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-400" role="menuitem">Dashboard</a>
                  <a href="#" id="logout-button" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-400" role="menuitem">Sign out</a>
                </div>
              </div>
            ` : `
              <div class="flex space-x-2 ml-2">
                <a href="/login" class="btn btn-outline px-3 py-1">Log in</a>
                <a href="/register" class="btn btn-primary px-3 py-1">Sign up</a>
              </div>
            `}

            <div class="ml-2 md:hidden">
              <button id="mobile-menu-button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
                <span class="sr-only">Open main menu</span>
                <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Mobile menu -->
        <div id="mobile-menu" class="hidden md:hidden">
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/" class="block px-3 py-2 rounded-md text-base font-medium ${window.location.pathname === '/' ? 'bg-primary-50 text-primary-600 dark:bg-dark-300 dark:text-primary-400' : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-dark-300'}">
              Home
            </a>
            <a href="/congestion-map" class="block px-3 py-2 rounded-md text-base font-medium ${window.location.pathname === '/congestion-map' ? 'bg-primary-50 text-primary-600 dark:bg-dark-300 dark:text-primary-400' : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-dark-300'}">
              Congestion Map
            </a>
            <a href="/route-optimizer" class="block px-3 py-2 rounded-md text-base font-medium ${window.location.pathname === '/route-optimizer' ? 'bg-primary-50 text-primary-600 dark:bg-dark-300 dark:text-primary-400' : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-dark-300'}">
              Route Optimizer
            </a>
            ${this.isAuthenticated ? `
              <a href="/booking" class="block px-3 py-2 rounded-md text-base font-medium ${window.location.pathname === '/booking' ? 'bg-primary-50 text-primary-600 dark:bg-dark-300 dark:text-primary-400' : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-dark-300'}">
                Book Tickets
              </a>
              <a href="/dashboard" class="block px-3 py-2 rounded-md text-base font-medium ${window.location.pathname === '/dashboard' ? 'bg-primary-50 text-primary-600 dark:bg-dark-300 dark:text-primary-400' : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-dark-300'}">
                Dashboard
              </a>
            ` : ''}
          </div>
        </div>
      </div>
    `;
    
    // Attach event listeners after rendering
    setTimeout(() => this.attachEventListeners(), 0);
    
    return navbar;
  },

  attachEventListeners() {
    // Dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
      darkModeToggle.addEventListener('click', toggleDarkMode);
    }

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener('click', () => {
        const expanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
        mobileMenuButton.setAttribute('aria-expanded', !expanded);
        mobileMenu.classList.toggle('hidden');
      });
    }

    // User dropdown toggle
    const userMenuButton = document.getElementById('user-menu-button');
    const userDropdown = document.getElementById('user-dropdown');
    if (userMenuButton && userDropdown) {
      userMenuButton.addEventListener('click', () => {
        userDropdown.classList.toggle('hidden');
      });
      
      // Close the dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!userMenuButton.contains(e.target) && !userDropdown.contains(e.target)) {
          userDropdown.classList.add('hidden');
        }
      });
    }

    // Logout button
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
      logoutButton.addEventListener('click', (e) => {
        e.preventDefault();
        AuthService.logout();
        window.location.href = '/';
      });
    }
  }
};

export default Navbar;