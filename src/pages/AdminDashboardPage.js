import AdminDashboard from '../components/AdminDashboard.js';

export default function AdminDashboardPage() {
  const pageContent = `
    <div id="admin-dashboard-container" class="pt-16">
      <!-- AdminDashboard component will be rendered here by JavaScript -->
      <div class="loader">
        <div class="loader-spinner"></div>
      </div>
    </div>
  `;
  
  // Initialize admin dashboard after the page is rendered
  setTimeout(() => {
    initAdminDashboard();
  }, 0);
  
  return pageContent;
}

function initAdminDashboard() {
  const container = document.getElementById('admin-dashboard-container');
  if (!container) return;
  
  // Clear loading indicator
  container.innerHTML = '';
  
  // Create the admin dashboard
  new AdminDashboard(container);
}