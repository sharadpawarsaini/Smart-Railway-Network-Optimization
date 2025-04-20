import HomePage from '../pages/HomePage.js';
import LoginPage from '../pages/LoginPage.js';
import RegisterPage from '../pages/RegisterPage.js';
import DashboardPage from '../pages/DashboardPage.js';
import BookingPage from '../pages/BookingPage.js';
import AdminDashboardPage from '../pages/AdminDashboardPage.js';
import ProfilePage from '../pages/ProfilePage.js';
import RouteOptimizerPage from '../pages/RouteOptimizerPage.js';
import CongestionMapPage from '../pages/CongestionMapPage.js';
import NotFoundPage from '../pages/NotFoundPage.js';
import UnauthorizedPage from '../pages/UnauthorizedPage.js';

const routes = [
  { path: '/', page: HomePage, protected: false, layout: 'default' },
  { path: '/login', page: LoginPage, protected: false, layout: 'default' },
  { path: '/register', page: RegisterPage, protected: false, layout: 'default' },
  { path: '/dashboard', page: DashboardPage, protected: true, layout: 'default' },
  { path: '/booking', page: BookingPage, protected: true, layout: 'default' },
  { path: '/profile', page: ProfilePage, protected: true, layout: 'default' },
  { path: '/route-optimizer', page: RouteOptimizerPage, protected: true, layout: 'default' },
  { path: '/congestion-map', page: CongestionMapPage, protected: false, layout: 'default' },
  { path: '/admin', page: AdminDashboardPage, protected: true, adminOnly: true, layout: 'admin' },
  { path: '/unauthorized', page: UnauthorizedPage, protected: false, layout: 'default' },
  { path: '/not-found', page: NotFoundPage, protected: false, layout: 'default' }
];

const Router = {
  init(onRouteChange) {
    this.onRouteChange = onRouteChange;
    
    // Handle click events on links
    document.addEventListener('click', (e) => {
      const target = e.target.closest('a');
      if (target && target.getAttribute('href').startsWith('/')) {
        e.preventDefault();
        this.navigateTo(target.getAttribute('href'));
      }
    });
    
    // Handle browser navigation (back/forward buttons)
    window.addEventListener('popstate', () => {
      this.handleLocation();
    });
  },

  navigateTo(path) {
    window.history.pushState(null, null, path);
    this.handleLocation();
  },

  handleLocation() {
    const path = window.location.pathname;
    const route = this.findRoute(path);
    
    if (this.onRouteChange) {
      this.onRouteChange(route);
    }
  },

  findRoute(path) {
    const matchedRoute = routes.find(route => route.path === path);
    
    // Return the matched route or the not found route
    return matchedRoute || routes.find(route => route.path === '/not-found');
  }
};

export default Router;