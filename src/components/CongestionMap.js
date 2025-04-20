import * as d3 from 'd3';
import { STATIONS } from '../utils/constants.js';
import { createTooltip, showTooltip, hideTooltip, getRandomCongestionLevel, getCongestionColor } from '../utils/helpers.js';

class CongestionMap {
  constructor(container, width = 800, height = 600) {
    this.container = container;
    this.width = width;
    this.height = height;
    this.stations = STATIONS;
    this.connections = this.generateConnections();
    this.tooltip = createTooltip('');
  }

  generateConnections() {
    // Generate some example connections between stations
    const connections = [];
    // Connect Central Station to all other stations
    for (let i = 1; i < this.stations.length; i++) {
      connections.push({
        source: this.stations[0].id,
        target: this.stations[i].id,
        congestion: getRandomCongestionLevel()
      });
    }
    
    // Add some additional connections
    connections.push(
      { source: 2, target: 3, congestion: getRandomCongestionLevel() },
      { source: 3, target: 4, congestion: getRandomCongestionLevel() },
      { source: 4, target: 5, congestion: getRandomCongestionLevel() },
      { source: 5, target: 6, congestion: getRandomCongestionLevel() },
      { source: 6, target: 7, congestion: getRandomCongestionLevel() },
      { source: 7, target: 8, congestion: getRandomCongestionLevel() },
      { source: 8, target: 9, congestion: getRandomCongestionLevel() },
      { source: 9, target: 2, congestion: getRandomCongestionLevel() }
    );
    
    return connections;
  }

  findStationById(id) {
    return this.stations.find(station => station.id === id);
  }

  render() {
    // Clear any existing SVG
    d3.select(this.container).select('svg').remove();
    
    // Create SVG
    const svg = d3.select(this.container)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('viewBox', `0 0 ${this.width} ${this.height}`)
      .attr('class', 'bg-white dark:bg-dark-300 rounded-lg shadow-md');
    
    // Create a background pattern
    svg.append('rect')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('class', 'grid-pattern');
    
    // Create a group for the map elements
    const g = svg.append('g');
    
    // Scale for converting lat/lng to x/y coordinates
    const xScale = d3.scaleLinear()
      .domain([d3.min(this.stations, d => d.lng) - 0.01, d3.max(this.stations, d => d.lng) + 0.01])
      .range([50, this.width - 50]);
    
    const yScale = d3.scaleLinear()
      .domain([d3.min(this.stations, d => d.lat) - 0.01, d3.max(this.stations, d => d.lat) + 0.01])
      .range([this.height - 50, 50]);
    
    // Draw connections
    this.connections.forEach(connection => {
      const source = this.findStationById(connection.source);
      const target = this.findStationById(connection.target);
      
      if (source && target) {
        const line = g.append('line')
          .attr('x1', xScale(source.lng))
          .attr('y1', yScale(source.lat))
          .attr('x2', xScale(target.lng))
          .attr('y2', yScale(target.lat))
          .attr('class', 'railway-line')
          .style('stroke-width', 3)
          .style('stroke', getCongestionColor(connection.congestion));
        
        // Add a hover effect to the connection
        line.on('mouseover', (event) => {
          line.style('stroke-width', 5);
          this.tooltip.textContent = `Congestion: ${connection.congestion.charAt(0).toUpperCase() + connection.congestion.slice(1)}`;
          showTooltip(this.tooltip, event);
        })
        .on('mousemove', (event) => {
          showTooltip(this.tooltip, event);
        })
        .on('mouseout', () => {
          line.style('stroke-width', 3);
          hideTooltip(this.tooltip);
        });
      }
    });
    
    // Draw stations
    this.stations.forEach(station => {
      const stationGroup = g.append('g')
        .attr('transform', `translate(${xScale(station.lng)}, ${yScale(station.lat)})`)
        .attr('class', 'cursor-pointer')
        .on('mouseover', (event) => {
          stationCircle.attr('r', 10);
          this.tooltip.textContent = station.name;
          showTooltip(this.tooltip, event);
        })
        .on('mousemove', (event) => {
          showTooltip(this.tooltip, event);
        })
        .on('mouseout', () => {
          stationCircle.attr('r', 8);
          hideTooltip(this.tooltip);
        });
      
      // Station circle
      const stationCircle = stationGroup.append('circle')
        .attr('r', 8)
        .attr('class', 'station-marker');
      
      // Station label
      stationGroup.append('text')
        .attr('dy', -15)
        .attr('text-anchor', 'middle')
        .attr('class', 'text-xs font-medium fill-gray-800 dark:fill-gray-200')
        .text(station.code);
    });
    
    // Add a legend
    const legend = svg.append('g')
      .attr('transform', `translate(${this.width - 150}, ${this.height - 100})`);
    
    const legendData = [
      { level: 'low', label: 'Low Congestion' },
      { level: 'medium', label: 'Medium Congestion' },
      { level: 'high', label: 'High Congestion' }
    ];
    
    legendData.forEach((d, i) => {
      const legendRow = legend.append('g')
        .attr('transform', `translate(0, ${i * 25})`);
      
      legendRow.append('rect')
        .attr('width', 15)
        .attr('height', 5)
        .attr('fill', getCongestionColor(d.level));
      
      legendRow.append('text')
        .attr('x', 20)
        .attr('y', 5)
        .attr('class', 'text-xs fill-gray-800 dark:fill-gray-200')
        .text(d.label);
    });
    
    // Add title
    svg.append('text')
      .attr('x', 20)
      .attr('y', 30)
      .attr('class', 'text-lg font-semibold fill-gray-900 dark:fill-gray-100')
      .text('Real-Time Train Congestion Map');
    
    // Add a moving train animation
    for (let i = 0; i < 3; i++) {
      const randomConnection = this.connections[Math.floor(Math.random() * this.connections.length)];
      const source = this.findStationById(randomConnection.source);
      const target = this.findStationById(randomConnection.target);
      
      if (source && target) {
        const train = g.append('circle')
          .attr('r', 4)
          .attr('class', 'train-marker')
          .attr('transform', `translate(${xScale(source.lng)}, ${yScale(source.lat)})`)
          .transition()
          .duration(3000 + i * 2000)
          .attr('transform', `translate(${xScale(target.lng)}, ${yScale(target.lat)})`)
          .transition()
          .duration(3000 + i * 2000)
          .attr('transform', `translate(${xScale(source.lng)}, ${yScale(source.lat)})`)
          .on('end', function repeat() {
            d3.select(this)
              .transition()
              .duration(3000 + i * 2000)
              .attr('transform', `translate(${xScale(target.lng)}, ${yScale(target.lat)})`)
              .transition()
              .duration(3000 + i * 2000)
              .attr('transform', `translate(${xScale(source.lng)}, ${yScale(source.lat)})`)
              .on('end', repeat);
          });
      }
    }
  }

  update(congestionData) {
    // Update the congestion levels based on new data
    if (!congestionData) return;
    
    congestionData.forEach(data => {
      const connection = this.connections.find(c => 
        (c.source === data.source && c.target === data.target) ||
        (c.source === data.target && c.target === data.source)
      );
      
      if (connection) {
        connection.congestion = data.congestion;
      }
    });
    
    // Re-render the map
    this.render();
  }
}

export default CongestionMap;