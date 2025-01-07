import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables, ChartTypeRegistry } from 'chart.js';

// Register all chart.js modules
Chart.register(...registerables);

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
})
export class GraphComponent implements OnInit {
  @Input() graphData: any; // Data for the graph
  @Input() graphType: keyof ChartTypeRegistry = 'bar'; // Restrict to valid chart types (e.g., 'bar', 'line', etc.)
  @Input() graphTitle: string = ''; // Title of the graph

  graphId: string = 'chart-' + Math.random().toString(36).substr(2, 9); // Unique ID for each graph

  ngOnInit(): void {
    // Create the chart using the graphData and graphType inputs
    new Chart(this.graphId, {
      type: this.graphType, // Type of the chart (e.g., 'bar', 'line', etc.)
      data: this.graphData, // Data for the chart
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: this.graphTitle, // Title of the chart
          },
        },
      },
    });
  }
}
