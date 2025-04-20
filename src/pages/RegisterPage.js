import { AuthService } from '../services/authService.js';

export default function RegisterPage() {
  return `
    <div class="pt-16 h-screen bg-gray-50 dark:bg-dark-100">
      <div class="max-w-md mx-auto p-6">
        <div class="bg-white dark:bg-dark-200 rounded-lg shadow-md overflow-hidden">
          <div class="p-6 bg-primary-600 dark:bg-primary-800">
            <h1 class="text-2xl font-bold text-white text-center">Create Account</h1>
            <p class="text-primary-100 text-center mt-1">Join the Smart Railway Network</p>
          </div>
          
          <div class="p-6">
            <form id="register-form" class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="first-name" class="label">First Name</label>
                  <input type="text" id="first-name" class="input" placeholder="John" required>
                </div>
                
                <div>
                  <label for="last-name" class="label">Last Name</label>
                  <input type="text" id="last-name" class="input" placeholder="Doe" required>
                </div>
              </div>
              
              <div>
                <label for="email" class="label">Email</label>
                <input type="email" id="email" class="input" placeholder="your.email@example.com" required>
              </div>
              
              <div>
                <label for="password" class="label">Password</label>
                <input type="password" id="password" class="input" placeholder="••••••••" required minlength="8">
              </div>
              
              <div>
                <label for="confirm-password" class="label">Confirm Password</label>
                <input type="password" id="confirm-password" class="input" placeholder="••••••••" required minlength="8">
              </div>
              
              <div class="flex items-center">
                <input type="checkbox" id="terms" class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-dark-300" required>
                <label for="terms" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  I agree to the <a href="#" class="text-primary-600 dark:text-primary-400 hover:underline">Terms of Service</a> and <a href="#" class="text-primary-600 dark:text-primary-400 hover:underline">Privacy Policy</a>
                </label>
              </div>
              
              <div class="pt-2">
                <button type="submit" class="btn btn-primary w-full py-2.5">Create Account</button>
              </div>
              
              <div id="register-error" class="text-danger-600 dark:text-danger-400 text-sm text-center hidden"></div>
            </form>
            
            <div class="mt-6 text-center">
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Already have an account? 
                <a href="/login" class="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">Sign in</a>
              </p>
            </div>
          </div>
        </div>
        
        <div class="mt-8 bg-white dark:bg-dark-200 rounded-lg shadow-md p-6">
          <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Benefits of Creating an Account</h2>
          
          <ul class="space-y-3">
            <li class="flex items-start">
              <svg class="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-700 dark:text-gray-300">Save your favorite routes for quick booking</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-700 dark:text-gray-300">Access your travel history and receipts</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-700 dark:text-gray-300">Receive personalized travel suggestions</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-700 dark:text-gray-300">Get real-time notifications about your journeys</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-700 dark:text-gray-300">Earn loyalty points for future discounts</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `;
}

// Add event listener after the page is rendered
document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('register-form');
  const registerError = document.getElementById('register-error');
  
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Get form values
      const firstName = document.getElementById('first-name').value;
      const lastName = document.getElementById('last-name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
      
      // Validate passwords match
      if (password !== confirmPassword) {
        registerError.textContent = 'Passwords do not match';
        registerError.classList.remove('hidden');
        return;
      }
      
      try {
        // Disable form
        const submitButton = registerForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Creating account...';
        
        // Hide previous errors
        registerError.classList.add('hidden');
        
        // Attempt to register
        await AuthService.register({
          firstName,
          lastName,
          email,
          password
        });
        
        // Redirect to dashboard on success
        window.location.href = '/dashboard';
      } catch (error) {
        // Display error
        registerError.textContent = error.message || 'Failed to create account. Please try again.';
        registerError.classList.remove('hidden');
        
        // Re-enable form
        const submitButton = registerForm.querySelector('button[type="submit"]');
        submitButton.disabled = false;
        submitButton.textContent = 'Create Account';
      }
    });
  }
});