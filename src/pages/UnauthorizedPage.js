export default function UnauthorizedPage() {
  return `
    <div class="pt-16 h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-100">
      <div class="text-center max-w-lg mx-auto p-6">
        <svg class="w-24 h-24 mx-auto text-warning-500 dark:text-warning-400 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
        
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Access Denied</h1>
        <p class="text-gray-600 dark:text-gray-400 mb-8">
          You don't have permission to access this page. Please contact an administrator if you believe this is a mistake.
        </p>
        
        <div class="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-3">
          <a href="/" class="btn btn-primary px-6 py-2">
            Go Home
          </a>
          <a href="/dashboard" class="btn btn-outline px-6 py-2">
            My Dashboard
          </a>
        </div>
        
        <div class="mt-12">
          <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Need assistance?</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            If you need help or have questions, you can:
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <a href="#" class="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center justify-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              Contact Support
            </a>
            <a href="#" class="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center justify-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              FAQ
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}