import { BookingService } from '../services/bookingService.js';
import { OptimizationService } from '../services/optimizationService.js';
import { formatCurrency, formatDuration } from '../utils/helpers.js';
import { STATIONS } from '../utils/constants.js';

class BookingForm {
  constructor(container) {
    this.container = container;
    this.stations = STATIONS;
    this.selectedSource = null;
    this.selectedDestination = null;
    this.selectedDate = null;
    this.selectedTime = null;
    this.alternativeRoutes = [];
    this.dynamicPrice = null;
    this.render();
  }

  createForm() {
    return `
      <div class="card p-6 max-w-2xl mx-auto">
        <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Book Your Train Ticket</h2>
        
        <form id="booking-form" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="source-station" class="label">From</label>
              <select id="source-station" class="select" required>
                <option value="">Select departure station</option>
                ${this.stations.map(station => `
                  <option value="${station.id}">${station.name} (${station.code})</option>
                `).join('')}
              </select>
            </div>
            
            <div>
              <label for="destination-station" class="label">To</label>
              <select id="destination-station" class="select" required>
                <option value="">Select arrival station</option>
                ${this.stations.map(station => `
                  <option value="${station.id}">${station.name} (${station.code})</option>
                `).join('')}
              </select>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="travel-date" class="label">Travel Date</label>
              <input type="date" id="travel-date" class="input" required min="${new Date().toISOString().split('T')[0]}">
            </div>
            
            <div>
              <label for="travel-time" class="label">Travel Time</label>
              <select id="travel-time" class="select" required>
                <option value="">Select time</option>
                <option value="06:00">06:00 AM</option>
                <option value="08:00">08:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="14:00">02:00 PM</option>
                <option value="16:00">04:00 PM</option>
                <option value="18:00">06:00 PM</option>
                <option value="20:00">08:00 PM</option>
              </select>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="passenger-count" class="label">Passengers</label>
              <input type="number" id="passenger-count" class="input" min="1" max="10" value="1" required>
            </div>
            
            <div>
              <label for="ticket-class" class="label">Ticket Class</label>
              <select id="ticket-class" class="select" required>
                <option value="economy">Economy</option>
                <option value="business">Business</option>
                <option value="first">First Class</option>
              </select>
            </div>
          </div>
          
          <div id="price-container" class="hidden mt-4 p-4 bg-primary-50 dark:bg-dark-400 rounded-md">
            <div class="flex justify-between items-center">
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Current Price:</span>
              <span id="ticket-price" class="text-xl font-bold text-primary-700 dark:text-primary-400"></span>
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              *Dynamic pricing based on demand, congestion, and time
            </div>
          </div>
          
          <div id="route-alternatives" class="hidden mt-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Alternative Routes</h3>
            <div id="alternative-routes-container" class="space-y-3">
              <!-- Alternative routes will be inserted here -->
            </div>
          </div>
          
          <div class="flex justify-end space-x-3 mt-6">
            <button type="button" id="check-price-btn" class="btn btn-secondary">
              Check Price
            </button>
            <button type="submit" id="book-ticket-btn" class="btn btn-primary">
              Book Ticket
            </button>
          </div>
        </form>
      </div>
    `;
  }

  render() {
    this.container.innerHTML = this.createForm();
    this.attachEventListeners();
  }

  attachEventListeners() {
    const form = document.getElementById('booking-form');
    const checkPriceBtn = document.getElementById('check-price-btn');
    const sourceStation = document.getElementById('source-station');
    const destinationStation = document.getElementById('destination-station');
    const travelDate = document.getElementById('travel-date');
    const travelTime = document.getElementById('travel-time');
    
    // Set min date to today
    travelDate.min = new Date().toISOString().split('T')[0];
    
    // Add event listeners
    checkPriceBtn.addEventListener('click', this.handleCheckPrice.bind(this));
    form.addEventListener('submit', this.handleBookTicket.bind(this));
    
    // Update state when form values change
    sourceStation.addEventListener('change', () => {
      this.selectedSource = sourceStation.value ? parseInt(sourceStation.value, 10) : null;
    });
    
    destinationStation.addEventListener('change', () => {
      this.selectedDestination = destinationStation.value ? parseInt(destinationStation.value, 10) : null;
    });
    
    travelDate.addEventListener('change', () => {
      this.selectedDate = travelDate.value;
    });
    
    travelTime.addEventListener('change', () => {
      this.selectedTime = travelTime.value;
    });
  }

