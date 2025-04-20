import { AuthService } from '../services/authService.js';

export default function LoginPage() {
  return `
    <div class="pt-16 h-screen bg-gray-50 dark:bg-dark-100">
      <div class="max-w-md mx-auto p-6">
        <div class="bg-white dark:bg-dark-200 rounded-lg shadow-md overflow-hidden">
          <div class="p-6 bg-primary-600 dark:bg-primary-800">
            <h1 class="text-2xl font-bold text-white text-center">Welcome Back</h1>
            <p class="text-primary-100 text-center mt-1">Sign in to your account</p>
          </div>
          
          <div class="p-6">
            <form id="login-form" class="space-y-4">
              <div>
                <label for="email" class="label">Email</label>
                <input type="email" id="email" class="input" placeholder="your.email@example.com" required>
              </div>
              
              <div>
                <label for="password" class="label">Password</label>
                <input type="password" id="password" class="input" placeholder="••••••••" required>
              </div>
              
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input type="checkbox" id="remember-me" class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-dark-300">
                  <label for="remember-me" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">Remember me</label>
                </div>
                
                <a href="#" class="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">Forgot password?</a>
              </div>
              
              <div class="pt-2">
                <button type="submit" class="btn btn-primary w-full py-2.5">Sign In</button>
              </div>
              
              <div id="login-error" class="text-danger-600 dark:text-danger-400 text-sm text-center hidden"></div>
            </form>
            
            <div class="mt-6 text-center">
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account? 
                <a href="/register" class="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">Create account</a>
              </p>
            </div>
          </div>
        </div>
        
        <div class="mt-8 text-center">
          <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Why use Smart Railway Network?</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-white dark:bg-dark-200 rounded-lg shadow-sm p-4">
              <div class="flex items-center justify-center w-10 h-10 mx-auto bg-primary-100 dark:bg-primary-900 dark:bg-opacity-50 rounded-full mb-3">
                <svg class="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="text-base font-medium text-gray-900 dark:text-white">Fast Booking</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Book tickets in seconds with our optimized process.</p>
            </div>
            
            <div class="bg-white dark:bg-dark-200 rounded-lg shadow-sm p-4">
              <div class="flex items-center justify-center w-10 h-10 mx-auto bg-primary-100 dark:bg-primary-900 dark:bg-opacity-50 rounded-full mb-3">
                <svg class="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-base font-medium text-gray-900 dark:text-white">Save Money</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Get dynamic pricing based on AI algorithms.</p>
            </div>
            
            <div class="bg-white dark:bg-dark-200 rounded-lg shadow-sm p-4">
              <div class="flex items-center justify-center w-10 h-10 mx-auto bg-primary-100 dark:bg-primary-900 dark:bg-opacity-50 rounded-full mb-3">
                <svg class="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
              </div>
              <h3 class="text-base font-medium text-gray-900 dark:text-white">Track Journeys</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Keep all your travel history in one place.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Add event listener after the page is rendered
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const loginError = document.getElementById('login-error');
  
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Get form values
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      try {
        // Disable form
        const submitButton = loginForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Signing in...';
        
        // Hide previous errors
        loginError.classList.add('hidden');
        
        // Attempt to login
        await AuthService.login(email, password);
        
        // Redirect to dashboard on success
        window.location.href = '/dashboard';
      } catch (error) {
        // Display error
        loginError.textContent = error.message || 'Failed to sign in. Please check your credentials.';
        loginError.classList.remove('hidden');
        
        // Re-enable form
        const submitButton = loginForm.querySelector('button[type="submit"]');
        submitButton.disabled = false;
        submitButton.textContent = 'Sign In';
      }
    });
  }
});