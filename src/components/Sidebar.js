import { AuthService } from '../services/authService.js';

const Sidebar = {
  init() {
    this.visible = false;
  },

  show() {
    this.visible = true;
  },

  hide() {
    this.visible = false;
  },

  render() {
    if (!this.visible) {
      return document.createElement('div');
    }

    const sidebar = document.createElement('div');
    sidebar.id = 'admin-sidebar';
    sidebar.className = 'bg-white dark:bg-dark-200 shadow-md w-64 h-screen fixed mt-16 overflow-y-auto transition-all duration-300 transform translate-x-0';
    
    const user = AuthService.getUser();
    
    sidebar.innerHTML = `
      <div class="py-4">
        <div class="px-4 mb-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Admin Dashboard</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            ${user ? `Logged in as ${user.email}` : 'Welcome'}
          </p>
        </div>
        
        <div class="space-y-1 px-2">
          <a href="/admin" class="sidebar-link ${window.location.pathname === '/admin' ? 'sidebar-link-active' : ''}">
            <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            Dashboard Overview
          </a>
          
          <a href="/admin/analytics" class="sidebar-link ${window.location.pathname === '/admin/analytics' ? 'sidebar-link-active' : ''}">
            <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            Analytics
          </a>
          
          <a href="/admin/trains" class="sidebar-link ${window.location.pathname === '/admin/trains' ? 'sidebar-link-active' : ''}">
            <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Train Management
          </a>
          
          <a href="/admin/routes" class="sidebar-link ${window.location.pathname === '/admin/routes' ? 'sidebar-link-active' : ''}">
            <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
            </svg>
            Route Management
          </a>
          
          <a href="/admin/schedule" class="sidebar-link ${window.location.pathname === '/admin/schedule' ? 'sidebar-link-active' : ''}">
            <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Schedule Management
          </a>
          
          <a href="/admin/users" class="sidebar-link ${window.location.pathname === '/admin/users' ? 'sidebar-link-active' : ''}">
            <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            User Management
          </a>
          
          <a href="/admin/pricing" class="sidebar-link ${window.location.pathname === '/admin/pricing' ? 'sidebar-link-active' : ''}">
            <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Pricing Management
          </a>
          
          <a href="/admin/reports" class="sidebar-link ${window.location.pathname === '/admin/reports' ? 'sidebar-link-active' : ''}">
            <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Reports
          </a>

          <a href="/admin/settings" class="sidebar-link ${window.location.pathname === '/admin/settings' ? 'sidebar-link-active' : ''}">
            <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            Settings
          </a>
        </div>

        <div class="px-4 mt-8">
          <hr class="border-gray-200 dark:border-gray-700 mb-4">
          <button id="mobile-sidebar-close" class="md:hidden w-full flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-dark-300">
            <svg class="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            Close Menu
          </button>
          
          <div class="mt-4 bg-primary-50 dark:bg-dark-300 p-4 rounded-lg">
            <h3 class="text-sm font-medium text-primary-800 dark:text-primary-300">AI Model Status</h3>
            <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">Last trained: Today, 2:30 PM</p>
            <div class="mt-3">
              <button id="retrain-model-btn" class="text-xs btn btn-primary w-full">Retrain Model</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Attach event listeners after rendering
    setTimeout(() => this.attachEventListeners(), 0);
    
    return sidebar;
  },

  attachEventListeners() {
    // Mobile sidebar close
    const closeSidebarButton = document.getElementById('mobile-sidebar-close');
    if (closeSidebarButton) {
      closeSidebarButton.addEventListener('click', () => {
        const sidebar = document.getElementById('admin-sidebar');
        if (sidebar) {
          sidebar.classList.add('-translate-x-full');
          
          // After animation, hide the sidebar
          setTimeout(() => {
            sidebar.classList.remove('-translate-x-full');
            this.hide();
            
            // Re-render the current route to remove the sidebar
            const event = new CustomEvent('sidebar-closed');
            window.dispatchEvent(event);
          }, 300);
        }
      });
    }

    // Retrain model button
    const retrainModelBtn = document.getElementById('retrain-model-btn');
    if (retrainModelBtn) {
      retrainModelBtn.addEventListener('click', async () => {
        try {
          retrainModelBtn.disabled = true;
          retrainModelBtn.textContent = 'Training...';
          
          // Call API to retrain the model
          const response = await fetch(`${API_URL}/optimization/retrain-model`, {
            method: 'POST',
            headers: {
              ...AuthService.getAuthHeaders()
            }
          });
          
          if (!response.ok) {
            throw new Error('Failed to retrain model');
          }
          
          // Update button text
          retrainModelBtn.textContent = 'Success!';
          
          // Reset after 2 seconds
          setTimeout(() => {
            retrainModelBtn.disabled = false;
            retrainModelBtn.textContent = 'Retrain Model';
          }, 2000);
        } catch (error) {
          console.error('Error retraining model:', error);
          retrainModelBtn.textContent = 'Failed';
          
          setTimeout(() => {
            retrainModelBtn.disabled = false;
            retrainModelBtn.textContent = 'Retrain Model';
          }, 2000);
        }
      });
    }
  }
};

export default Sidebar;