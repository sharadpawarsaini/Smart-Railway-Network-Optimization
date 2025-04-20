import Router from './routes/router.js';
import { AuthService } from './services/authService.js';
import Navbar from './components/Navbar.js';
import Sidebar from './components/Sidebar.js';
import { showLoader, hideLoader } from './utils/loader.js';

const App = {
  init() {
    this.appElement = document.getElementById('app');
    this.initComponents();
    this.initRouter();
    this.checkAuthentication();
  },

  initComponents() {
    // Initialize and render the navbar
    this.navbar = Navbar;
    this.navbar.init();

    // Initialize sidebar but don't render it yet
    this.sidebar = Sidebar;
    this.sidebar.init();
  },

  initRouter() {
    // Initialize the router
    this.router = Router;
    this.router.init(this.handleRouteChange.bind(this));

    // Initial route handling
    this.router.navigateTo(window.location.pathname);
  },

  async checkAuthentication() {
    try {
      const isAuthenticated = await AuthService.checkAuth();
      this.updateNavbar(isAuthenticated);
    } catch (error) {
      console.error('Authentication check failed:', error);
      this.updateNavbar(false);
    }
  },

  updateNavbar(isAuthenticated) {
    this.navbar.updateAuthState(isAuthenticated);
  },

  async handleRouteChange(route) {
    showLoader();
    
    // Check if the route requires authentication
    if (route.protected && !await AuthService.checkAuth()) {
      this.router.navigateTo('/login');
      hideLoader();
      return;
    }

    // Check if the route requires admin privileges
    if (route.adminOnly && !await AuthService.isAdmin()) {
      this.router.navigateTo('/unauthorized');
      hideLoader();
      return;
    }

    try {
      // Handle layout based on route settings
      if (route.layout === 'admin') {
        this.renderAdminLayout(route);
      } else {
        this.renderDefaultLayout(route);
      }
    } catch (error) {
      console.error('Error handling route change:', error);
      this.appElement.innerHTML = '<div class="page-container"><h1>Error</h1><p>Something went wrong while loading the page.</p></div>';
    }

    hideLoader();
  },

  renderDefaultLayout(route) {
    // Hide sidebar in default layout
    this.sidebar.hide();
    
    // Create a container for the main content
    const content = document.createElement('main');
    content.className = 'page-fade-enter';
    
    // Get the page content from the route
    const pageContent = route.page ? route.page() : '<h1>Page not found</h1>';
    content.innerHTML = pageContent;
    
    // Clear the app container and append new content
    this.appElement.innerHTML = '';
    this.appElement.appendChild(this.navbar.render());
    this.appElement.appendChild(content);
    
    // Trigger animation
    setTimeout(() => {
      content.classList.add('page-fade-enter-active');
    }, 10);
  },

  renderAdminLayout(route) {
    // Show sidebar in admin layout
    this.sidebar.show();
    
    // Create a container for the admin layout
    const adminContainer = document.createElement('div');
    adminContainer.className = 'flex h-screen';
    
    // Create a container for the main content
    const content = document.createElement('main');
    content.className = 'flex-1 overflow-auto page-fade-enter';
    
    // Get the page content from the route
    const pageContent = route.page ? route.page() : '<h1>Page not found</h1>';
    content.innerHTML = pageContent;
    
    // Clear the app container and build the admin layout
    this.appElement.innerHTML = '';
    this.appElement.appendChild(this.navbar.render());
    
    adminContainer.appendChild(this.sidebar.render());
    adminContainer.appendChild(content);
    this.appElement.appendChild(adminContainer);
    
    // Trigger animation
    setTimeout(() => {
      content.classList.add('page-fade-enter-active');
    }, 10);
  }
};

export default App;