import UserProfile from '../components/UserProfile.js';

export default function ProfilePage() {
  const pageContent = `
    <div class="pt-16 mt-4">
      <div id="user-profile-container">
        <!-- UserProfile component will be rendered here by JavaScript -->
        <div class="loader">
          <div class="loader-spinner"></div>
        </div>
      </div>
    </div>
  `;
  
  // Initialize user profile after the page is rendered
  setTimeout(() => {
    initUserProfile();
  }, 0);
  
  return pageContent;
}

function initUserProfile() {
  const container = document.getElementById('user-profile-container');
  if (!container) return;
  
  // Clear loading indicator
  container.innerHTML = '';
  
  // Create the user profile
  new UserProfile(container);
}