import BookingForm from '../components/BookingForm.js';

export default function BookingPage() {
  const pageContent = `
    <div class="pt-16 mt-4">
      <div class="page-container">
        <div class="bg-white dark:bg-dark-200 rounded-lg shadow-md p-6 mb-6">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Smart Ticket Booking</h1>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Book your train tickets with our intelligent system that offers dynamic pricing and suggests
            alternative routes to save money and avoid congestion.
          </p>
          
          <div id="booking-form-container">
            <!-- Booking form component will be rendered here by JavaScript -->
            <div class="loader">
              <div class="loader-spinner"></div>
            </div>
          </div>
        </div>
        
        <div class="bg-white dark:bg-dark-200 rounded-lg shadow-md p-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">About Dynamic Pricing</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">How It Works</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                Our dynamic pricing system adjusts ticket prices based on multiple factors:
              </p>
              <ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Current demand for the selected route</li>
                <li>Real-time congestion levels</li>
                <li>Time of day and day of week</li>
                <li>Available capacity on trains</li>
                <li>Special events or holidays</li>
              </ul>
            </div>
            
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Benefits</h3>
              <ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 mb-4">
                <li>Get lower prices during off-peak hours</li>
                <li>Choose less congested routes for better comfort</li>
                <li>Receive personalized alternative suggestions</li>
                <li>Book early for potential discounts</li>
                <li>Enjoy a more balanced passenger distribution</li>
              </ul>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                Our AI analyzes historical data and current trends to provide the most reasonable prices.
              </p>
            </div>
          </div>
          
          <div class="mt-6 p-4 bg-success-50 dark:bg-success-900 dark:bg-opacity-10 rounded-lg">
            <div class="flex items-start">
              <svg class="w-6 h-6 text-success-600 dark:text-success-400 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <p class="text-gray-700 dark:text-gray-300">
                <strong>Pro Tip:</strong> For the best deals, try booking during off-peak hours or choosing slightly
                different departure times. Our system will also suggest alternative routes that might be cheaper or less congested.
              </p>
            </div>
          </div>
          
          <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg text-center">
              <svg class="w-8 h-8 mx-auto text-primary-600 dark:text-primary-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-1">Real-Time Updates</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Receive instant notifications about your booking and any changes to your journey.
              </p>
            </div>
            
            <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg text-center">
              <svg class="w-8 h-8 mx-auto text-primary-600 dark:text-primary-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-1">Secure Payments</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                All transactions are encrypted and processed through secure payment gateways.
              </p>
            </div>
            
            <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg text-center">
              <svg class="w-8 h-8 mx-auto text-primary-600 dark:text-primary-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-1">Flexible Scheduling</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Change your booking up to 6 hours before departure without any penalty fees.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Initialize booking form after the page is rendered
  setTimeout(() => {
    initBookingForm();
  }, 0);
  
  return pageContent;
}

function initBookingForm() {
  const container = document.getElementById('booking-form-container');
  if (!container) return;
  
  // Clear loading indicator
  container.innerHTML = '';
  
  // Create the booking form
  new BookingForm(container);
}