  async handleCheckPrice(e) {
    e.preventDefault();
    
    const priceContainer = document.getElementById('price-container');
    const ticketPrice = document.getElementById('ticket-price');
    const routeAlternatives = document.getElementById('route-alternatives');
    const alternativeRoutesContainer = document.getElementById('alternative-routes-container');
    
    // Validate inputs
    if (!this.selectedSource || !this.selectedDestination || !this.selectedDate || !this.selectedTime) {
      alert('Please fill all required fields');
      return;
    }
    
    // Don't allow same source and destination
    if (this.selectedSource === this.selectedDestination) {
      alert('Source and destination stations cannot be the same');
      return;
    }
    
    try {
      // Show loading state
      priceContainer.classList.add('hidden');
      routeAlternatives.classList.add('hidden');
      
      checkPriceBtn.disabled = true;
      checkPriceBtn.textContent = 'Checking...';
      
      // Get dynamic pricing
      const pricingResponse = await BookingService.getDynamicPricing(
        this.selectedSource,
        this.selectedDestination,
        this.selectedDate,
        this.selectedTime
      );
      
      this.dynamicPrice = pricingResponse.price;
      
      // Get alternative routes
      const alternativesResponse = await BookingService.getAlternativeRoutes(
        this.selectedSource,
        this.selectedDestination,
        this.selectedDate
      );
      
      this.alternativeRoutes = alternativesResponse.routes;
      
      // Display the price
      ticketPrice.textContent = formatCurrency(this.dynamicPrice);
      priceContainer.classList.remove('hidden');
      
      // Display alternative routes if available
      if (this.alternativeRoutes && this.alternativeRoutes.length > 0) {
        alternativeRoutesContainer.innerHTML = this.alternativeRoutes.map((route, index) => `
          <div class="p-3 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-dark-400 transition-colors duration-200">
            <div class="flex justify-between items-center">
              <div>
                <span class="text-sm font-medium text-gray-900 dark:text-white">
                  Option ${index + 1}: ${this.getStationName(route.source)} → ${this.getStationName(route.destination)}
                </span>
                <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Duration: ${formatDuration(route.duration)} • Departing at ${route.departureTime} • ${route.congestionLevel} congestion
                </div>
              </div>
              <div class="text-lg font-bold text-primary-600 dark:text-primary-400">
                ${formatCurrency(route.price)}
              </div>
            </div>
            <button type="button" class="select-route-btn mt-2 text-sm text-primary-600 dark:text-primary-400 font-medium" data-index="${index}">
              Select this route
            </button>
          </div>
        `).join('');
        
        routeAlternatives.classList.remove('hidden');
        
        // Add event listeners to alternative route buttons
        document.querySelectorAll('.select-route-btn').forEach(button => {
          button.addEventListener('click', () => {
            const index = parseInt(button.getAttribute('data-index'), 10);
            const route = this.alternativeRoutes[index];
            
            // Update price
            this.dynamicPrice = route.price;
            ticketPrice.textContent = formatCurrency(this.dynamicPrice);
            
            // Update source and destination if different
            if (route.source !== this.selectedSource) {
              this.selectedSource = route.source;
              document.getElementById('source-station').value = route.source;
            }
            
            if (route.destination !== this.selectedDestination) {
              this.selectedDestination = route.destination;
              document.getElementById('destination-station').value = route.destination;
            }
            
            // Mark the selected route
            document.querySelectorAll('.select-route-btn').forEach((btn, i) => {
              const routeElement = btn.closest('div');
              if (i === index) {
                routeElement.classList.add('bg-primary-50', 'dark:bg-primary-900', 'dark:bg-opacity-20', 'border-primary-300', 'dark:border-primary-700');
              } else {
                routeElement.classList.remove('bg-primary-50', 'dark:bg-primary-900', 'dark:bg-opacity-20', 'border-primary-300', 'dark:border-primary-700');
              }
            });
          });
        });
      }
    } catch (error) {
      console.error('Error checking price:', error);
      alert('Failed to check price. Please try again.');
    } finally {
      // Restore button state
      checkPriceBtn.disabled = false;
      checkPriceBtn.textContent = 'Check Price';
    }
  }

  async handleBookTicket(e) {
    e.preventDefault();
    
    // Get form values
    const passengerCount = parseInt(document.getElementById('passenger-count').value, 10);
    const ticketClass = document.getElementById('ticket-class').value;
    
    // Validate inputs
    if (!this.selectedSource || !this.selectedDestination || !this.selectedDate || !this.selectedTime || !this.dynamicPrice) {
      alert('Please fill all required fields and check the price first');
      return;
    }
    
    try {
      // Show loading state
      const bookTicketBtn = document.getElementById('book-ticket-btn');
      bookTicketBtn.disabled = true;
      bookTicketBtn.textContent = 'Booking...';
      
      // Create booking data
      const bookingData = {
        source: this.selectedSource,
        destination: this.selectedDestination,
        date: this.selectedDate,
        time: this.selectedTime,
        passengerCount,
        ticketClass,
        price: this.dynamicPrice
      };
      
      // Book the ticket
      const response = await BookingService.bookTicket(bookingData);
      
      // Show success message
      alert(`Booking successful! Your ticket reference is: ${response.ticketReference}`);
      
      // Reset the form
      document.getElementById('booking-form').reset();
      document.getElementById('price-container').classList.add('hidden');
      document.getElementById('route-alternatives').classList.add('hidden');
      
      // Reset state
      this.selectedSource = null;
      this.selectedDestination = null;
      this.selectedDate = null;
      this.selectedTime = null;
      this.alternativeRoutes = [];
      this.dynamicPrice = null;
    } catch (error) {
      console.error('Error booking ticket:', error);
      alert('Failed to book ticket. Please try again.');
    } finally {
      // Restore button state
      const bookTicketBtn = document.getElementById('book-ticket-btn');
      bookTicketBtn.disabled = false;
      bookTicketBtn.textContent = 'Book Ticket';
    }
  }

  getStationName(stationId) {
    const station = this.stations.find(s => s.id === stationId);
    return station ? station.name : 'Unknown Station';
  }
}

export default BookingForm;