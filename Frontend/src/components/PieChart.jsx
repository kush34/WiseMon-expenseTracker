// Import dependencies
import React from 'react';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Title,
    Tooltip,
    ArcElement
  } from "chart.js";
import { Pie } from 'react-chartjs-2';

// Register the required components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({Data}) => {
    const getCategoryTotals = (data) => {
        const totals = {};
        if (!data || !Array.isArray(data)) return totals; // Safety check to avoid errors
        data.forEach(({ category, amount }) => {
          totals[category] = (totals[category] || 0) + amount;
        });
        return totals;
      };
    
      // Compute totals for categories
      const categoryTotals = getCategoryTotals(Data);
    
      // Define labels and dataset
      const labels = Object.keys(categoryTotals); // Extract category names
      const dataset = Object.values(categoryTotals); // Extract total amounts
    
      const data = {
        labels, // Categories
        datasets: [
          {
            label: 'Category Totals',
            data: dataset, // Totals for each category
            backgroundColor: [
              '#FF6384', // Pink
              '#36A2EB', // Blue
              '#FFCE56', // Yellow
              '#9500ff', // Teal
              '#9966FF', // Purple
            ],
            hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#a020fa',
              '#9966FF',
            ],
          },
        ],
      };
        // Chart options
    const options = {
        responsive: true,
        plugins: {
        legend: {
            position: 'bottom', // Position of the legend
        },
        },
  };

  return (
    // <div style={{width:300}} className='border'>
    <div className='w-2/3 h-2/3'>
      <Pie  data={data} options={options} />
    </div>
  );
};

export default PieChart;
