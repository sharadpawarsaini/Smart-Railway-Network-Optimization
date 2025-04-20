export default function HomePage() {
  return `
    <div class="min-h-screen bg-train-pattern">
      <header class="pt-16 md:pt-20 pb-8 md:pb-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 class="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Smart Railway Network <span class="text-primary-400">Optimization</span>
          </h1>
          <p class="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            AI-powered railway system for optimized routes, real-time congestion tracking, and smart ticket pricing
          </p>
          <div class="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <a href="/route-optimizer" class="btn btn-primary px-8 py-3 text-lg">
              Find Best Route
            </a>
            <a href="/congestion-map" class="btn btn-outline border-white text-white hover:bg-white hover:bg-opacity-10 px-8 py-3 text-lg">
              View Live Map
            </a>
          </div>
        </div>
      </header>

      <!-- Feature Blocks -->
      <section class="py-12 md:py-20 bg-white dark:bg-dark-200 shadow-lg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12 md:mb-16">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Advanced Railway Management System
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Powered by cutting-edge AI algorithms to optimize travel experience and railway operations
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Feature 1: Real-Time Congestion Map -->
            <div class="card card-hover p-6">
              <div class="flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900 dark:bg-opacity-50 rounded-xl mb-4">
                <svg class="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Real-Time Congestion Map</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                Visualize network traffic with D3.js-powered maps showing real-time congestion levels and AI predictions.
              </p>
              <a href="/congestion-map" class="text-primary-600 dark:text-primary-400 font-medium inline-flex items-center">
                Explore Map
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>

            <!-- Feature 2: Smart Ticket Booking -->
            <div class="card card-hover p-6">
              <div class="flex items-center justify-center w-12 h-12 bg-secondary-100 dark:bg-secondary-900 dark:bg-opacity-50 rounded-xl mb-4">
                <svg class="w-6 h-6 text-secondary-600 dark:text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Smart Ticket Booking</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                Book tickets with dynamic pricing based on real-time demand and receive alternative route suggestions.
              </p>
              <a href="/booking" class="text-secondary-600 dark:text-secondary-400 font-medium inline-flex items-center">
                Book Tickets
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>

            <!-- Feature 3: AI Route Optimizer -->
            <div class="card card-hover p-6">
              <div class="flex items-center justify-center w-12 h-12 bg-accent-100 dark:bg-accent-900 dark:bg-opacity-50 rounded-xl mb-4">
                <svg class="w-6 h-6 text-accent-600 dark:text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">AI Route Optimizer</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                Find the optimal route using advanced algorithms like Dijkstra's, A*, and Bellman-Ford for your journey.
              </p>
              <a href="/route-optimizer" class="text-accent-600 dark:text-accent-400 font-medium inline-flex items-center">
                Optimize Route
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>

            <!-- Feature 4: Advanced Analytics -->
            <div class="card card-hover p-6">
              <div class="flex items-center justify-center w-12 h-12 bg-success-100 dark:bg-success-900 dark:bg-opacity-50 rounded-xl mb-4">
                <svg class="w-6 h-6 text-success-600 dark:text-success-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Advanced Analytics</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                Access real-time data on train usage, passenger flow, and system performance with interactive dashboards.
              </p>
              <a href="/admin" class="text-success-600 dark:text-success-400 font-medium inline-flex items-center">
                View Dashboard
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>

            <!-- Feature 5: Personalized Profiles -->
            <div class="card card-hover p-6">
              <div class="flex items-center justify-center w-12 h-12 bg-warning-100 dark:bg-warning-900 dark:bg-opacity-50 rounded-xl mb-4">
                <svg class="w-6 h-6 text-warning-600 dark:text-warning-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Personalized Profiles</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                Track your travel history, save favorite routes, and receive personalized suggestions based on your habits.
              </p>
              <a href="/profile" class="text-warning-600 dark:text-warning-400 font-medium inline-flex items-center">
                View Profile
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>

            <!-- Feature 6: API Integration -->
            <div class="card card-hover p-6">
              <div class="flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl mb-4">
                <svg class="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">API Integration</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                Connect with our robust API to integrate railway data and services into your own applications.
              </p>
              <a href="#" class="text-gray-600 dark:text-gray-400 font-medium inline-flex items-center">
                API Documentation
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- How It Works -->
      <section class="py-12 md:py-20 bg-gray-50 dark:bg-dark-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
            <p class="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our integrated system uses AI and real-time data to provide the most efficient railway experience
            </p>
          </div>

          <div class="relative">
            <!-- Connection Line -->
            <div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 transform -translate-x-1/2"></div>

            <!-- Steps -->
            <div class="space-y-16">
              <!-- Step 1 -->
              <div class="relative">
                <div class="hidden md:block absolute top-5 left-1/2 w-8 h-8 bg-primary-500 rounded-full transform -translate-x-1/2"></div>
                <div class="md:grid md:grid-cols-2 md:gap-12 items-center">
                  <div class="md:text-right mb-6 md:mb-0">
                    <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Data Collection</h3>
                    <p class="text-gray-600 dark:text-gray-400">
                      Our system collects real-time data from trains, stations, and passenger devices to create a comprehensive view of the railway network.
                    </p>
                  </div>
                  <div class="bg-white dark:bg-dark-200 p-6 rounded-lg shadow-md">
                    <img src="https://images.unsplash.com/photo-1532939163844-547f958e91c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" alt="Data Collection" class="w-full h-48 object-cover rounded-md">
                  </div>
                </div>
              </div>

              <!-- Step 2 -->
              <div class="relative">
                <div class="hidden md:block absolute top-5 left-1/2 w-8 h-8 bg-primary-500 rounded-full transform -translate-x-1/2"></div>
                <div class="md:grid md:grid-cols-2 md:gap-12 items-center">
                  <div class="bg-white dark:bg-dark-200 p-6 rounded-lg shadow-md md:order-first">
                    <img src="https://images.unsplash.com/photo-1581092803435-cbbf9379cd7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" alt="AI Processing" class="w-full h-48 object-cover rounded-md">
                  </div>
                  <div class="mb-6 md:mb-0">
                    <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">AI Processing</h3>
                    <p class="text-gray-600 dark:text-gray-400">
                      Our advanced AI models analyze the data to predict congestion, optimize routes, and dynamically adjust pricing based on demand.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Step 3 -->
              <div class="relative">
                <div class="hidden md:block absolute top-5 left-1/2 w-8 h-8 bg-primary-500 rounded-full transform -translate-x-1/2"></div>
                <div class="md:grid md:grid-cols-2 md:gap-12 items-center">
                  <div class="md:text-right mb-6 md:mb-0">
                    <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">User Experience</h3>
                    <p class="text-gray-600 dark:text-gray-400">
                      Passengers receive personalized recommendations, real-time updates, and can easily book tickets through our intuitive interface.
                    </p>
                  </div>
                  <div class="bg-white dark:bg-dark-200 p-6 rounded-lg shadow-md">
                    <img src="https://images.unsplash.com/photo-1622650355503-f86fefa033d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" alt="User Experience" class="w-full h-48 object-cover rounded-md">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-12 md:py-20 bg-primary-600 dark:bg-primary-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Experience Smart Railways?</h2>
          <p class="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
            Join thousands of passengers who enjoy optimized routes, better pricing, and a smoother travel experience.
          </p>
          <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="/register" class="btn bg-white text-primary-700 hover:bg-primary-50 px-8 py-3 text-lg">
              Create Account
            </a>
            <a href="/booking" class="btn border-2 border-white text-white hover:bg-white hover:bg-opacity-10 px-8 py-3 text-lg">
              Book Your Trip
            </a>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="bg-gray-900 dark:bg-dark-400 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 class="text-xl font-bold mb-4">Smart Railway</h3>
              <p class="text-gray-400 mb-4">
                AI-powered railway network optimization for a better travel experience.
              </p>
              <div class="flex space-x-4">
                <a href="#" class="text-gray-400 hover:text-white">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                  </svg>
                </a>
                <a href="#" class="text-gray-400 hover:text-white">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" class="text-gray-400 hover:text-white">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
                  </svg>
                </a>
                <a href="#" class="text-gray-400 hover:text-white">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
              <ul class="space-y-2">
                <li><a href="/" class="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="/route-optimizer" class="text-gray-400 hover:text-white">Route Optimizer</a></li>
                <li><a href="/congestion-map" class="text-gray-400 hover:text-white">Congestion Map</a></li>
                <li><a href="/booking" class="text-gray-400 hover:text-white">Book Tickets</a></li>
                <li><a href="/profile" class="text-gray-400 hover:text-white">My Profile</a></li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-4">Resources</h3>
              <ul class="space-y-2">
                <li><a href="#" class="text-gray-400 hover:text-white">Help Center</a></li>
                <li><a href="#" class="text-gray-400 hover:text-white">API Documentation</a></li>
                <li><a href="#" class="text-gray-400 hover:text-white">Terms of Service</a></li>
                <li><a href="#" class="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" class="text-gray-400 hover:text-white">Contact Support</a></li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-4">Subscribe</h3>
              <p class="text-gray-400 mb-4">Stay up to date with the latest news and updates.</p>
              <form class="flex">
                <input type="email" placeholder="Your email" class="px-4 py-2 rounded-l-md flex-1 bg-gray-800 border-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-primary-500">
                <button type="submit" class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-r-md">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div class="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p class="text-gray-400 text-sm">&copy; 2025 Smart Railway Network. All rights reserved.</p>
            <div class="mt-4 md:mt-0 flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-white text-sm">Terms</a>
              <a href="#" class="text-gray-400 hover:text-white text-sm">Privacy</a>
              <a href="#" class="text-gray-400 hover:text-white text-sm">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  `;
}