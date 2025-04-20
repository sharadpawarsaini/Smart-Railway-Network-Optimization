import Chart from 'chart.js/auto';
import { OptimizationService } from '../services/optimizationService.js';
import { TrainService } from '../services/trainService.js';
import { BookingService } from '../services/bookingService.js';
import { formatCurrency } from '../utils/helpers.js';
import { CHART_COLORS } from '../utils/constants.js';

class AdminDashboard {
  constructor(container) {
    this.container = container;
    this.charts = {};
    this.render();
  }
  
  createDashboard() {
    return `
      <div class="p-6">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h2>
          
          <div class="flex space-x-2 mt-2 md:mt-0">
            <button id="export-pdf-btn" class="btn btn-outline">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Export PDF
            </button>
            <button id="retrain-ai-btn" class="btn btn-primary">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Retrain AI Model
            </button>
          </div>
        </div>
        
        <!-- Stats Overview -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div class="card p-4">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Passengers Today</h3>
            <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">8,247</p>
            <div class="mt-2 flex items-center text-sm">
              <span class="text-success-500">
                <svg class="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                </svg>
                12.5%
              </span>
              <span class="text-gray-500 dark:text-gray-400 ml-1">vs yesterday</span>
            </div>
          </div>
          
          <div class="card p-4">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Active Trains</h3>
            <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">42</p>
            <div class="mt-2 flex items-center text-sm">
              <span class="text-success-500">
                <svg class="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                </svg>
                3
              </span>
              <span class="text-gray-500 dark:text-gray-400 ml-1">more than usual</span>
            </div>
          </div>
          
          <div class="card p-4">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Revenue Today</h3>
            <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">$24,389</p>
            <div class="mt-2 flex items-center text-sm">
              <span class="text-success-500">
                <svg class="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                </svg>
                8.3%
              </span>
              <span class="text-gray-500 dark:text-gray-400 ml-1">vs yesterday</span>
            </div>
          </div>
          
          <div class="card p-4">
            <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Congestion Status</h3>
            <p class="text-2xl font-bold text-warning-500 mt-1">Medium</p>
            <div class="mt-2 flex items-center text-sm">
              <span class="text-warning-500">
                <svg class="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
                3 alerts
              </span>
              <span class="text-gray-500 dark:text-gray-400 ml-1">active now</span>
            </div>
          </div>
        </div>
        
        <!-- Charts Row -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <!-- Passenger Traffic Chart -->
          <div class="card">
            <div class="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">Passenger Traffic (24h)</h3>
            </div>
            <div class="p-4">
              <canvas id="passenger-traffic-chart" height="250"></canvas>
            </div>
          </div>
          
          <!-- Revenue Chart -->
          <div class="card">
            <div class="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">Revenue by Route (Weekly)</h3>
            </div>
            <div class="p-4">
              <canvas id="revenue-chart" height="250"></canvas>
            </div>
          </div>
        </div>
        
        <!-- Congestion Heatmap -->
        <div class="card mb-6">
          <div class="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Network Congestion Heatmap</h3>
          </div>
          <div class="p-4">
            <div id="congestion-heatmap" class="h-64 bg-gray-50 dark:bg-dark-400 rounded-md">
              <!-- Congestion heatmap will be displayed here -->
              <div class="flex items-center justify-center h-full">
                <div class="loader-spinner"></div>
              </div>
            </div>
            
            <div class="mt-4 grid grid-cols-2 md:grid-cols-5 gap-2">
              <div class="p-2 bg-success-100 dark:bg-success-900 dark:bg-opacity-20 rounded text-center">
                <span class="text-xs font-medium text-success-800 dark:text-success-300">Low Congestion</span>
                <div class="mt-1 text-lg font-bold text-success-700 dark:text-success-400">7</div>
                <div class="text-xs text-success-600 dark:text-success-500">routes</div>
              </div>
              
              <div class="p-2 bg-warning-100 dark:bg-warning-900 dark:bg-opacity-20 rounded text-center">
                <span class="text-xs font-medium text-warning-800 dark:text-warning-300">Medium Congestion</span>
                <div class="mt-1 text-lg font-bold text-warning-700 dark:text-warning-400">12</div>
                <div class="text-xs text-warning-600 dark:text-warning-500">routes</div>
              </div>
              
              <div class="p-2 bg-danger-100 dark:bg-danger-900 dark:bg-opacity-20 rounded text-center">
                <span class="text-xs font-medium text-danger-800 dark:text-danger-300">High Congestion</span>
                <div class="mt-1 text-lg font-bold text-danger-700 dark:text-danger-400">5</div>
                <div class="text-xs text-danger-600 dark:text-danger-500">routes</div>
              </div>
              
              <div class="p-2 bg-gray-100 dark:bg-gray-800 rounded text-center">
                <span class="text-xs font-medium text-gray-700 dark:text-gray-300">Average Load</span>
                <div class="mt-1 text-lg font-bold text-gray-700 dark:text-gray-200">68%</div>
                <div class="text-xs text-gray-600 dark:text-gray-400">network capacity</div>
              </div>
              
              <div class="p-2 bg-primary-100 dark:bg-primary-900 dark:bg-opacity-20 rounded text-center">
                <span class="text-xs font-medium text-primary-800 dark:text-primary-300">Optimization</span>
                <div class="mt-1 text-lg font-bold text-primary-700 dark:text-primary-400">82%</div>
                <div class="text-xs text-primary-600 dark:text-primary-500">efficiency</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- AI Model Performance -->
        <div class="card">
          <div class="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">AI Model Performance</h3>
          </div>
          <div class="p-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <canvas id="prediction-accuracy-chart" height="200"></canvas>
              </div>
              
              <div class="space-y-4">
                <div>
                  <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Model Metrics</h4>
                  <div class="grid grid-cols-2 gap-3">
                    <div class="bg-gray-50 dark:bg-dark-400 p-3 rounded">
                      <div class="text-xs text-gray-500 dark:text-gray-400">Accuracy</div>
                      <div class="text-lg font-semibold text-gray-900 dark:text-white">94.2%</div>
                    </div>
                    <div class="bg-gray-50 dark:bg-dark-400 p-3 rounded">
                      <div class="text-xs text-gray-500 dark:text-gray-400">F1 Score</div>
                      <div class="text-lg font-semibold text-gray-900 dark:text-white">0.918</div>
                    </div>
                    <div class="bg-gray-50 dark:bg-dark-400 p-3 rounded">
                      <div class="text-xs text-gray-500 dark:text-gray-400">Precision</div>
                      <div class="text-lg font-semibold text-gray-900 dark:text-white">0.932</div>
                    </div>
                    <div class="bg-gray-50 dark:bg-dark-400 p-3 rounded">
                      <div class="text-xs text-gray-500 dark:text-gray-400">Recall</div>
                      <div class="text-lg font-semibold text-gray-900 dark:text-white">0.903</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Training</h4>
                  <div class="bg-gray-50 dark:bg-dark-400 p-3 rounded">
                    <div class="flex justify-between items-center">
                      <div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">Date</div>
                        <div class="text-sm font-medium text-gray-900 dark:text-white">Today, 2:30 PM</div>
                      </div>
                      <div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">Duration</div>
                        <div class="text-sm font-medium text-gray-900 dark:text-white">47 minutes</div>
                      </div>
                      <div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">Samples</div>
                        <div class="text-sm font-medium text-gray-900 dark:text-white">128,450</div>
                      </div>
                    </div>
                    
                    <div class="mt-3">
                      <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Training Progress</div>
                      <div class="w-full bg-gray-200 dark:bg-dark-500 rounded-full h-2">
                        <div class="bg-primary-500 h-2 rounded-full" style="width: 100%"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  render() {
    this.container.innerHTML = this.createDashboard();
    this.initCharts();
    this.attachEventListeners();
  }
  
  initCharts() {
    this.initPassengerTrafficChart();
    this.initRevenueChart();
    this.initPredictionAccuracyChart();
    this.initCongestionHeatmap();
  }
  
  initPassengerTrafficChart() {
    const ctx = document.getElementById('passenger-traffic-chart');
    if (!ctx) return;
    
    // Sample data for passenger traffic
    const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
    const data = [420, 380, 250, 180, 150, 230, 380, 670, 920, 850, 780, 890, 980, 920, 880, 920, 1050, 1180, 980, 820, 720, 650, 580, 510];
    
    this.charts.passengerTraffic = new Chart(ctx, {
      type: 'line',
      data: {
        labels: hours,
        datasets: [{
          label: 'Passenger Count',
          data: data,
          borderColor: CHART_COLORS.primary[0],
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 2,
          pointRadius: 3,
          pointBackgroundColor: CHART_COLORS.primary[0],
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            mode: 'index',
            intersect: false
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              maxTicksLimit: 8,
              color: '#9CA3AF'
            }
          },
          y: {
            grid: {
              color: 'rgba(156, 163, 175, 0.1)'
            },
            ticks: {
              color: '#9CA3AF'
            },
            beginAtZero: true
          }
        }
      }
    });
  }
  
  initRevenueChart() {
    const ctx = document.getElementById('revenue-chart');
    if (!ctx) return;
    
    // Sample data for revenue
    const routes = ['CS-NG', 'CS-WF', 'CS-EV', 'CS-SP', 'CS-RS'];
    const data = [24580, 19250, 18700, 22400, 26300];
    
    this.charts.revenue = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: routes,
        datasets: [{
          label: 'Revenue ($)',
          data: data,
          backgroundColor: [
            CHART_COLORS.primary[0],
            CHART_COLORS.primary[1],
            CHART_COLORS.primary[2],
            CHART_COLORS.secondary[0],
            CHART_COLORS.secondary[1]
          ],
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return formatCurrency(context.parsed.y);
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#9CA3AF'
            }
          },
          y: {
            grid: {
              color: 'rgba(156, 163, 175, 0.1)'
            },
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              },
              color: '#9CA3AF'
            },
            beginAtZero: true
          }
        }
      }
    });
  }
  
  initPredictionAccuracyChart() {
    const ctx = document.getElementById('prediction-accuracy-chart');
    if (!ctx) return;
    
    // Sample data for prediction accuracy
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const accuracyData = [0.86, 0.89, 0.91, 0.92, 0.94, 0.95];
    const lossData = [0.18, 0.15, 0.12, 0.09, 0.07, 0.06];
    
    this.charts.predictionAccuracy = new Chart(ctx, {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Accuracy',
            data: accuracyData,
            borderColor: CHART_COLORS.success[1],
            backgroundColor: 'transparent',
            borderWidth: 2,
            pointRadius: 3,
            pointBackgroundColor: CHART_COLORS.success[1],
            yAxisID: 'y'
          },
          {
            label: 'Loss',
            data: lossData,
            borderColor: CHART_COLORS.warning[1],
            backgroundColor: 'transparent',
            borderWidth: 2,
            pointRadius: 3,
            pointBackgroundColor: CHART_COLORS.warning[1],
            borderDash: [5, 5],
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Model Training Progress',
            font: {
              size: 14
            },
            padding: {
              bottom: 10
            },
            color: '#4B5563'
          },
          legend: {
            position: 'top',
            labels: {
              color: '#9CA3AF'
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#9CA3AF'
            }
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            grid: {
              color: 'rgba(156, 163, 175, 0.1)'
            },
            ticks: {
              color: '#9CA3AF'
            },
            min: 0.8,
            max: 1.0
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
              drawOnChartArea: false
            },
            ticks: {
              color: '#9CA3AF'
            },
            min: 0,
            max: 0.25
          }
        }
      }
    });
  }
  
  initCongestionHeatmap() {
    const congestionHeatmap = document.getElementById('congestion-heatmap');
    if (!congestionHeatmap) return;
    
    // In a real application, you would fetch congestion data from the API
    // For this demo, we'll display a placeholder
    setTimeout(() => {
      congestionHeatmap.innerHTML = `
        <div class="h-full flex items-center justify-center">
          <img src="https://images.unsplash.com/photo-1581262177000-8139a463e531?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Network Congestion Heatmap" class="max-h-full rounded-md object-contain">
        </div>
      `;
    }, 1000);
  }
  
  attachEventListeners() {
    const exportPdfBtn = document.getElementById('export-pdf-btn');
    const retrainAiBtn = document.getElementById('retrain-ai-btn');
    
    if (exportPdfBtn) {
      exportPdfBtn.addEventListener('click', this.handleExportPDF.bind(this));
    }
    
    if (retrainAiBtn) {
      retrainAiBtn.addEventListener('click', this.handleRetrainAI.bind(this));
    }
  }
  
  handleExportPDF() {
    alert('Exporting dashboard as PDF...');
    // In a real application, you would implement the PDF export functionality
  }
  
  async handleRetrainAI() {
    const retrainAiBtn = document.getElementById('retrain-ai-btn');
    if (!retrainAiBtn) return;
    
    try {
      // Show loading state
      retrainAiBtn.disabled = true;
      retrainAiBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Retraining...
      `;
      
      // Call API to retrain the model
      await OptimizationService.triggerModelRetraining();
      
      // Show success message
      retrainAiBtn.className = 'btn btn-success';
      retrainAiBtn.innerHTML = `
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        Retrained Successfully
      `;
      
      // Reset after 2 seconds
      setTimeout(() => {
        retrainAiBtn.className = 'btn btn-primary';
        retrainAiBtn.disabled = false;
        retrainAiBtn.innerHTML = `
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          Retrain AI Model
        `;
      }, 2000);
    } catch (error) {
      console.error('Error retraining AI:', error);
      
      // Show error message
      retrainAiBtn.className = 'btn btn-danger';
      retrainAiBtn.innerHTML = `
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        Retraining Failed
      `;
      
      // Reset after 2 seconds
      setTimeout(() => {
        retrainAiBtn.className = 'btn btn-primary';
        retrainAiBtn.disabled = false;
        retrainAiBtn.innerHTML = `
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          Retrain AI Model
        `;
      }, 2000);
    }
  }
}

export default AdminDashboard;