export default function NotFoundPage() {
  return `
    <div class="pt-16 h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-100">
      <div class="text-center max-w-lg mx-auto p-6">
        <svg class="w-24 h-24 mx-auto text-gray-400 dark:text-gray-600 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Page Not Found</h1>
        <p class="text-gray-600 dark:text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div class="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-3">
          <a href="/" class="btn btn-primary px-6 py-2">
            Go Home
          </a>
          <a href="/route-optimizer" class="btn btn-outline px-6 py-2">
            Find Routes
          </a>
        </div>
        
        <div class="mt-12">
          <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Looking for something?</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <a href="/" class="text-sm text-primary-600 dark:text-primary-400 hover:underline">Home</a>
            <a href="/route-optimizer" class="text-sm text-primary-600 dark:text-primary-400 hover:underline">Route Optimizer</a>
            <a href="/congestion-map" class="text-sm text-primary-600 dark:text-primary-400 hover:underline">Congestion Map</a>
            <a href="/booking" class="text-sm text-primary-600 dark:text-primary-400 hover:underline">Book Tickets</a>
            <a href="/profile" class="text-sm text-primary-600 dark:text-primary-400 hover:underline">My Profile</a>
            <a href="/dashboard" class="text-sm text-primary-600 dark:text-primary-400 hover:underline">Dashboard</a>
            <a href="/login" class="text-sm text-primary-600 dark:text-primary-400 hover:underline">Login</a>
            <a href="/register" class="text-sm text-primary-600 dark:text-primary-400 hover:underline">Register</a>
          </div>
        </div>
      </div>
    </div>
  `;
}